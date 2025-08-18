import type { FileSystemItem, FileSystemState } from './types';

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// 初始化示例文件系统数据
export function getInitialFileSystemState(): FileSystemState {
  const srcFolder: FileSystemItem = {
    id: 'src',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [],
  };

  const componentsFolder: FileSystemItem = {
    id: 'components',
    name: 'components',
    type: 'folder',
    isOpen: false,
    parent: 'src',
    children: [],
  };

  const utilsFolder: FileSystemItem = {
    id: 'utils',
    name: 'utils',
    type: 'folder',
    isOpen: false,
    parent: 'src',
    children: [],
  };

  const indexFile: FileSystemItem = {
    id: 'index-ts',
    name: 'index.ts',
    type: 'file',
    parent: 'src',
    content: `export * from './components';
export * from './utils';

console.log('Welcome to the file system!');`,
  };

  const buttonFile: FileSystemItem = {
    id: 'button-tsx',
    name: 'Button.tsx',
    type: 'file',
    parent: 'components',
    content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}`,
  };

  const helperFile: FileSystemItem = {
    id: 'helper-ts',
    name: 'helper.ts',
    type: 'file',
    parent: 'utils',
    content: `export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}`,
  };

  const readmeFile: FileSystemItem = {
    id: 'readme-md',
    name: 'README.md',
    type: 'file',
    content: `# File System Demo

This is a demo file system implementation using React and Pragmatic Drag and Drop.

## Features

- Drag and drop files and folders
- File preview
- Create, edit, and delete files
- Folder navigation

## Usage

1. Click on files to preview their content
2. Drag items to reorganize the file structure
3. Right-click for context menu options`,
  };

  // 设置父子关系
  srcFolder.children = ['components', 'utils', 'index-ts'];
  componentsFolder.children = ['button-tsx'];
  utilsFolder.children = ['helper-ts'];

  return {
    items: {
      src: srcFolder,
      components: componentsFolder,
      utils: utilsFolder,
      'index-ts': indexFile,
      'button-tsx': buttonFile,
      'helper-ts': helperFile,
      'readme-md': readmeFile,
    },
    rootItems: ['src', 'readme-md'],
    selectedFile: 'readme-md',
  };
}

// 工具函数：根据路径获取所有父文件夹
export function getPathToItem(items: Record<string, FileSystemItem>, itemId: string): string[] {
  const path: string[] = [];
  let currentId: string | undefined = itemId;

  while (currentId) {
    const item: FileSystemItem | undefined = items[currentId];
    if (!item) break;
    path.unshift(currentId);
    currentId = item.parent;
  }

  return path;
}

// 工具函数：检查是否可以移动到目标位置
export function canMoveItem(items: Record<string, FileSystemItem>, sourceId: string, targetId: string): boolean {
  // 不能移动到自己
  if (sourceId === targetId) return false;

  // 不能移动到自己的子项中
  const sourcePath = getPathToItem(items, sourceId);
  const targetPath = getPathToItem(items, targetId);

  return !targetPath.includes(sourceId);
}

// 工具函数：获取文件扩展名
export function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.substring(lastDot + 1) : '';
}

// 工具函数：获取文件图标类名
export function getFileIcon(item: FileSystemItem): string {
  if (item.type === 'folder') {
    return item.isOpen ? '📂' : '📁';
  }

  const ext = getFileExtension(item.name);
  switch (ext) {
    case 'ts':
    case 'tsx':
      return '🔷';
    case 'js':
    case 'jsx':
      return '🟨';
    case 'md':
      return '📝';
    case 'json':
      return '⚙️';
    case 'css':
    case 'scss':
      return '🎨';
    default:
      return '📄';
  }
}
