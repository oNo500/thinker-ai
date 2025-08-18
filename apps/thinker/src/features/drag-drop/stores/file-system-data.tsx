import { Folder, FolderOpen, FileText, FileIcon, Settings, Paintbrush, Code2 } from 'lucide-react';

import type { ReactNode } from 'react';
import type { FileSystemItem, FileSystemState, FileSystemInstruction } from '../types';

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

// 工具函数：获取文件图标
export function getFileIcon(item: FileSystemItem): ReactNode {
  if (item.type === 'folder') {
    return item.isOpen ? <FolderOpen className="size-4" /> : <Folder className="size-4" />;
  }

  const ext = getFileExtension(item.name);
  switch (ext) {
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return <Code2 className="size-4" />;
    case 'md':
      return <FileText className="size-4" />;
    case 'json':
      return <Settings className="size-4" />;
    case 'css':
    case 'scss':
      return <Paintbrush className="size-4" />;
    default:
      return <FileIcon className="size-4" />;
  }
}

// 文件系统操作函数
export function moveItem(
  items: Record<string, FileSystemItem>,
  sourceId: string,
  instruction: FileSystemInstruction,
): Record<string, FileSystemItem> {
  const newItems = { ...items };
  const sourceItem = newItems[sourceId];

  if (!sourceItem) return items;

  // 从原位置移除
  if (sourceItem.parent) {
    const parent = newItems[sourceItem.parent];
    if (parent && parent.children) {
      parent.children = parent.children.filter((id) => id !== sourceId);
    }
  } else {
    // 从根级别移除
    // 这里需要调用者处理 rootItems 数组
  }

  // 根据指令类型执行移动
  switch (instruction.type) {
    case 'move-into-folder': {
      const targetFolder = newItems[instruction.targetId];
      if (targetFolder && targetFolder.type === 'folder') {
        // 移动到文件夹内
        sourceItem.parent = instruction.targetId;
        if (!targetFolder.children) {
          targetFolder.children = [];
        }
        targetFolder.children.push(sourceId);
      }
      break;
    }

    case 'reorder-before': {
      const targetItem = newItems[instruction.targetId];
      if (targetItem) {
        // 移动到目标项之前
        sourceItem.parent = targetItem.parent;

        if (targetItem.parent) {
          // 移动到父文件夹内
          const parent = newItems[targetItem.parent];
          if (parent && parent.children) {
            const targetIndex = parent.children.indexOf(instruction.targetId);
            parent.children.splice(targetIndex, 0, sourceId);
          }
        } else {
          // 移动到根级别
          // 这里需要调用者处理 rootItems 数组
        }
      }
      break;
    }

    case 'reorder-after': {
      const targetItem = newItems[instruction.targetId];
      if (targetItem) {
        // 移动到目标项之后
        sourceItem.parent = targetItem.parent;

        if (targetItem.parent) {
          // 移动到父文件夹内
          const parent = newItems[targetItem.parent];
          if (parent && parent.children) {
            const targetIndex = parent.children.indexOf(instruction.targetId);
            parent.children.splice(targetIndex + 1, 0, sourceId);
          }
        } else {
          // 移动到根级别
          // 这里需要调用者处理 rootItems 数组
        }
      }
      break;
    }
  }

  return newItems;
}

// 获取项目的所有子项（递归）
export function getAllChildren(items: Record<string, FileSystemItem>, itemId: string): string[] {
  const item = items[itemId];
  if (!item || !item.children) return [];

  const allChildren: string[] = [];
  const stack = [...item.children];

  while (stack.length > 0) {
    const childId = stack.pop()!;
    allChildren.push(childId);

    const child = items[childId];
    if (child && child.children && child.children.length > 0) {
      stack.push(...child.children);
    }
  }

  return allChildren;
}

// 检查项目是否为文件夹且可以接收子项
export function canReceiveChildren(item: FileSystemItem): boolean {
  return item.type === 'folder' && !item.isOpen; // 关闭的文件夹可以接收子项
}

// 获取项目的显示名称（包含路径信息）
export function getItemDisplayName(items: Record<string, FileSystemItem>, itemId: string): string {
  const path = getPathToItem(items, itemId);
  return path.map((id) => items[id]?.name || id).join(' / ');
}
