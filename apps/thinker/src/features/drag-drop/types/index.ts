export type FileType = 'file' | 'folder';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  content?: string; // 文件内容，仅文件类型有
  children?: string[]; // 子项ID数组，仅文件夹类型有
  isOpen?: boolean; // 文件夹是否展开
  parent?: string; // 父文件夹ID
}

export interface FileSystemState {
  items: Record<string, FileSystemItem>;
  rootItems: string[]; // 根级别项目的ID数组
  selectedFile?: string; // 当前选中的文件ID
}

export type DragData = {
  type: 'file-system-item';
  itemId: string;
  itemType: FileType;
};

export type DropData = {
  type: 'folder' | 'file-area';
  folderId?: string;
  position?: 'before' | 'after' | 'inside';
};

// 拖拽指令类型
export type FileSystemInstruction =
  | { type: 'move-into-folder'; targetId: string }
  | { type: 'reorder-before'; targetId: string }
  | { type: 'reorder-after'; targetId: string };

// 导出桌面 IDE 相关类型
export * from './desktop';
