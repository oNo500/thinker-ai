import { useState, useEffect, useCallback, useRef } from 'react';

interface TextSelectionInfo {
  text: string;
  range: Range | null;
  x: number;
  y: number;
}

export const useTextSelection = () => {
  const [selection, setSelection] = useState<TextSelectionInfo | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const computePositionFromRange = useCallback((range: Range) => {
    const rect = range.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const offset = 8; // 与选区的垂直间距

    // 如果 rect 异常，退化为当前鼠标位置
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      return {
        x: mousePositionRef.current.x + scrollX,
        y: mousePositionRef.current.y + scrollY - offset,
      };
    }

    const centerX = rect.left + rect.width / 2 + scrollX;
    const aboveY = rect.top + scrollY - offset;
    const belowY = rect.bottom + scrollY + offset;

    // 如果顶部空间不足，则放在下方，否则放在上方
    const topViewport = scrollY + 8;
    const y = aboveY >= topViewport ? aboveY : belowY;

    // 粗略限制在视口内，避免太靠边（由于未知菜单宽度，这里只做近似限制）
    const minX = scrollX + 16;
    const maxX = scrollX + window.innerWidth - 16;
    const x = Math.min(Math.max(centerX, minX), maxX);

    return { x, y };
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    const target = e.target as Element | null;
    // 检查是否点击在浮动菜单相关区域内
    if (target?.closest('[data-floating-menu]') || 
        target?.closest('[data-radix-menubar-content]') ||
        target?.closest('[data-radix-popper-content-wrapper]')) {
      return;
    }
    
    // 延迟一小段时间确保 selection 已经完成
    setTimeout(() => {
      const userSelection = window.getSelection();

      if (!userSelection || userSelection.isCollapsed || !userSelection.rangeCount) {
        setSelection(null);
        return;
      }

      const text = userSelection.toString().trim();
      if (!text) {
        setSelection(null);
        return;
      }

      const range = userSelection.getRangeAt(0);
      const { x, y } = computePositionFromRange(range);

      setSelection({
        text,
        range,
        x,
        y,
      });
    }, 10);
  }, [computePositionFromRange]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const target = e.target as Element | null;
    // 检查是否点击在浮动菜单相关区域内
    if (target?.closest('[data-floating-menu]') || 
        target?.closest('[data-radix-menubar-content]') ||
        target?.closest('[data-radix-popper-content-wrapper]')) {
      return;
    }
    // 鼠标按下开始新的选区时，清除之前的选择
    setSelection(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseMove, handleMouseUp, handleMouseDown]);

  // 当滚动或窗口尺寸变化时，基于已存在的 range 重新计算位置
  useEffect(() => {
    if (!selection || !selection.range) return;

    const updatePosition = () => {
      const { x, y } = computePositionFromRange(selection.range as Range);
      setSelection(prev => (prev ? { ...prev, x, y } : prev));
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    // 也在下一帧更新一次，避免初始位置偏差
    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition as EventListener);
      window.removeEventListener('resize', updatePosition as EventListener);
    };
  }, [selection, computePositionFromRange]);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  return {
    selection,
    clearSelection,
  };
};