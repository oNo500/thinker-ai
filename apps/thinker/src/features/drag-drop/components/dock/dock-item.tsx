'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/ui/lib/utils';

import type { DockItemData as DockItemType } from '@/features/drag-drop/types';

interface DockItemProps {
  item: DockItemType;
  size: number;
  isVertical: boolean;
  showLabels: boolean;
  hoveredItemId: string | null;
  onHover: (id: string | null) => void;
  itemIndex: number;
  totalItems: number;
  onClick: () => void;
}

export function DockItem({
  item,
  size,
  isVertical,
  showLabels,
  hoveredItemId,
  onHover,
  itemIndex,
  totalItems,
  onClick,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 处理工具提示延迟显示
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isHovered) {
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
      }, 500); // 500ms 后显示工具提示
    } else {
      setShowTooltip(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered]);

  // 计算缩放比例（包括邻近项目的影响）
  const getScaleMultiplier = () => {
    if (hoveredItemId === null) return 1;

    if (hoveredItemId === item.id) {
      return 1.4; // 主悬停项目放大到 1.4x
    }

    // 简化版：只要有悬停就让所有相邻项目轻微放大
    // TODO: 实现基于实际悬停项目索引的精确计算
    return 1.05; // 其他项目轻微放大以增加连贯性
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(item.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  const getStatusIndicator = () => {
    if (item.isMinimized) {
      return 'opacity-50 saturate-50'; // 最小化状态：半透明
    }
    if (item.isActive) {
      return ''; // 活跃状态：正常显示
    }
    return 'opacity-70'; // 非活跃状态：稍微透明
  };

  const getActiveIndicator = () => {
    if (item.isMinimized) return null;

    return (
      <motion.div
        className={cn(
          'absolute rounded-full bg-blue-500',
          isVertical
            ? ['right-1 top-1/2 -translate-y-1/2', 'h-3 w-1']
            : ['bottom-1 left-1/2 -translate-x-1/2', 'h-1 w-3'],
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: item.isActive ? 1 : 0.7,
          opacity: item.isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
      />
    );
  };

  const getBadge = () => {
    if (!item.hasMultipleTabs || item.tabCount <= 1) return null;

    return (
      <motion.div
        className={cn(
          'absolute flex items-center justify-center',
          'bg-red-500 text-xs font-medium text-white',
          'h-5 min-w-5 rounded-full px-1',
          isVertical ? '-right-2 -top-2' : '-right-2 -top-2',
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {item.tabCount}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      layout
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: 1,
        scale: getScaleMultiplier(),
        transition: {
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.15,
          },
        },
      }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{
        duration: 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      <motion.button
        className={cn(
          'relative flex items-center justify-center',
          'bg-white/50 dark:bg-gray-800/50',
          'border border-white/30 dark:border-gray-600/30',
          'rounded-xl shadow-sm',
          'transition-all duration-200',
          'hover:bg-white/70 dark:hover:bg-gray-700/70',
          'hover:border-white/50 dark:hover:border-gray-500/50',
          'hover:shadow-md',
          getStatusIndicator(),
          isVertical ? 'mb-2' : 'mr-2',
        )}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
        }}
        onClick={onClick}
        title={`${item.title}${item.hasMultipleTabs ? ` (${item.tabCount} tabs)` : ''}`}
      >
        <span className="select-none">{item.icon}</span>

        {getActiveIndicator()}
        {getBadge()}
      </motion.button>

      {/* 标签显示 */}
      {(showLabels || showTooltip) && (
        <motion.div
          className={cn(
            'absolute z-10 px-2 py-1',
            'bg-black/80 text-xs text-white',
            'rounded-md shadow-lg',
            'pointer-events-none whitespace-nowrap',
            isVertical
              ? ['left-full top-1/2 -translate-y-1/2', 'ml-2']
              : ['bottom-full left-1/2 -translate-x-1/2', 'mb-2'],
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.3 }}
        >
          {item.title}
          {item.hasMultipleTabs && ` (${item.tabCount})`}

          {/* 箭头 */}
          <div
            className={cn(
              'absolute h-2 w-2 rotate-45 bg-black/80',
              isVertical
                ? ['right-full top-1/2 -translate-y-1/2', 'translate-x-1']
                : ['left-1/2 top-full -translate-x-1/2', '-translate-y-1'],
            )}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
