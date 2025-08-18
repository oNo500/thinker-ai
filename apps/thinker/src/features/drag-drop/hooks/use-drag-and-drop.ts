import { useEffect, useState, useRef } from 'react';
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
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';

import type { FileSystemItem, FileSystemInstruction, AllDragData, DragData } from '@/features/drag-drop/types';

// 类型守卫函数
function isFileSystemDragData(data: AllDragData): data is DragData {
  return data.type === 'file-system-item';
}

export function useDragAndDrop(
  item: FileSystemItem,
  allItems: Record<string, FileSystemItem>,
  onMove: (instruction: FileSystemInstruction, sourceId: string) => void,
  canMoveItem: (items: Record<string, FileSystemItem>, sourceId: string, targetId: string) => boolean,
) {
  const ref = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => {
          // 所有项目都可以在文件系统内拖拽排序
          return {
            type: 'file-system-item',
            itemId: item.id,
            itemType: item.type,
            // 添加额外信息用于区分拖拽目标
            sourceType: 'file-system',
            sourceId: item.id,
            // 添加文件信息用于桌面拖拽
            itemName: item.name,
            itemContent: item.content || '',
          };
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
            // 标记这是文件系统内的拖拽目标
            targetType: 'file-system',
            targetId: item.id,
          };

          const operations =
            item.type === 'folder'
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
  }, [item.id, item.type, allItems, onMove, canMoveItem]);

  return {
    ref,
    isDragging,
    instruction,
  };
}

export function useGlobalDragMonitor() {
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        const data = source.data as AllDragData;
        return isFileSystemDragData(data);
      },
      onDrop: ({ source, location }) => {
        // 这里可以添加额外的全局拖拽逻辑
        // 比如拖拽到空白区域的处理
        if (location.current.dropTargets.length === 0) {
          // 拖拽到空白区域，可以移动到根目录
          const sourceData = source.data as AllDragData;
          if (isFileSystemDragData(sourceData)) {
            console.log('Dropped to empty area:', sourceData.itemId);
          }
        }
      },
    });
  }, []);
}
