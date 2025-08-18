'use client';

import React, { useEffect, useRef } from 'react';
import { dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import { Tab } from './tab';

import type { TabDragData, FileDragData } from '@/features/drag-drop/types';

interface TabBarProps {
  windowId: string;
}

export function TabBar({ windowId }: TabBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { windows, moveTab, addTab } = useDesktopStore();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        const sourceData = source.data as Record<string, unknown>;
        return sourceData.type === 'desktop-tab' || sourceData.type === 'desktop-file';
      },
      getData: () => ({
        type: 'tab-area',
        windowId,
      }),
      onDrop: ({ source }) => {
        const sourceData = source.data as Record<string, unknown>;

        if (sourceData.type === 'desktop-file') {
          // 文件拖拽到tab区域，创建新tab
          const fileData = sourceData as unknown as FileDragData;
          const newTab = {
            id: Math.random().toString(36).substring(2, 9),
            fileId: fileData.fileId,
            fileName: fileData.fileName,
            content: fileData.content,
            isActive: true,
          };
          addTab(windowId, newTab);
        }
      },
    });
  }, [windowId, addTab]);

  // 监听tab重排序
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        const sourceData = source.data as Record<string, unknown>;
        return sourceData.type === 'desktop-tab';
      },
      onDrop: ({ source, location }) => {
        const sourceData = source.data as unknown as TabDragData;
        const destination = location.current.dropTargets[0];

        if (!destination) return;

        const instruction = extractInstruction(destination.data);
        if (!instruction) return;

        const targetWindowId = destination.data.windowId as string;
        const targetIndex = destination.data.targetIndex as number;

        // 如果是同一个窗口内的重排序
        if (sourceData.windowId === targetWindowId) {
          // TODO: 实现同窗口内tab重排序
          console.log('Same window reorder:', instruction.operation, targetIndex);
        } else {
          // 跨窗口移动tab
          const insertIndex = instruction.operation === 'reorder-before' ? targetIndex : targetIndex + 1;
          moveTab(sourceData.windowId, targetWindowId, sourceData.tabId, insertIndex);
        }
      },
    });
  }, [moveTab]);

  const window = windows[windowId];
  if (!window) return null;

  if (window.tabs.length === 0) {
    return (
      <div
        ref={ref}
        className="flex h-10 items-center border-b border-gray-200 bg-gray-50 px-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">暂无打开的文件</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
    >
      {window.tabs.map((tab, index) => (
        <Tab key={tab.id} tab={tab} windowId={windowId} index={index} />
      ))}
    </div>
  );
}
