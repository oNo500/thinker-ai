'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, Code2, Settings, Paintbrush, FileIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';
import { Dock as MagicDock, DockIcon } from '@/components/magicui/dock';

import { ContextMenu } from './context-menu';

interface DockProps {
  className?: string;
  position?: 'bottom' | 'left';
  autoHide?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

export function Dock({
  className,
  position = 'bottom',
  autoHide = false,
  size = 'medium',
  showLabels = false,
}: DockProps) {
  const { dock, focusWindow, minimizeWindow, toggleDockVisibility } = useDesktopStore();
  const [contextMenu, setContextMenu] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  if (!dock.isVisible) return null;

  const isVertical = position === 'left';

  // 根据 size 设置图标大小
  const iconSizeMap = {
    small: 32,
    medium: 40,
    large: 48,
  };

  const iconSize = iconSizeMap[size];

  const handleItemClick = (windowId: string, isMinimized: boolean, isActive: boolean) => {
    if (isMinimized) {
      // 恢复最小化窗口
      focusWindow(windowId);
    } else if (isActive) {
      // 最小化当前活跃窗口
      minimizeWindow(windowId);
    } else {
      // 切换到其他窗口
      focusWindow(windowId);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ isVisible: false, position: { x: 0, y: 0 } });
  };

  // 根据图标标识符渲染对应的 lucide 图标
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'folder':
        return <Folder className="size-4" />;
      case 'code':
        return <Code2 className="size-4" />;
      case 'file-text':
        return <FileText className="size-4" />;
      case 'settings':
        return <Settings className="size-4" />;
      case 'paintbrush':
        return <Paintbrush className="size-4" />;
      case 'file':
      default:
        return <FileIcon className="size-4" />;
    }
  };

  return (
    <motion.div
      className={cn(
        'fixed z-50',
        isVertical ? 'left-4 top-1/2 -translate-y-1/2' : 'bottom-4 left-1/2 -translate-x-1/2',
        className,
      )}
      initial={{
        opacity: 0,
        scale: 0.8,
        [isVertical ? 'x' : 'y']: isVertical ? -100 : 100,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        [isVertical ? 'x' : 'y']: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        [isVertical ? 'x' : 'y']: isVertical ? -100 : 100,
      }}
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      onContextMenu={handleContextMenu}
    >
      <MagicDock
        direction={isVertical ? 'middle' : 'middle'}
        iconSize={iconSize}
        iconMagnification={iconSize * 1.5}
        iconDistance={iconSize * 2.5}
        className={cn(
          'bg-white/80 backdrop-blur-md dark:bg-gray-900/80',
          'border border-white/20 dark:border-gray-700/50',
          'shadow-lg shadow-black/10 dark:shadow-black/30',
          isVertical ? 'flex-col' : 'flex-row',
        )}
      >
        <AnimatePresence mode="popLayout">
          {dock.items.map((item) => (
            <DockIcon
              key={item.id}
              className={cn(
                'relative transition-all duration-200',
                'hover:bg-white/20 dark:hover:bg-gray-700/20',
                item.isMinimized && 'opacity-50 saturate-50',
                !item.isActive && !item.isMinimized && 'opacity-70',
              )}
              onClick={() => handleItemClick(item.windowId, item.isMinimized, item.isActive)}
              title={`${item.title}${item.hasMultipleTabs ? ` (${item.tabCount} tabs)` : ''}`}
            >
              {/* 图标内容 */}
              <span className="select-none">{renderIcon(item.icon)}</span>

              {/* 活跃状态指示器 */}
              {!item.isMinimized && (
                <motion.div
                  className={cn(
                    'absolute rounded-full bg-blue-500',
                    isVertical
                      ? ['right-1 top-1/2 -translate-y-1/2', 'h-2 w-1']
                      : ['bottom-1 left-1/2 -translate-x-1/2', 'h-1 w-2'],
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: item.isActive ? 1 : 0.7,
                    opacity: item.isActive ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* 标签数量徽章 */}
              {item.hasMultipleTabs && item.tabCount > 1 && (
                <motion.div
                  className={cn(
                    'absolute flex items-center justify-center',
                    'bg-red-500 text-xs font-medium text-white',
                    'h-4 min-w-4 rounded-full px-1',
                    '-right-1 -top-1',
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {item.tabCount}
                </motion.div>
              )}
            </DockIcon>
          ))}
        </AnimatePresence>
      </MagicDock>

      {/* 右键菜单 */}
      <ContextMenu
        isVisible={contextMenu.isVisible}
        position={contextMenu.position}
        onClose={closeContextMenu}
        onToggleVisibility={toggleDockVisibility}
      />
    </motion.div>
  );
}
