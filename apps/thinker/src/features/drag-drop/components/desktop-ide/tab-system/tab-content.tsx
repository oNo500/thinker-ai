'use client';

import React from 'react';
import { FileCode, FileText, File, Settings } from 'lucide-react';

import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';

interface TabContentProps {
  windowId: string;
}

// 语法高亮的简单实现
function SyntaxHighlighter({ code, language }: { code: string; language: string }) {
  const getLanguageClass = (lang: string) => {
    switch (lang) {
      case 'typescript':
      case 'tsx':
        return 'language-typescript';
      case 'javascript':
      case 'jsx':
        return 'language-javascript';
      case 'markdown':
        return 'language-markdown';
      case 'json':
        return 'language-json';
      case 'css':
        return 'language-css';
      default:
        return 'language-text';
    }
  };

  // 简单的代码高亮
  const highlightCode = (code: string, lang: string) => {
    if (lang === 'typescript' || lang === 'tsx' || lang === 'javascript' || lang === 'jsx') {
      return code
        .replace(
          /\b(import|export|from|const|let|var|function|class|interface|type|enum)\b/g,
          '<span class="text-blue-600 dark:text-blue-400">$1</span>',
        )
        .replace(
          /\b(React|useState|useEffect|useCallback|useMemo)\b/g,
          '<span class="text-purple-600 dark:text-purple-400">$1</span>',
        )
        .replace(/"([^"]*)"/g, '<span class="text-green-600 dark:text-green-400">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="text-green-600 dark:text-green-400">\'$1\'</span>')
        .replace(/\/\/.*$/gm, '<span class="text-gray-500 dark:text-gray-400">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500 dark:text-gray-400">$&</span>');
    }

    if (lang === 'markdown') {
      return code
        .replace(/^#{1,6}\s+(.*)$/gm, '<span class="text-blue-600 dark:text-blue-400 font-bold">$&</span>')
        .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
        .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
        .replace(/`([^`]*)`/g, '<span class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</span>');
    }

    return code;
  };

  return (
    <pre className="overflow-auto text-sm">
      <code
        className={getLanguageClass(language)}
        dangerouslySetInnerHTML={{
          __html: highlightCode(code, language),
        }}
      />
    </pre>
  );
}

// 文件图标组件
function FileIcon({ extension, size = 'md' }: { extension: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const getIconColor = (ext: string) => {
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'text-blue-500';
      case 'js':
      case 'jsx':
        return 'text-yellow-500';
      case 'md':
        return 'text-gray-600 dark:text-gray-400';
      case 'json':
        return 'text-orange-500';
      case 'css':
      case 'scss':
        return 'text-pink-500';
      default:
        return 'text-gray-500';
    }
  };

  const IconComponent = (() => {
    switch (extension) {
      case 'ts':
      case 'tsx':
      case 'js':
      case 'jsx':
        return FileCode;
      case 'md':
        return FileText;
      case 'json':
        return Settings;
      default:
        return File;
    }
  })();

  return <IconComponent className={`${sizeClasses[size]} ${getIconColor(extension)}`} />;
}

// 行号组件
function LineNumbers({ lineCount }: { lineCount: number }) {
  return (
    <div className="flex select-none flex-col border-r border-gray-200 pr-4 text-xs leading-5 text-gray-400 dark:border-gray-700 dark:text-gray-600">
      {Array.from({ length: lineCount }, (_, i) => (
        <span key={i + 1} className="text-right">
          {i + 1}
        </span>
      ))}
    </div>
  );
}

function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.substring(lastDot + 1) : '';
}

function getLanguage(ext: string) {
  switch (ext) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'md':
      return 'markdown';
    case 'json':
      return 'json';
    case 'css':
    case 'scss':
      return 'css';
    default:
      return 'text';
  }
}

export function TabContent({ windowId }: TabContentProps) {
  const { windows } = useDesktopStore();
  const window = windows[windowId];

  if (!window) {
    console.log('Window not found:', windowId);
    return null;
  }

  console.log('Window tabs:', window.tabs);
  console.log('Active tab ID:', window.activeTabId);

  const activeTab = window.tabs.find((tab) => tab.id === window.activeTabId);

  if (!activeTab) {
    console.log('No active tab found');
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="mb-4">
            <File className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
          </div>
          <p className="mb-2 text-lg font-medium">选择一个文件以预览</p>
          <p className="text-sm">在左侧文件树中点击文件或拖拽文件到此处</p>
        </div>
      </div>
    );
  }

  console.log('Active tab found:', activeTab);

  const extension = getFileExtension(activeTab.fileName);
  const lineCount = activeTab.content.split('\n').length;
  const language = getLanguage(extension);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-gray-900">
      {/* 文件头部 */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <FileIcon extension={extension} />
        <h2 className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">{activeTab.fileName}</h2>
        <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {lineCount} 行 | {extension.toUpperCase()}
        </div>
      </div>

      {/* 文件内容 */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* 行号 */}
          <div className="p-4 pb-0">
            <LineNumbers lineCount={lineCount} />
          </div>

          {/* 代码内容 */}
          <div className="flex-1 p-4 font-mono text-sm">
            <SyntaxHighlighter code={activeTab.content} language={language} />
          </div>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>UTF-8</span>
          <span>{language.toUpperCase()}</span>
          <span>{activeTab.content.length} 字符</span>
        </div>
      </div>
    </div>
  );
}
