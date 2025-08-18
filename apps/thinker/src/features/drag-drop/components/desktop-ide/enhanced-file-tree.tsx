'use client';

import React, { useEffect, useReducer, useCallback } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { FileTreeItem } from '@/features/drag-drop/components/file-manager/file-tree-item';
import { FileToolbar } from '@/features/drag-drop/components/file-manager/file-toolbar';
import { getInitialFileSystemState, canMoveItem, generateId } from '@/features/drag-drop/stores/file-system-data';
import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import type { FileSystemState, FileSystemItem, FileSystemInstruction, DragData } from '@/features/drag-drop/types';

// 复用原有的reducer逻辑
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
        const parent = newItems[action.parentId];
        if (parent && parent.type === 'folder') {
          newItems[action.parentId] = {
            ...parent,
            children: [...(parent.children || []), newId],
          };
        }
      } else {
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

      const deleteRecursively = (itemId: string) => {
        const item = newItems[itemId];
        if (item && item.children) {
          item.children.forEach(deleteRecursively);
        }
        delete newItems[itemId];
      };

      deleteRecursively(action.itemId);

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

interface EnhancedFileTreeProps {
  windowId: string;
}

export function EnhancedFileTree({ windowId }: EnhancedFileTreeProps) {
  const [state, dispatch] = useReducer(fileSystemReducer, null, getInitialFileSystemState);
  const { addTab } = useDesktopStore();

  const handleSelect = useCallback(
    (itemId: string) => {
      dispatch({ type: 'SELECT_FILE', fileId: itemId });
      const item = state.items[itemId];
      if (item && item.type === 'file' && item.content) {
        // 创建新的tab
        const newTab = {
          id: Math.random().toString(36).substring(2, 9),
          fileId: itemId,
          fileName: item.name,
          content: item.content,
          isActive: true,
        };
        addTab(windowId, newTab);
      }
    },
    [state.items, windowId, addTab],
  );

  const handleToggleFolder = useCallback((folderId: string) => {
    dispatch({ type: 'TOGGLE_FOLDER', folderId });
  }, []);

  const handleMove = useCallback(
    (instruction: FileSystemInstruction, sourceId: string) => {
      if (instruction.type === 'move-into-folder') {
        if (!canMoveItem(state.items, sourceId, instruction.targetId)) return;
      } else {
        const targetItem = state.items[instruction.targetId];
        if (!targetItem) return;

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
        if (location.current.dropTargets.length === 0) {
          const sourceData = source.data as DragData;
          console.log('Dropped to empty area:', sourceData.itemId);
        }
      },
    });
  }, []);

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
