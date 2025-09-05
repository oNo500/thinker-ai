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

  const handleMouseUp = useCallback((e: MouseEvent) => {
    // 延迟一小段时间确保selection已经完成
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

      // 使用鼠标位置而不是文本位置
      setSelection({
        text,
        range: userSelection.getRangeAt(0),
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY - 10,
      });
    }, 10);
  }, []);

  const handleMouseDown = useCallback(() => {
    // 鼠标按下时清除之前的选择
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

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  return {
    selection,
    clearSelection,
  };
};