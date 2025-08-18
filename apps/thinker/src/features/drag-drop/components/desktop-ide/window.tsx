'use client';

import React, { useRef, useState } from 'react';
import { Card } from '@repo/ui/components/card';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import { WindowTitleBar } from './window-title-bar';
import { TabBar } from './tab-system/tab-bar';
import { TabContent } from './tab-system/tab-content';

import type { Position } from '@/features/drag-drop/types';

interface WindowProps {
  windowId: string;
  children?: React.ReactNode;
}

export function Window({ windowId, children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');

  const { getWindow, moveWindow, resizeWindow, focusWindow } = useDesktopStore();

  const window = getWindow(windowId);
  if (!window || window.isMinimized) return null;

  const handleStartDrag = (newPosition: Position) => {
    moveWindow(windowId, newPosition);
  };

  const handleMouseDown = () => {
    focusWindow(windowId);
  };

  // 窗口调整大小逻辑
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    setResizeHandle(handle);

    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { ...window.size };
    const startPosition = { ...window.position };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startSize.width;
      let newHeight = startSize.height;
      let newX = startPosition.x;
      let newY = startPosition.y;

      if (handle.includes('right')) {
        newWidth = Math.max(300, startSize.width + deltaX);
      }
      if (handle.includes('left')) {
        newWidth = Math.max(300, startSize.width - deltaX);
        newX = startPosition.x + deltaX;
      }
      if (handle.includes('bottom')) {
        newHeight = Math.max(200, startSize.height + deltaY);
      }
      if (handle.includes('top')) {
        newHeight = Math.max(200, startSize.height - deltaY);
        newY = startPosition.y + deltaY;
      }

      resizeWindow(windowId, { width: newWidth, height: newHeight });
      if (newX !== startPosition.x || newY !== startPosition.y) {
        moveWindow(windowId, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle('');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const windowStyle = window.isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: window.zIndex,
      }
    : {
        position: 'absolute' as const,
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      };

  return (
    <Card
      ref={windowRef}
      className={`overflow-hidden border border-gray-300 shadow-lg dark:border-gray-600 ${isResizing ? 'select-none' : ''} `}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* 窗口标题栏 */}
      <WindowTitleBar windowId={windowId} title={window.title} onStartDrag={handleStartDrag} />

      {/* Tab栏 */}
      <TabBar windowId={windowId} />

      {/* 窗口内容区域 */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100% - 72px)' }}>
        {/* 左侧文件树（仅主窗口有） */}
        {window.hasFileTree && children && (
          <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">{children}</div>
        )}

        {/* 右侧Tab内容 */}
        <div className="flex flex-1 flex-col">
          <TabContent windowId={windowId} />
        </div>
      </div>

      {/* 调整大小的拖拽手柄 */}
      {!window.isMaximized && (
        <>
          {/* 边缘拖拽手柄 */}
          <div
            className="absolute left-0 top-0 h-1 w-full cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top')}
            role="button"
            tabIndex={-1}
            aria-label="Resize top"
          />
          <div
            className="absolute bottom-0 left-0 h-1 w-full cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
            role="button"
            tabIndex={-1}
            aria-label="Resize bottom"
          />
          <div
            className="absolute left-0 top-0 h-full w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'left')}
            role="button"
            tabIndex={-1}
            aria-label="Resize left"
          />
          <div
            className="absolute right-0 top-0 h-full w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'right')}
            role="button"
            tabIndex={-1}
            aria-label="Resize right"
          />

          {/* 角落拖拽手柄 */}
          <div
            className="absolute left-0 top-0 h-2 w-2 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            role="button"
            tabIndex={-1}
            aria-label="Resize top-left"
          />
          <div
            className="absolute right-0 top-0 h-2 w-2 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            role="button"
            tabIndex={-1}
            aria-label="Resize top-right"
          />
          <div
            className="absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            role="button"
            tabIndex={-1}
            aria-label="Resize bottom-left"
          />
          <div
            className="absolute bottom-0 right-0 h-2 w-2 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            role="button"
            tabIndex={-1}
            aria-label="Resize bottom-right"
          />
        </>
      )}
    </Card>
  );
}
