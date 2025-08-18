import React from 'react';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';

import { Tree, Folder, File, type TreeViewElement } from '@/components/magicui/file-tree';
import { getFileIcon } from '@/features/drag-drop/stores/file-system-data';
import { useDragAndDrop } from '@/features/drag-drop/hooks/use-drag-and-drop';

import type { FileSystemItem, FileSystemInstruction } from '@/features/drag-drop/types';

// 可拖拽文件组件
interface DraggableFileProps {
  item: FileSystemItem;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  allItems: Record<string, FileSystemItem>;
}

export function DraggableFile({ item, isSelected, onSelect, onMove, allItems }: DraggableFileProps) {
  const { ref, isDragging, instruction } = useDragAndDrop(item, allItems, onMove, canMoveItem);
  const fileIcon = getFileIcon(item);

  return (
    <div className="relative">
      <File
        ref={ref as React.RefObject<HTMLButtonElement>}
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

// 可拖拽文件夹组件
interface DraggableFolderProps {
  item: FileSystemItem;
  isSelected: boolean;
  onToggleFolder: (folderId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  allItems: Record<string, FileSystemItem>;
  children?: React.ReactNode;
}

export function DraggableFolder({
  item,
  isSelected,
  onToggleFolder,
  onMove,
  allItems,
  children,
}: DraggableFolderProps) {
  const { ref, isDragging, instruction } = useDragAndDrop(item, allItems, onMove, canMoveItem);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
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

// 简单的移动验证函数
function canMoveItem(items: Record<string, FileSystemItem>, sourceId: string, targetId: string): boolean {
  if (sourceId === targetId) return false;

  // 检查是否试图移动到自己的子项中
  const checkDescendants = (itemId: string, targetId: string): boolean => {
    const item = items[itemId];
    if (!item || !item.children) return false;

    if (item.children.includes(targetId)) return true;

    return item.children.some((childId) => checkDescendants(childId, targetId));
  };

  return !checkDescendants(sourceId, targetId);
}
