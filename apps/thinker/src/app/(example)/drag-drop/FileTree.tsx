'use client';

import React, { useEffect, useReducer, useCallback } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { FileTreeItem } from './FileTreeItem';
import { FileToolbar } from './FileToolbar';
import { getInitialFileSystemState, canMoveItem, generateId } from './file-system-data';

import type { FileSystemState, FileSystemItem, FileSystemInstruction, DragData } from './types';

// Reducer actions
type FileSystemAction =
  | { type: 'SELECT_FILE'; fileId: string }
  | { type: 'TOGGLE_FOLDER'; folderId: string }
  | { type: 'MOVE_ITEM'; instruction: FileSystemInstruction; sourceId: string }
  | { type: 'CREATE_ITEM'; parentId?: string; itemType: 'file' | 'folder'; name: string }
  | { type: 'DELETE_ITEM'; itemId: string }
  | { type: 'RENAME_ITEM'; itemId: string; newName: string };

function fileSystemReducer(state: FileSystemState, action: FileSystemAction): FileSystemState {
  switch (action.type) {
    case 'SELECT_FILE': {
      return {
        ...state,
        selectedFile: action.fileId,
      };
    }

    case 'TOGGLE_FOLDER': {
      const item = state.items[action.folderId];
      if (!item || item.type !== 'folder') return state;

      return {
        ...state,
        items: {
          ...state.items,
          [action.folderId]: {
            ...item,
            isOpen: !item.isOpen,
          },
        },
      };
    }

    case 'MOVE_ITEM': {
      const { instruction, sourceId } = action;
      const sourceItem = state.items[sourceId];
      if (!sourceItem) return state;

      const newItems = { ...state.items };
      let newRootItems = [...state.rootItems];

      // 从原位置移除
      if (sourceItem.parent) {
        const oldParent = newItems[sourceItem.parent];
        if (oldParent && oldParent.children) {
          newItems[sourceItem.parent] = {
            ...oldParent,
            children: oldParent.children.filter((id) => id !== sourceId),
          };
        }
      } else {
        newRootItems = newRootItems.filter((id) => id !== sourceId);
      }

      // 根据指令类型处理移动
      switch (instruction.type) {
        case 'move-into-folder': {
          const targetFolder = newItems[instruction.targetId];
          if (targetFolder && targetFolder.type === 'folder') {
            // 移动到文件夹内
            newItems[sourceId] = {
              ...sourceItem,
              parent: instruction.targetId,
            };
            newItems[instruction.targetId] = {
              ...targetFolder,
              children: [...(targetFolder.children || []), sourceId],
            };
          }
          break;
        }

        case 'reorder-before':
        case 'reorder-after': {
          const targetItem = newItems[instruction.targetId];
          if (!targetItem) break;

          const targetParent = targetItem.parent;
          let targetArray: string[];

          if (targetParent) {
            const parentItem = newItems[targetParent];
            if (!parentItem || !parentItem.children) break;
            targetArray = [...parentItem.children];
          } else {
            targetArray = [...newRootItems];
          }

          const targetIndex = targetArray.findIndex((id) => id === instruction.targetId);
          if (targetIndex === -1) break;

          const insertIndex = instruction.type === 'reorder-before' ? targetIndex : targetIndex + 1;
          targetArray.splice(insertIndex, 0, sourceId);

          // 更新源项目的父级
          newItems[sourceId] = {
            ...sourceItem,
            parent: targetParent,
          };

          if (targetParent) {
            const parentItem = newItems[targetParent];
            if (parentItem) {
              newItems[targetParent] = {
                ...parentItem,
                children: targetArray,
              };
            }
          } else {
            newRootItems = targetArray;
          }
          break;
        }
      }

      return {
        ...state,
        items: newItems,
        rootItems: newRootItems,
      };
    }

    case 'CREATE_ITEM': {
      const newId = generateId();
      const newItem: FileSystemItem = {
        id: newId,
        name: action.name,
        type: action.itemType,
        parent: action.parentId,
        ...(action.itemType === 'folder' ? { children: [], isOpen: false } : { content: '' }),
      };

      const newItems = { ...state.items, [newId]: newItem };
      const newRootItems = [...state.rootItems];

      if (action.parentId) {
        // 添加到父文件夹
        const parent = newItems[action.parentId];
        if (parent && parent.type === 'folder') {
          newItems[action.parentId] = {
            ...parent,
            children: [...(parent.children || []), newId],
          };
        }
      } else {
        // 添加到根目录
        newRootItems.push(newId);
      }

      return {
        ...state,
        items: newItems,
        rootItems: newRootItems,
        selectedFile: action.itemType === 'file' ? newId : state.selectedFile,
      };
    }

    case 'DELETE_ITEM': {
      const itemToDelete = state.items[action.itemId];
      if (!itemToDelete) return state;

      const newItems = { ...state.items };
      let newRootItems = [...state.rootItems];

      // 递归删除子项
      const deleteRecursively = (itemId: string) => {
        const item = newItems[itemId];
        if (item && item.children) {
          item.children.forEach(deleteRecursively);
        }
        delete newItems[itemId];
      };

      deleteRecursively(action.itemId);

      // 从父级移除
      if (itemToDelete.parent) {
        const parent = newItems[itemToDelete.parent];
        if (parent && parent.children) {
          newItems[itemToDelete.parent] = {
            ...parent,
            children: parent.children.filter((id) => id !== action.itemId),
          };
        }
      } else {
        newRootItems = newRootItems.filter((id) => id !== action.itemId);
      }

      return {
        ...state,
        items: newItems,
        rootItems: newRootItems,
        selectedFile: state.selectedFile === action.itemId ? undefined : state.selectedFile,
      };
    }

    default:
      return state;
  }
}

interface FileTreeProps {
  onFileSelect: (fileId: string, content: string) => void;
}

export function FileTree({ onFileSelect }: FileTreeProps) {
  const [state, dispatch] = useReducer(fileSystemReducer, null, getInitialFileSystemState);

  const handleSelect = useCallback(
    (itemId: string) => {
      dispatch({ type: 'SELECT_FILE', fileId: itemId });
      const item = state.items[itemId];
      if (item && item.type === 'file' && item.content) {
        onFileSelect(itemId, item.content);
      }
    },
    [state.items, onFileSelect],
  );

  const handleToggleFolder = useCallback((folderId: string) => {
    dispatch({ type: 'TOGGLE_FOLDER', folderId });
  }, []);

  const handleMove = useCallback(
    (instruction: FileSystemInstruction, sourceId: string) => {
      // 验证移动是否有效
      if (instruction.type === 'move-into-folder') {
        if (!canMoveItem(state.items, sourceId, instruction.targetId)) return;
      } else {
        const targetItem = state.items[instruction.targetId];
        if (!targetItem) return;

        // 对于重新排序，检查是否移动到自己的子项中
        if (!canMoveItem(state.items, sourceId, instruction.targetId)) return;
      }

      dispatch({ type: 'MOVE_ITEM', instruction, sourceId });
    },
    [state.items],
  );

  const handleCreateFile = useCallback((name: string) => {
    dispatch({ type: 'CREATE_ITEM', itemType: 'file', name });
  }, []);

  const handleCreateFolder = useCallback((name: string) => {
    dispatch({ type: 'CREATE_ITEM', itemType: 'folder', name });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (state.selectedFile) {
      dispatch({ type: 'DELETE_ITEM', itemId: state.selectedFile });
    }
  }, [state.selectedFile]);

  // 监听全局拖拽事件
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        const data = source.data as DragData;
        return data.type === 'file-system-item';
      },
      onDrop: ({ source, location }) => {
        // 这里可以添加额外的全局拖拽逻辑
        // 比如拖拽到空白区域的处理
        if (location.current.dropTargets.length === 0) {
          // 拖拽到空白区域，可以移动到根目录
          const sourceData = source.data as DragData;
          console.log('Dropped to empty area:', sourceData.itemId);
        }
      },
    });
  }, []);

  // 递归渲染文件树项目
  const renderItems = (itemIds: string[], level: number = 0): React.ReactNode => {
    return itemIds.map((itemId) => {
      const item = state.items[itemId];
      if (!item) return null;

      const childrenItems = item.children ? renderItems(item.children, level + 1) : null;

      return (
        <FileTreeItem
          key={itemId}
          item={item}
          level={level}
          onSelect={handleSelect}
          onToggleFolder={handleToggleFolder}
          onMove={handleMove}
          selectedFile={state.selectedFile}
          allItems={state.items}
        >
          {childrenItems}
        </FileTreeItem>
      );
    });
  };

  return (
    <div className="h-full w-full border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-2 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">文件资源管理器</h3>
      </div>
      <FileToolbar
        onCreateFile={handleCreateFile}
        onCreateFolder={handleCreateFolder}
        onDeleteSelected={handleDeleteSelected}
        hasSelectedItem={!!state.selectedFile}
      />
      <div className="h-full overflow-auto">{renderItems(state.rootItems)}</div>
    </div>
  );
}
