import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTextSelection } from '@/lib/hooks/use-text-selection';
import { FloatingTextMenu } from './floating-text-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const TextSelectionHandler: React.FC = () => {
  const { selection, clearSelection } = useTextSelection();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('保存成功');
  
  // 手动关闭弹窗，不自动消失

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      // 检查是否点击在浮动菜单或其下拉内容内
      if (target.closest('[data-floating-menu]') || 
          target.closest('[data-radix-menubar-content]') ||
          target.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }
      clearSelection();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };

    if (selection) {
      // 使用 capture: true 确保在其他事件处理器之前处理
      document.addEventListener('click', handleClickOutside, { capture: true });
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selection, clearSelection]);

  return createPortal(
    <div data-floating-menu>
      {selection && (
        <FloatingTextMenu
          x={selection.x}
          y={selection.y}
          selectedText={selection.text}
          onClose={clearSelection}
          onSuccess={(msg) => {
            const nextMsg = msg ?? '保存成功';
            // 延后到双 RAF，确保 Menubar 的 DismissableLayer 完整关闭后再打开 Dialog
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setSuccessMessage(nextMsg);
                setSuccessOpen(true);
              });
            });
          }}
        />
      )}
      <div className="pointer-events-auto">
        <Dialog open={successOpen} onOpenChange={setSuccessOpen} modal={false}>
          <DialogContent
            className="top-[20%] translate-y-0 max-w-sm mx-auto bg-white/85 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl animate-in fade-in-0 zoom-in-95 duration-300"
            onInteractOutside={(e) => {
              // 调试：查看 Radix 传递的上下文，定位“闪一下”的原因
              // @ts-ignore
              const ctx = e?.detail?.context;
              // @ts-ignore
              const orig = e?.detail?.originalEvent;
              console.debug('[Dialog] onInteractOutside', { ctx, orig });
              e.preventDefault();
            }}
            onPointerDownOutside={(e) => {
              // @ts-ignore
              const ctx = e?.detail?.context;
              // @ts-ignore
              const orig = e?.detail?.originalEvent;
              console.debug('[Dialog] onPointerDownOutside', { ctx, orig });
              e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              console.debug('[Dialog] onEscapeKeyDown');
              e.preventDefault();
            }}
          >
            <DialogHeader className="text-center pb-2">
              <DialogTitle className="text-lg font-semibold text-green-700 flex items-center justify-center gap-2">
                ✅ 剪藏成功
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                {successMessage}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>,
    document.body
  );
};