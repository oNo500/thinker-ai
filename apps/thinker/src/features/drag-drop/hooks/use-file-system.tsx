import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getInitialFileSystemState, moveItem } from '../stores/file-system-data';

import type { FileSystemItem, FileSystemState, FileSystemInstruction } from '../types';

interface FileSystemStore extends FileSystemState {
  // 文件操作
  selectFile: (fileId: string) => void;
  toggleFolder: (folderId: string) => void;

  // 拖拽操作
  moveItem: (instruction: FileSystemInstruction, sourceId: string) => void;

  // 文件管理
  createFile: (name: string, content?: string, parentId?: string) => string;
  createFolder: (name: string, parentId?: string) => string;
  deleteItem: (itemId: string) => void;
  renameItem: (itemId: string, newName: string) => void;

  // 工具方法
  getItem: (itemId: string) => FileSystemItem | undefined;
  getItemPath: (itemId: string) => string[];
  canMoveItem: (sourceId: string, targetId: string) => boolean;
}

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useFileSystem = create<FileSystemStore>()(
  devtools(
    (set, get) => ({
      ...getInitialFileSystemState(),

      // 文件操作
      selectFile: (fileId: string) => {
        set({ selectedFile: fileId });
      },

      toggleFolder: (folderId: string) => {
        set((state) => {
          const item = state.items[folderId];
          if (!item || item.type !== 'folder') return state;

          return {
            items: {
              ...state.items,
              [folderId]: {
                ...item,
                isOpen: !item.isOpen,
              },
            },
          };
        });
      },

      // 拖拽操作
      moveItem: (instruction: FileSystemInstruction, sourceId: string) => {
        set((state) => {
          const newItems = moveItem(state.items, sourceId, instruction);

          // 更新根项目列表
          const newRootItems = Object.keys(newItems).filter((id) => {
            const item = newItems[id];
            return item && !item.parent;
          });

          return {
            items: newItems,
            rootItems: newRootItems,
          };
        });
      },

      // 文件管理
      createFile: (name: string, content = '', parentId?: string) => {
        const fileId = generateId();
        const newFile: FileSystemItem = {
          id: fileId,
          name,
          type: 'file',
          content,
          parent: parentId,
        };

        set((state) => {
          const newItems = { ...state.items, [fileId]: newFile };

          if (parentId) {
            // 添加到父文件夹
            const parent = newItems[parentId];
            if (parent && parent.type === 'folder') {
              if (!parent.children) parent.children = [];
              parent.children.push(fileId);
            }
          } else {
            // 添加到根级别
            const currentRootItems = state.rootItems || [];
            return {
              items: newItems,
              rootItems: [...currentRootItems, fileId],
            };
          }

          return { items: newItems };
        });

        return fileId;
      },

      createFolder: (name: string, parentId?: string) => {
        const folderId = generateId();
        const newFolder: FileSystemItem = {
          id: folderId,
          name,
          type: 'folder',
          isOpen: false,
          children: [],
          parent: parentId,
        };

        set((state) => {
          const newItems = { ...state.items, [folderId]: newFolder };

          if (parentId) {
            // 添加到父文件夹
            const parent = newItems[parentId];
            if (parent && parent.type === 'folder') {
              if (!parent.children) parent.children = [];
              parent.children.push(folderId);
            }
          } else {
            // 添加到根级别
            const currentRootItems = state.rootItems || [];
            return {
              items: newItems,
              rootItems: [...currentRootItems, folderId],
            };
          }

          return { items: newItems };
        });

        return folderId;
      },

      deleteItem: (itemId: string) => {
        set((state) => {
          const item = state.items[itemId];
          if (!item) return state;

          // 递归删除所有子项
          const itemsToDelete = [itemId];
          const stack = [itemId];

          while (stack.length > 0) {
            const currentId = stack.pop()!;
            const current = state.items[currentId];
            if (current?.type === 'folder' && current.children) {
              stack.push(...current.children);
              itemsToDelete.push(...current.children);
            }
          }

          // 从父文件夹中移除
          if (item.parent) {
            const parent = state.items[item.parent];
            if (parent && parent.children) {
              parent.children = parent.children.filter((id) => id !== itemId);
            }
          } else {
            // 从根级别移除
            const newRootItems = state.rootItems.filter((id) => id !== itemId);
            return {
              items: state.items,
              rootItems: newRootItems,
            };
          }

          // 删除所有相关项
          const newItems = { ...state.items };
          itemsToDelete.forEach((id) => {
            delete newItems[id];
          });

          // 如果删除的是当前选中的文件，清除选择
          let newSelectedFile = state.selectedFile;
          if (itemsToDelete.includes(state.selectedFile || '')) {
            newSelectedFile = undefined;
          }

          return {
            items: newItems,
            selectedFile: newSelectedFile,
          };
        });
      },

      renameItem: (itemId: string, newName: string) => {
        set((state) => {
          const item = state.items[itemId];
          if (!item) return state;

          return {
            items: {
              ...state.items,
              [itemId]: {
                ...item,
                name: newName,
              },
            },
          };
        });
      },

      // 工具方法
      getItem: (itemId: string) => {
        return get().items[itemId];
      },

      getItemPath: (itemId: string) => {
        const state = get();
        const path: string[] = [];
        let currentId: string | undefined = itemId;

        while (currentId) {
          const item = state.items[currentId] as FileSystemItem | undefined;
          if (!item) break;
          path.unshift(currentId);
          currentId = item.parent;
        }

        return path;
      },

      canMoveItem: (sourceId: string, targetId: string) => {
        const state = get();

        // 不能移动到自己
        if (sourceId === targetId) return false;

        // 不能移动到自己的子项中
        const sourcePath = state.getItemPath(sourceId);
        const targetPath = state.getItemPath(targetId);

        return !targetPath.includes(sourceId);
      },
    }),
    {
      name: 'file-system-store',
    },
  ),
);
