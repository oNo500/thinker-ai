'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@repo/ui/lib/utils';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

import { DockItem } from './dock-item';
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
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  if (!dock.isVisible) return null;

  const isVertical = position === 'left';
  const sizeMap = {
    small: isVertical ? 48 : 48,
    medium: isVertical ? 60 : 60,
    large: isVertical ? 72 : 72,
  };

  const itemSize = sizeMap[size];

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

  return (
    <motion.div
      className={cn(
        'fixed z-50 flex items-center justify-center',
        'bg-white/80 backdrop-blur-md dark:bg-gray-900/80',
        'border border-white/20 dark:border-gray-700/50',
        'shadow-lg shadow-black/10 dark:shadow-black/30',
        isVertical
          ? ['left-4 top-1/2 -translate-y-1/2', 'flex-col rounded-2xl', 'px-2 py-3', 'min-h-16']
          : ['bottom-4 left-1/2 -translate-x-1/2', 'flex-row rounded-2xl', 'px-3 py-2', 'min-w-16'],
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
      <AnimatePresence mode="popLayout">
        {dock.items.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            size={itemSize}
            isVertical={isVertical}
            showLabels={showLabels}
            hoveredItemId={hoveredItemId}
            onHover={(id) => setHoveredItemId(id)}
            itemIndex={index}
            totalItems={dock.items.length}
            onClick={() => handleItemClick(item.windowId, item.isMinimized, item.isActive)}
          />
        ))}
      </AnimatePresence>

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
