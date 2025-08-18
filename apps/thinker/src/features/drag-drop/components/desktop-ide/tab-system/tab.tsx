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
import { Button } from '@repo/ui/components/button';

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

  const handleClose = (e: React.MouseEvent) => {
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
            type: 'tab-reorder',
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
        onDrop: () => {
          setInstruction(null);
        },
      }),
    );
  }, [tab.id, windowId, index]);

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
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 flex-shrink-0 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
        onClick={handleClose}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* 拖拽指示器 */}
      {instruction && <DropIndicator instruction={instruction} />}
    </button>
  );
}
