'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/ui/lib/utils';

interface ContextMenuProps {
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onToggleVisibility: () => void;
}

export function ContextMenu({ isVisible, position, onClose, onToggleVisibility }: ContextMenuProps) {
  if (!isVisible) return null;

  const menuItems = [
    {
      label: '隐藏 Dock',
      icon: '🙈',
      onClick: onToggleVisibility,
    },
    {
      label: '关闭菜单',
      icon: '❌',
      onClick: onClose,
    },
  ];

  return (
    <>
      {/* 背景遮罩 */}
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="关闭菜单" />

      {/* 右键菜单 */}
      <motion.div
        className={cn(
          'fixed z-50 min-w-40',
          'bg-white/95 dark:bg-gray-900/95',
          'border border-gray-200/50 backdrop-blur-sm dark:border-gray-700/50',
          'rounded-lg shadow-xl shadow-black/20',
          'py-2',
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.15 }}
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className={cn(
              'flex w-full items-center gap-3 px-3 py-2 text-sm',
              'text-gray-700 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-colors',
            )}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
