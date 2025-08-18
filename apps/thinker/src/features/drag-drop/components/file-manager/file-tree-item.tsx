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

import { getFileIcon, canMoveItem, canReceiveChildren } from '@/features/drag-drop/stores/file-system-data';

import type { FileSystemItem, DragData, FileSystemInstruction, DesktopDragData } from '@/features/drag-drop/types';

interface FileTreeItemProps {
  item: FileSystemItem;
  level: number;
  onSelect: (itemId: string) => void;
  onToggleFolder: (itemId: string) => void;
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void;
  onDesktopDrop?: (dragData: DesktopDragData) => void;
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
  onDesktopDrop,
  selectedFile,
  allItems,
  children,
}: FileTreeItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const isSelected = selectedFile === item.id;
  const isFolder = item.type === 'folder';
  const canReceive = isFolder && canReceiveChildren(item);

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
      // 使项目可拖拽
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
              sourceType: 'file-system',
              sourceId: item.id,
            } as DesktopDragData;
          } else {
            // 文件夹只能在文件系统内拖拽
            return {
              type: 'file-system-item',
              itemId: item.id,
              itemType: item.type,
              sourceType: 'file-system',
              sourceId: item.id,
              itemName: item.name,
              itemContent: '',
            } as DragData;
          }
        },
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      // 使项目成为拖放目标
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          const sourceData = source.data as DragData | DesktopDragData;

          // 桌面文件不能拖回文件树
          if (sourceData.type === 'desktop-file') {
            return false;
          }

          if (sourceData.type !== 'file-system-item') return false;

          // 检查是否可以移动
          const dragData = sourceData as DragData;
          return canMoveItem(allItems, dragData.itemId, item.id);
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
                ...(canReceive && { combine: 'available' as const }), // 移动到文件夹内
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
          setIsDragOver(true);
        },
        onDragLeave: () => {
          setInstruction(null);
          setIsDragOver(false);
        },
        onDrop: (args) => {
          setInstruction(null);
          setIsDragOver(false);

          const sourceData = args.source.data as DragData;
          const extractedInstruction = extractInstruction(args.self.data);

          if (!extractedInstruction || sourceData.itemId === item.id) return;

          // 转换指令
          let fileSystemInstruction: FileSystemInstruction;

          switch (extractedInstruction.operation) {
            case 'combine':
              if (isFolder && canReceive) {
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
  }, [item.id, item.type, isFolder, canReceive, allItems, onMove, item.content, item.name]);

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
        className={`relative flex cursor-pointer select-none items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''
        } ${isDragging ? 'opacity-50' : ''} ${isDragOver ? 'bg-green-100 dark:bg-green-900' : ''}`}
        style={{ paddingLeft }}
      >
        <span className="mr-2 text-sm">{getFileIcon(item)}</span>
        <span className="flex-1 truncate text-sm">{item.name}</span>

        {/* 拖放指示器 */}
        {instruction && <DropIndicator instruction={instruction} />}

        {/* 文件夹接收指示器 */}
        {isFolder && canReceive && isDragOver && (
          <div className="pointer-events-none absolute inset-0 rounded border-2 border-dashed border-green-500" />
        )}
      </div>

      {/* 渲染子项 */}
      {isFolder && item.isOpen && children}
    </div>
  );
}
