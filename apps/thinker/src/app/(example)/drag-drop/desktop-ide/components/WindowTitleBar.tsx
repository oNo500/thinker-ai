'use client';

import React, { useRef, useState } from 'react';
import { Minus, Square, Maximize2, X, Move } from 'lucide-react';
import { Button } from '@repo/ui/components/button';

import { useDesktopStore } from '../stores/desktop-store';

import type { Position } from '../types';

interface WindowTitleBarProps {
  windowId: string;
  title: string;
  onStartDrag?: (startPosition: Position) => void;
}

export function WindowTitleBar({ windowId, title, onStartDrag }: WindowTitleBarProps) {
  const titleBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow, getWindow } = useDesktopStore();

  const window = getWindow(windowId);
  if (!window) return null;

  const handleClose = () => {
    closeWindow(windowId);
  };

  const handleMinimize = () => {
    minimizeWindow(windowId);
  };

  const handleMaximize = () => {
    toggleMaximizeWindow(windowId);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 只处理左键

    e.preventDefault();
    focusWindow(windowId);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosition = { x: window.position.x, y: window.position.y };

    setIsDragging(true);
    onStartDrag?.(startPosition);

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newPosition = {
        x: startPosition.x + deltaX,
        y: startPosition.y + deltaY,
      };

      // 边界检测
      const maxX = globalThis.innerWidth - window.size.width;
      const maxY = globalThis.innerHeight - window.size.height;

      newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
      newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));

      onStartDrag?.(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = () => {
    handleMaximize();
  };

  return (
    <div
      ref={titleBarRef}
      role="button"
      tabIndex={0}
      aria-label={`移动窗口 ${title}`}
      className={`flex h-8 cursor-move select-none items-center justify-between border-b border-gray-200 bg-gray-100 px-3 dark:border-gray-700 dark:bg-gray-800 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} `}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // 模拟鼠标按下事件
          const fakeEvent = { clientX: 0, clientY: 0, button: 0, preventDefault: () => {} } as React.MouseEvent;
          handleMouseDown(fakeEvent);
        }
      }}
    >
      {/* 标题 */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Move className="h-3 w-3 text-gray-400" />
        <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{title}</span>
      </div>

      {/* 窗口控制按钮 */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleMinimize();
          }}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleMaximize();
          }}
        >
          {window.isMaximized ? <Square className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
