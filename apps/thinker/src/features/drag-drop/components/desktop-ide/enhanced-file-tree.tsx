'use client';

import React, { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import {
  monitorForElements,
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';

import { FileToolbar } from '@/features/drag-drop/components/file-manager/file-toolbar';
import {
  getInitialFileSystemState,
  canMoveItem,
  generateId,
  getFileIcon,
} from '@/features/drag-drop/stores/file-system-data';
import { Tree, Folder, File } from '@/components/magicui/file-tree';
import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import type {
  FileSystemState,
  FileSystemItem,
  FileSystemInstruction,
  AllDragData,
  DragData,
} from '@/features/drag-drop/types';

// 类型守卫函数
function isFileSystemDragData(data: AllDragData): data is DragData {
  return data.type === 'file-system-item';
}

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

// 带拖拽功能的 File 包装器
interface DraggableFileProps {
  item: FileSystemItem;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  allItems: Record<string, FileSystemItem>;
}

function DraggableFile({ item, isSelected, onSelect, onMove, allItems }: DraggableFileProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const fileIcon = getFileIcon(item);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => {
          if (item.type === 'file') {
            // 文件可以拖拽到桌面创建新窗口
            return {
              type: 'desktop-file',
              fileId: item.id,
              fileName: item.name,
              content: item.content || '',
            };
          } else {
            // 文件夹只能在文件系统内拖拽
            return {
              type: 'file-system-item',
              itemId: item.id,
              itemType: item.type,
            };
          }
        },
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          const sourceData = source.data as AllDragData;
          if (!isFileSystemDragData(sourceData)) return false;
          return canMoveItem(allItems, sourceData.itemId, item.id);
        },
        getData: ({ input, element }) => {
          const data = {
            type: 'file-tree-item',
            itemId: item.id,
            itemType: item.type,
          };

          return attachInstruction(data, {
            input,
            element,
            operations: {
              'reorder-before': 'available' as const,
              'reorder-after': 'available' as const,
            },
          });
        },
        onDragEnter: (args) => {
          const extractedInstruction = extractInstruction(args.self.data);
          setInstruction(extractedInstruction);
        },
        onDragLeave: () => {
          setInstruction(null);
        },
        onDrop: (args) => {
          setInstruction(null);

          const sourceData = args.source.data as AllDragData;
          const extractedInstruction = extractInstruction(args.self.data);

          if (!extractedInstruction || !isFileSystemDragData(sourceData) || sourceData.itemId === item.id) return;

          // 转换指令
          let fileSystemInstruction: FileSystemInstruction;

          switch (extractedInstruction.operation) {
            case 'reorder-before':
              fileSystemInstruction = {
                type: 'reorder-before',
                targetId: item.id,
              };
              break;
            case 'reorder-after':
              fileSystemInstruction = {
                type: 'reorder-after',
                targetId: item.id,
              };
              break;
            default:
              return;
          }

          onMove(fileSystemInstruction, sourceData.itemId);
        },
      }),
    );
  }, [item.id, item.type, item.content, item.name, allItems, onMove]);

  return (
    <div className="relative">
      <File
        ref={ref}
        value={item.id}
        isSelect={isSelected}
        fileIcon={fileIcon}
        handleSelect={() => onSelect(item.id)}
        className={isDragging ? 'opacity-50' : ''}
      >
        {item.name}
      </File>
      {instruction && <DropIndicator instruction={instruction} />}
    </div>
  );
}

// 带拖拽功能的 Folder 包装器
interface DraggableFolderProps {
  item: FileSystemItem;
  isSelected: boolean;
  onToggleFolder: (folderId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  allItems: Record<string, FileSystemItem>;
  children?: React.ReactNode;
}

function DraggableFolder({ item, isSelected, onToggleFolder, onMove, allItems, children }: DraggableFolderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({
          type: 'file-system-item',
          itemId: item.id,
          itemType: item.type,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          const sourceData = source.data as AllDragData;
          if (sourceData.type === 'desktop-file') return false;
          if (!isFileSystemDragData(sourceData)) return false;
          return canMoveItem(allItems, sourceData.itemId, item.id);
        },
        getData: ({ input, element }) => {
          const data = {
            type: 'file-tree-item',
            itemId: item.id,
            itemType: item.type,
          };

          return attachInstruction(data, {
            input,
            element,
            operations: {
              'reorder-before': 'available' as const,
              'reorder-after': 'available' as const,
              combine: 'available' as const, // 移动到文件夹内
            },
          });
        },
        onDragEnter: (args) => {
          const extractedInstruction = extractInstruction(args.self.data);
          setInstruction(extractedInstruction);
        },
        onDragLeave: () => {
          setInstruction(null);
        },
        onDrop: (args) => {
          setInstruction(null);

          const sourceData = args.source.data as AllDragData;
          const extractedInstruction = extractInstruction(args.self.data);

          if (!extractedInstruction || !isFileSystemDragData(sourceData) || sourceData.itemId === item.id) return;

          // 转换指令
          let fileSystemInstruction: FileSystemInstruction;

          switch (extractedInstruction.operation) {
            case 'combine':
              fileSystemInstruction = {
                type: 'move-into-folder',
                targetId: item.id,
              };
              break;
            case 'reorder-before':
              fileSystemInstruction = {
                type: 'reorder-before',
                targetId: item.id,
              };
              break;
            case 'reorder-after':
              fileSystemInstruction = {
                type: 'reorder-after',
                targetId: item.id,
              };
              break;
            default:
              return;
          }

          onMove(fileSystemInstruction, sourceData.itemId);
        },
      }),
    );
  }, [item.id, item.type, allItems, onMove]);

  return (
    <div ref={ref} className="relative">
      <Folder
        value={item.id}
        element={item.name}
        isSelect={isSelected}
        className={isDragging ? 'opacity-50' : ''}
        onFolderToggle={() => onToggleFolder(item.id)}
      >
        {children}
      </Folder>
      {instruction && <DropIndicator instruction={instruction} />}
    </div>
  );
}

interface EnhancedFileTreeProps {
  windowId: string;
}

export function EnhancedFileTree({ windowId }: EnhancedFileTreeProps) {
  const [state, dispatch] = useReducer(fileSystemReducer, null, getInitialFileSystemState);
  const { addTab } = useDesktopStore();

  const handleSelect = useCallback(
    (itemId: string) => {
      console.log('File selected:', itemId);
      dispatch({ type: 'SELECT_FILE', fileId: itemId });
      const item = state.items[itemId];
      if (item && item.type === 'file' && item.content) {
        console.log('Creating tab for file:', item.name, 'content length:', item.content.length);
        // 创建新的tab
        const newTab = {
          id: Math.random().toString(36).substring(2, 9),
          fileId: itemId,
          fileName: item.name,
          content: item.content,
          isActive: true,
        };
        console.log('Adding tab to window:', windowId, 'tab:', newTab);
        addTab(windowId, newTab);
      } else {
        console.log('Item not found or not a file:', item);
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
        const data = source.data as AllDragData;
        return isFileSystemDragData(data) || data.type === 'desktop-file';
      },
      onDrop: ({ source, location }) => {
        if (location.current.dropTargets.length === 0) {
          const sourceData = source.data as AllDragData;
          if (sourceData.type === 'file-system-item') {
            console.log('Dropped to empty area:', sourceData.itemId);
          } else if (sourceData.type === 'desktop-file') {
            console.log('File dropped to desktop:', sourceData.fileName);
          }
        }
      },
    });
  }, []);

  // 使用 Magic UI 组件递归渲染文件树项目
  const renderItems = (itemIds: string[]): React.ReactNode => {
    return itemIds.map((itemId) => {
      const item = state.items[itemId];
      if (!item) return null;

      const isSelected = state.selectedFile === item.id;

      if (item.type === 'folder') {
        return (
          <DraggableFolder
            key={itemId}
            item={item}
            isSelected={isSelected}
            onToggleFolder={handleToggleFolder}
            onMove={handleMove}
            allItems={state.items}
          >
            {item.isOpen && item.children && renderItems(item.children)}
          </DraggableFolder>
        );
      } else {
        return (
          <DraggableFile
            key={itemId}
            item={item}
            isSelected={isSelected}
            onSelect={handleSelect}
            onMove={handleMove}
            allItems={state.items}
          />
        );
      }
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
      <Tree
        initialSelectedId={state.selectedFile}
        initialExpandedItems={Object.keys(state.items).filter((id) => {
          const item = state.items[id];
          return item?.type === 'folder' && item.isOpen;
        })}
        className="h-full p-2"
      >
        {renderItems(state.rootItems)}
      </Tree>
    </div>
  );
}
