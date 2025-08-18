'use client';

import React, { useEffect, useRef } from 'react';
import { dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import { Window } from './window';

import type { FileDragData, TabDragData } from '@/features/drag-drop/types';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const { windows, createWindow, addTab } = useDesktopStore();

  // 处理拖拽到桌面的逻辑
  useEffect(() => {
    const element = desktopRef.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        const sourceData = source.data as Record<string, unknown>;
        return sourceData.type === 'desktop-file' || sourceData.type === 'desktop-tab';
      },
      getData: () => ({
        type: 'desktop',
      }),
      onDrop: ({ source, location }) => {
        const sourceData = source.data;

        // 检查是否有其他drop target处理了这个事件
        const hasOtherTargets = location.current.dropTargets.some((target) => target.data.type !== 'desktop');

        if (hasOtherTargets) return;

        if (sourceData.type === 'desktop-file') {
          // 文件拖拽到桌面，创建新窗口
          const fileData = sourceData as unknown as FileDragData;
          const newTab = {
            id: Math.random().toString(36).substring(2, 9),
            fileId: fileData.fileId,
            fileName: fileData.fileName,
            content: fileData.content,
            isActive: true,
          };

          createWindow({
            title: `文件预览 - ${fileData.fileName}`,
            position: { x: 200 + Object.keys(windows).length * 30, y: 100 + Object.keys(windows).length * 30 },
            size: { width: 800, height: 600 },
            hasFileTree: false,
            initialTab: newTab,
          });
        } else if (sourceData.type === 'desktop-tab') {
          // Tab拖拽到桌面，分离为新窗口
          const tabData = sourceData as unknown as TabDragData;

          createWindow({
            title: `文件预览 - ${tabData.tabData.fileName}`,
            position: { x: 300 + Object.keys(windows).length * 30, y: 150 + Object.keys(windows).length * 30 },
            size: { width: 800, height: 600 },
            hasFileTree: false,
            initialTab: tabData.tabData,
          });
        }
      },
    });
  }, [createWindow, windows]);

  // 监听全局拖拽事件
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        const sourceData = source.data as Record<string, unknown>;
        return sourceData.type === 'desktop-file' || sourceData.type === 'desktop-tab';
      },
      onDrop: ({ source, location }) => {
        // 这里可以添加全局拖拽完成后的清理逻辑
        console.log('Global drop event:', source.data, location);
      },
    });
  }, []);

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
        `,
        backgroundSize: '20px 20px',
      }}
    >
      {/* 渲染所有窗口 */}
      {Object.values(windows).map((window) => (
        <Window key={window.id} windowId={window.id}>
          {/* 如果是主窗口且有文件树，渲染children */}
          {window.hasFileTree && children}
        </Window>
      ))}

      {/* 桌面提示信息 */}
      {Object.keys(windows).length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="mb-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/50 dark:bg-gray-800/50">
                <span className="text-2xl">🖥️</span>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold">欢迎使用桌面IDE</h2>
            <p className="max-w-md text-sm">拖拽文件到桌面创建新窗口，或者在文件树中点击文件开始编辑</p>
          </div>
        </div>
      )}
    </div>
  );
}
