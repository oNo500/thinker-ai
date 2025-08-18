'use client';

import React, { useEffect } from 'react';

import { Desktop, EnhancedFileTree, useDesktopStore } from '@/features/drag-drop';

export default function FileSystemPage() {
  const { windows, createWindow } = useDesktopStore();

  // 创建主窗口
  useEffect(() => {
    // 检查是否已经有主窗口
    const hasMainWindow = Object.values(windows).some((window) => window.hasFileTree);

    if (!hasMainWindow) {
      createWindow({
        title: '桌面IDE - 文件管理器',
        position: { x: 100, y: 50 },
        size: { width: 1200, height: 800 },
        hasFileTree: true,
      });
    }
  }, [windows, createWindow]);

  return (
    <Desktop>
      <EnhancedFileTree windowId={Object.values(windows).find((w) => w.hasFileTree)?.id || ''} />
    </Desktop>
  );
}
