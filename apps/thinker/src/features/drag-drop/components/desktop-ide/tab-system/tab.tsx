'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FileCode, FileText, File, Settings, X, GripVertical } from 'lucide-react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import type { TabItem, TabDragData } from '@/features/drag-drop/types';

interface TabProps {
  tab: TabItem;
  windowId: string;
  index: number;
}

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return <FileCode className="h-4 w-4 text-blue-500" />;
    case 'md':
      return <FileText className="h-4 w-4 text-gray-600" />;
    case 'json':
      return <Settings className="h-4 w-4 text-orange-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
}

export function Tab({ tab, windowId, index }: TabProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const { switchTab, removeTab } = useDesktopStore();

  const handleClick = () => {
    if (!tab.isActive) {
      switchTab(windowId, tab.id);
    }
  };

  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    removeTab(windowId, tab.id);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: (): Record<string, unknown> => ({
          type: 'desktop-tab',
          tabId: tab.id,
          windowId,
          tabData: tab,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          const sourceData = source.data as Record<string, unknown>;
          return sourceData.type === 'desktop-tab' && sourceData.tabId !== tab.id;
        },
        getData: ({ input, element }) => {
          const data = {
            type: 'tab-area',
            windowId,
            targetIndex: index,
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
        onDrop: ({ source }) => {
          setInstruction(null);

          console.log('Tab onDrop triggered:', { source, windowId, index, tabId: tab.id });

          // 直接处理同窗口内的tab重排序
          const sourceData = source.data as Record<string, unknown>;
          if (sourceData.type === 'desktop-tab' && sourceData.windowId === windowId) {
            const sourceTabId = sourceData.tabId as string;

            console.log('Processing tab reorder:', { sourceTabId, targetIndex: index });

            if (sourceTabId !== tab.id) {
              // 调用store的重排序方法
              const { reorderTab } = useDesktopStore.getState();
              console.log('Calling reorderTab:', { windowId, sourceTabId, index });
              reorderTab(windowId, sourceTabId, index);
            } else {
              console.log('Same tab, skipping reorder');
            }
          } else {
            console.log('Not a valid tab reorder:', sourceData);
          }
        },
      }),
    );
  }, [tab, windowId, index]);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="tab"
      aria-selected={tab.isActive}
      className={`relative flex min-w-0 max-w-48 select-none items-center gap-2 border-r border-gray-200 px-3 py-2 transition-colors dark:border-gray-700 ${
        tab.isActive
          ? 'border-b-2 border-b-blue-500 bg-white dark:bg-gray-900'
          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
      } ${isDragging ? 'opacity-50' : ''} `}
    >
      {/* 文件图标 */}
      <div className="flex-shrink-0">{getFileIcon(tab.fileName)}</div>

      {/* 文件名 */}
      <span className="min-w-0 flex-1 truncate text-sm">
        {tab.fileName}
        {tab.isDirty && <span className="ml-1 text-orange-500">•</span>}
      </span>

      {/* 拖拽手柄 */}
      <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        <GripVertical className="h-3 w-3 text-gray-400" />
      </div>

      {/* 关闭按钮 */}
      <div
        className="flex h-4 w-4 flex-shrink-0 cursor-pointer items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        onClick={handleClose}
        role="button"
        tabIndex={-1}
        aria-label="关闭标签"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            handleClose(e);
          }
        }}
      >
        <X className="h-3 w-3" />
      </div>

      {/* 拖拽指示器 */}
      {instruction && (
        <DropIndicator
          instruction={{
            ...instruction,
            axis: 'horizontal',
            blocked: false,
          }}
        />
      )}
    </button>
  );
}
