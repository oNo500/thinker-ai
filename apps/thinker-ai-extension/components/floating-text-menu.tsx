import React, { useState } from 'react';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Bookmark, Maximize, FileText, Star, Folder } from 'lucide-react';

interface FloatingTextMenuProps {
  x: number;
  y: number;
  selectedText: string;
  onClose: () => void;
  onSuccess?: (message?: string) => void;
}

interface ClipNote {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const mockClipNotes: ClipNote[] = [
  { id: '1', title: '工作笔记', icon: <FileText className="w-4 h-4" /> },
  { id: '2', title: '学习资料', icon: <Star className="w-4 h-4" /> },
  { id: '3', title: '个人收藏', icon: <Bookmark className="w-4 h-4" /> },
  { id: '4', title: '项目文档', icon: <Folder className="w-4 h-4" /> },
];

export const FloatingTextMenu: React.FC<FloatingTextMenuProps> = ({
  x,
  y,
  selectedText,
  onClose,
  onSuccess,
}) => {
  const [activeMenu, setActiveMenu] = useState<'clip' | 'fullscreen' | null>(null);

  const handleClipAction = (noteId?: string) => {
    const noteTitle = noteId ? (mockClipNotes.find(n => n.id === noteId)?.title ?? '默认笔记') : '默认笔记';
    console.log('剪藏到:', noteTitle, selectedText);
    setActiveMenu(null);
    onSuccess?.(`已保存到「${noteTitle}」`);
    onClose();
  };

  const handleFullscreenClip = (noteId?: string) => {
    const noteTitle = noteId ? (mockClipNotes.find(n => n.id === noteId)?.title ?? '默认笔记') : '默认笔记';
    console.log('全屏剪藏到:', noteTitle, selectedText);
    setActiveMenu(null);
    onSuccess?.(`已保存到「${noteTitle}」`);
    onClose();
  };

  const handleMenuOpen = (menu: 'clip' | 'fullscreen', open: boolean) => {
    setActiveMenu(open ? menu : null);
  };

  return (
    <div
      className="fixed z-[9999] bg-white/80 backdrop-blur-xl rounded-lg shadow-xl border border-white/30 pointer-events-auto"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateX(-50%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Menubar className="border-none bg-transparent backdrop-blur-sm">
        <MenubarMenu 
          value={activeMenu === 'clip' ? 'clip' : undefined}
          onValueChange={(value) => handleMenuOpen('clip', value === 'clip')}
        >
          <MenubarTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-sm hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            >
              <Bookmark className="w-4 h-4" />
              剪藏
            </Button>
          </MenubarTrigger>
          <MenubarContent className="min-w-[150px] bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-lg">
            <MenubarItem onClick={() => handleClipAction()}>
              快速保存
            </MenubarItem>
            {mockClipNotes.map((note) => (
              <MenubarItem 
                key={note.id}
                onClick={() => handleClipAction(note.id)}
                className="flex items-center gap-2 hover:bg-white/30 backdrop-blur-sm transition-all duration-150"
              >
                {note.icon}
                {note.title}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu 
          value={activeMenu === 'fullscreen' ? 'fullscreen' : undefined}
          onValueChange={(value) => handleMenuOpen('fullscreen', value === 'fullscreen')}
        >
          <MenubarTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-sm hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            >
              <Maximize className="w-4 h-4" />
              全屏剪藏
            </Button>
          </MenubarTrigger>
          <MenubarContent className="min-w-[150px] bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-lg">
            <MenubarItem onClick={() => handleFullscreenClip()}>
              快速保存
            </MenubarItem>
            {mockClipNotes.map((note) => (
              <MenubarItem 
                key={note.id}
                onClick={() => handleFullscreenClip(note.id)}
                className="flex items-center gap-2 hover:bg-white/30 backdrop-blur-sm transition-all duration-150"
              >
                {note.icon}
                {note.title}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};