import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTextSelection } from '@/lib/hooks/use-text-selection';
import { FloatingTextMenu } from './floating-text-menu';

export const TextSelectionHandler: React.FC = () => {
  const { selection, clearSelection } = useTextSelection();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('[data-floating-menu]')) {
        clearSelection();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };

    if (selection) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selection, clearSelection]);

  if (!selection) return null;

  return createPortal(
    <div data-floating-menu>
      <FloatingTextMenu
        x={selection.x}
        y={selection.y}
        selectedText={selection.text}
        onClose={clearSelection}
      />
    </div>,
    document.body
  );
};