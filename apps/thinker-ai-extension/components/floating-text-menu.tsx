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
}) => {
  const [showNoteDropdown, setShowNoteDropdown] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'clip' | 'fullscreen' | null>(null);

  const handleClipAction = (noteId?: string) => {
    console.log('剪藏到:', noteId ? mockClipNotes.find(n => n.id === noteId)?.title : '默认笔记', selectedText);
    setShowNoteDropdown(false);
    onClose();
  };

  const handleFullscreenClip = (noteId?: string) => {
    console.log('全屏剪藏到:', noteId ? mockClipNotes.find(n => n.id === noteId)?.title : '默认笔记', selectedText);
    setShowNoteDropdown(false);
    onClose();
  };

  const handleMenuTrigger = (action: 'clip' | 'fullscreen') => {
    setSelectedAction(action);
    setShowNoteDropdown(true);
  };

  return (
    <div
      className="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 pointer-events-auto"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateX(-50%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Menubar className="border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-sm"
              onClick={() => handleMenuTrigger('clip')}
            >
              <Bookmark className="w-4 h-4" />
              剪藏
            </Button>
          </MenubarTrigger>
          {showNoteDropdown && selectedAction === 'clip' && (
            <MenubarContent className="min-w-[150px]">
              <MenubarItem onClick={() => handleClipAction()}>
                快速保存
              </MenubarItem>
              {mockClipNotes.map((note) => (
                <MenubarItem 
                  key={note.id}
                  onClick={() => handleClipAction(note.id)}
                  className="flex items-center gap-2"
                >
                  {note.icon}
                  {note.title}
                </MenubarItem>
              ))}
            </MenubarContent>
          )}
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-sm"
              onClick={() => handleMenuTrigger('fullscreen')}
            >
              <Maximize className="w-4 h-4" />
              全屏剪藏
            </Button>
          </MenubarTrigger>
          {showNoteDropdown && selectedAction === 'fullscreen' && (
            <MenubarContent className="min-w-[150px]">
              <MenubarItem onClick={() => handleFullscreenClip()}>
                快速保存
              </MenubarItem>
              {mockClipNotes.map((note) => (
                <MenubarItem 
                  key={note.id}
                  onClick={() => handleFullscreenClip(note.id)}
                  className="flex items-center gap-2"
                >
                  {note.icon}
                  {note.title}
                </MenubarItem>
              ))}
            </MenubarContent>
          )}
        </MenubarMenu>
      </Menubar>
    </div>
  );
};