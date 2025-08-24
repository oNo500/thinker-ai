'use client';

import React, { useCallback } from 'react';

import { useFileSystem } from '@/features/drag-drop/hooks/use-file-system';
import { useGlobalDragMonitor } from '@/features/drag-drop/hooks/use-drag-and-drop';

import { FileToolbar } from './file-toolbar';
import { FileTreeItem } from './file-tree-item';

import type { FileSystemInstruction } from '@/features/drag-drop/types';

interface FileTreeProps {
  onFileSelect: (fileId: string, content: string) => void;
}

export function FileTree({ onFileSelect }: FileTreeProps) {
  const { items, rootItems, selectedFile, selectFile, toggleFolder, moveItem, createFile, createFolder, deleteItem } =
    useFileSystem();

  // 监听全局拖拽事件
  useGlobalDragMonitor();

  const handleDeleteSelected = useCallback(() => {
    if (selectedFile) {
      deleteItem(selectedFile);
    }
  }, [selectedFile, deleteItem]);

  const handleSelect = useCallback(
    (itemId: string) => {
      selectFile(itemId);
      const item = items[itemId];
      if (item && item.type === 'file' && item.content) {
        onFileSelect(itemId, item.content);
      }
    },
    [items, selectFile, onFileSelect],
  );

  const handleMove = useCallback(
    (instruction: FileSystemInstruction, sourceId: string) => {
      console.log('Moving item:', sourceId, 'with instruction:', instruction);
      moveItem(instruction, sourceId);
    },
    [moveItem],
  );

  // 递归渲染文件树项目
  const renderItems = (itemIds: string[], level: number = 0): React.ReactNode => {
    return itemIds.map((itemId) => {
      const item = items[itemId];
      if (!item) return null;

      return (
        <FileTreeItem
          key={itemId}
          item={item}
          level={level}
          onSelect={handleSelect}
          onToggleFolder={toggleFolder}
          onMove={handleMove}
          selectedFile={selectedFile}
          allItems={items}
        >
          {item.type === 'folder' && item.isOpen && item.children && renderItems(item.children, level + 1)}
        </FileTreeItem>
      );
    });
  };

  return (
    <div className="h-full w-full border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-2 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">文件资源管理器</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">拖拽文件可重新排序，拖拽到桌面创建新窗口</p>
      </div>
      <FileToolbar
        onCreateFile={createFile}
        onCreateFolder={createFolder}
        onDeleteSelected={handleDeleteSelected}
        hasSelectedItem={!!selectedFile}
      />
      <div className="h-full overflow-y-auto p-2">{renderItems(rootItems)}</div>
    </div>
  );
}
