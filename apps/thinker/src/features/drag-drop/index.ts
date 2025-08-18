// 文件管理器组件
export { FilePreview } from './components/file-manager/file-preview';
export { FileToolbar } from './components/file-manager/file-toolbar';
export { FileTreeItem } from './components/file-manager/file-tree-item';
// 新的 Magic UI 增强文件树
export { FileTree } from './components/file-manager/file-tree';

// 桌面 IDE 组件
export { Desktop } from './components/desktop-ide/desktop';
export { EnhancedFileTree } from './components/desktop-ide/enhanced-file-tree';
export { Window } from './components/desktop-ide/window';
export { WindowTitleBar } from './components/desktop-ide/window-title-bar';

// Tab 系统组件
export { Tab } from './components/desktop-ide/tab-system/tab';
export { TabBar } from './components/desktop-ide/tab-system/tab-bar';
export { TabContent } from './components/desktop-ide/tab-system/tab-content';

// Dock 组件
export { Dock } from './components/dock/dock';
export { ContextMenu } from './components/dock/context-menu';

// 状态管理
export { useDesktopStore } from './stores/desktop-store';
export {
  getInitialFileSystemState,
  canMoveItem,
  generateId,
  getFileIcon,
  getFileExtension,
} from './stores/file-system-data';

// 类型定义
export type * from './types';
