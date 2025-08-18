'use client';

import React, { useEffect, useRef, useState } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import type { DesktopDragData } from '@/features/drag-drop/types';

interface DesktopDropZoneProps {
  children?: React.ReactNode;
  className?: string;
}

export function DesktopDropZone({ children, className = '' }: DesktopDropZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { createWindow } = useDesktopStore();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        const sourceData = source.data as DesktopDragData;
        return sourceData.type === 'desktop-file';
      },
      getData: () => ({ type: 'desktop' }),
      onDragEnter: () => setIsDragOver(true),
      onDragLeave: () => setIsDragOver(false),
      onDrop: (args) => {
        setIsDragOver(false);

        const sourceData = args.source.data as DesktopDragData;
        if (sourceData.type === 'desktop-file') {
          // 创建新窗口
          const windowId = createWindow({
            title: sourceData.fileName,
            hasFileTree: false,
            initialTab: {
              id: `tab-${Date.now()}`,
              fileId: sourceData.fileId,
              fileName: sourceData.fileName,
              content: sourceData.content,
              isActive: true,
            },
          });

          console.log('Created new window for file:', sourceData.fileName, 'Window ID:', windowId);
        }
      },
    });
  }, [createWindow]);

  return (
    <div
      ref={ref}
      className={`min-h-screen w-full transition-colors duration-200 ${
        isDragOver ? 'bg-blue-50 dark:bg-blue-950' : ''
      } ${className}`}
    >
      {/* 拖拽提示 */}
      {isDragOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="text-center">
              <div className="mb-4 text-6xl">📁</div>
              <h3 className="mb-2 text-lg font-semibold">创建新窗口</h3>
              <p className="text-gray-600 dark:text-gray-400">拖拽文件到此处将创建新的编辑器窗口</p>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
