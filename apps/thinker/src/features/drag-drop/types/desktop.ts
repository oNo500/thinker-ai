export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TabItem {
  id: string;
  fileId: string;
  fileName: string;
  content: string;
  isActive: boolean;
  isDirty?: boolean;
}

export interface WindowState {
  id: string;
  title: string;
  position: Position;
  size: Size;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  tabs: TabItem[];
  activeTabId: string | null;
  hasFileTree: boolean; // 主窗口有文件树，独立窗口没有
}

export interface WindowConfig {
  title: string;
  position?: Position;
  size?: Size;
  hasFileTree?: boolean;
  initialTab?: TabItem;
}

export interface DragContext {
  sourceType: 'file-tree' | 'tab';
  sourceData: {
    fileId?: string;
    fileName?: string;
    content?: string;
    tabId?: string;
    windowId?: string;
  };
  targetType?: 'desktop' | 'window-tab-area' | 'tab-position';
  targetData?: {
    windowId?: string;
    insertIndex?: number;
  };
}

export interface DesktopState {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  nextZIndex: number;
  dragContext: DragContext | null;
  dock: DockState;
}

// 拖拽数据类型
export interface TabDragData {
  type: 'desktop-tab';
  tabId: string;
  windowId: string;
  tabData: TabItem;
}

export interface FileDragData {
  type: 'desktop-file';
  fileId: string;
  fileName: string;
  content: string;
}

// Dock 相关类型定义
export type DockPosition = 'bottom' | 'left';
export type DockSize = 'small' | 'medium' | 'large';

export interface DockConfig {
  position: DockPosition;
  autoHide: boolean;
  size: DockSize;
  showLabels: boolean;
}

export interface DockItemData {
  id: string;
  windowId: string;
  title: string;
  icon: string;
  isActive: boolean;
  isMinimized: boolean;
  hasMultipleTabs: boolean;
  tabCount: number;
  order: number;
}

export interface DockState {
  isVisible: boolean;
  config: DockConfig;
  items: DockItemData[];
}
