'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/ui/lib/utils';

import type { WindowState } from '@/features/drag-drop/types';

interface WindowPreviewProps {
  window: WindowState;
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
}

export function WindowPreview({ window, isVisible, position, onClose, onFocus, onMinimize }: WindowPreviewProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        'pointer-events-auto fixed z-[60]',
        'bg-white/95 dark:bg-gray-900/95',
        'border border-gray-200/50 backdrop-blur-sm dark:border-gray-700/50',
        'rounded-lg shadow-xl shadow-black/20',
        'min-w-48 max-w-64 p-3',
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%) translateY(-8px)',
      }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* 预览头部 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{window.hasFileTree ? '📁' : '📄'}</span>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{window.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {window.tabs.length} tab{window.tabs.length !== 1 ? 's' : ''}
              {window.isMinimized && ' (最小化)'}
            </p>
          </div>
        </div>

        {/* 状态指示器 */}
        <div className={cn('h-2 w-2 rounded-full', window.isMinimized ? 'bg-yellow-400' : 'bg-green-400')} />
      </div>

      {/* Tab 列表 */}
      {window.tabs.length > 0 && (
        <div className="mb-3 space-y-1">
          {window.tabs.slice(0, 3).map((tab) => (
            <div
              key={tab.id}
              className={cn(
                'flex items-center gap-2 rounded px-2 py-1 text-xs',
                'bg-gray-50 dark:bg-gray-800/50',
                tab.isActive && 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
              )}
            >
              <span className="text-xs">📄</span>
              <span className="flex-1 truncate">{tab.fileName}</span>
              {tab.isDirty && <span className="text-orange-500">●</span>}
            </div>
          ))}
          {window.tabs.length > 3 && (
            <div className="px-2 text-xs text-gray-500 dark:text-gray-400">还有 {window.tabs.length - 3} 个标签...</div>
          )}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <motion.button
          className={cn(
            'flex-1 px-2 py-1 text-xs',
            'bg-blue-500 text-white hover:bg-blue-600',
            'rounded transition-colors',
          )}
          onClick={onFocus}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {window.isMinimized ? '恢复' : '聚焦'}
        </motion.button>

        <motion.button
          className={cn(
            'flex-1 px-2 py-1 text-xs',
            'bg-gray-500 text-white hover:bg-gray-600',
            'rounded transition-colors',
          )}
          onClick={onMinimize}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={window.isMinimized}
        >
          最小化
        </motion.button>

        <motion.button
          className={cn(
            'flex-1 px-2 py-1 text-xs',
            'bg-red-500 text-white hover:bg-red-600',
            'rounded transition-colors',
          )}
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          关闭
        </motion.button>
      </div>

      {/* 箭头 */}
      <div className="absolute left-1/2 top-full -translate-x-1/2">
        <div className="h-3 w-3 translate-y-[-6px] rotate-45 transform border-b border-r border-gray-200/50 bg-white dark:border-gray-700/50 dark:bg-gray-900" />
      </div>
    </motion.div>
  );
}
