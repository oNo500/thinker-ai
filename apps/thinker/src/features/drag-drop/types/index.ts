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

// 文件系统内部拖拽数据
export type DragData = {
  type: 'file-system-item';
  itemId: string;
  itemType: FileType;
  sourceType: 'file-system';
  sourceId: string;
  itemName: string;
  itemContent: string;
};

// 桌面拖拽数据
export type DesktopDragData = {
  type: 'desktop-file';
  fileId: string;
  fileName: string;
  content: string;
  sourceType: 'file-system';
  sourceId: string;
};

// 扩展拖拽数据类型以支持所有拖拽场景
export type AllDragData = DragData | DesktopDragData | import('./desktop').TabDragData;

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

// 拖拽操作结果
export type DragOperationResult =
  | { type: 'file-system-move'; instruction: FileSystemInstruction }
  | { type: 'desktop-window'; fileId: string; fileName: string; content: string };

// 导出桌面 IDE 相关类型
export * from './desktop';
