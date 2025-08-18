'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';

import { getFileIcon, canMoveItem } from '@/features/drag-drop/stores/file-system-data';

import type { FileSystemItem, DragData, FileSystemInstruction } from '@/features/drag-drop/types';

interface FileTreeItemProps {
  item: FileSystemItem;
  level: number;
  onSelect: (itemId: string) => void;
  onToggleFolder: (itemId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  selectedFile?: string;
  allItems: Record<string, FileSystemItem>;
  children?: React.ReactNode;
}

export function FileTreeItem({
  item,
  level,
  onSelect,
  onToggleFolder,
  onMove,
  selectedFile,
  allItems,
  children,
}: FileTreeItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const isSelected = selectedFile === item.id;
  const isFolder = item.type === 'folder';

  const handleClick = useCallback(() => {
    if (isFolder) {
      onToggleFolder(item.id);
    } else {
      onSelect(item.id);
    }
  }, [isFolder, item.id, onToggleFolder, onSelect]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: (): DragData => ({
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
          const sourceData = source.data as DragData;
          if (sourceData.type !== 'file-system-item') return false;

          // 检查是否可以移动
          return canMoveItem(allItems, sourceData.itemId, item.id);
        },
        getData: ({ input, element }) => {
          const data = {
            type: 'file-tree-item',
            itemId: item.id,
            itemType: item.type,
          };

          // 为文件夹添加额外的拖放操作
          const operations = isFolder
            ? {
                'reorder-before': 'available' as const,
                'reorder-after': 'available' as const,
                combine: 'available' as const, // 移动到文件夹内
              }
            : {
                'reorder-before': 'available' as const,
                'reorder-after': 'available' as const,
              };

          return attachInstruction(data, {
            input,
            element,
            operations,
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

          const sourceData = args.source.data as DragData;
          const extractedInstruction = extractInstruction(args.self.data);

          if (!extractedInstruction || sourceData.itemId === item.id) return;

          // 转换指令
          let fileSystemInstruction: FileSystemInstruction;

          switch (extractedInstruction.operation) {
            case 'combine':
              if (isFolder) {
                fileSystemInstruction = {
                  type: 'move-into-folder',
                  targetId: item.id,
                };
              } else {
                return; // 文件不支持combine操作
              }
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
  }, [item.id, item.type, isFolder, allItems, onMove]);

  const paddingLeft = level * 20 + 8;

  return (
    <div>
      <div
        ref={ref}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        className={`relative flex cursor-pointer select-none items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''} ${isDragging ? 'opacity-50' : ''} `}
        style={{ paddingLeft }}
      >
        <span className="mr-2 text-sm">{getFileIcon(item)}</span>
        <span className="flex-1 truncate text-sm">{item.name}</span>

        {instruction && <DropIndicator instruction={instruction} />}
      </div>

      {/* 渲染子项 */}
      {isFolder && item.isOpen && children}
    </div>
  );
}
