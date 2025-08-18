'use client';

import React, { useState } from 'react';

interface FileToolbarProps {
  onCreateFile: (name: string) => void;
  onCreateFolder: (name: string) => void;
  onDeleteSelected: () => void;
  hasSelectedItem: boolean;
}

export function FileToolbar({ onCreateFile, onCreateFolder, onDeleteSelected, hasSelectedItem }: FileToolbarProps) {
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleCreateFile = () => {
    if (newItemName.trim()) {
      onCreateFile(newItemName.trim());
      setNewItemName('');
      setShowNewFileDialog(false);
    }
  };

  const handleCreateFolder = () => {
    if (newItemName.trim()) {
      onCreateFolder(newItemName.trim());
      setNewItemName('');
      setShowNewFolderDialog(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'file' | 'folder') => {
    if (e.key === 'Enter') {
      if (action === 'file') {
        handleCreateFile();
      } else {
        handleCreateFolder();
      }
    } else if (e.key === 'Escape') {
      setNewItemName('');
      setShowNewFileDialog(false);
      setShowNewFolderDialog(false);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {/* 新建文件按钮 */}
        <button
          onClick={() => setShowNewFileDialog(true)}
          className="rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          title="新建文件"
        >
          📄 新建文件
        </button>

        {/* 新建文件夹按钮 */}
        <button
          onClick={() => setShowNewFolderDialog(true)}
          className="rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          title="新建文件夹"
        >
          📁 新建文件夹
        </button>

        <div className="mx-2 h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

        {/* 删除按钮 */}
        <button
          onClick={onDeleteSelected}
          disabled={!hasSelectedItem}
          className="rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-red-400 dark:hover:bg-red-900/20 dark:disabled:text-gray-600"
          title="删除选中项"
        >
          🗑️ 删除
        </button>
      </div>

      {/* 新建文件对话框 */}
      {showNewFileDialog && (
        <div className="mt-2 rounded border border-gray-200 bg-white p-2 dark:border-gray-600 dark:bg-gray-700">
          <div className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">新建文件</div>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, 'file')}
            placeholder="输入文件名..."
            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleCreateFile}
              className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
            >
              创建
            </button>
            <button
              onClick={() => {
                setShowNewFileDialog(false);
                setNewItemName('');
              }}
              className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 新建文件夹对话框 */}
      {showNewFolderDialog && (
        <div className="mt-2 rounded border border-gray-200 bg-white p-2 dark:border-gray-600 dark:bg-gray-700">
          <div className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">新建文件夹</div>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, 'folder')}
            placeholder="输入文件夹名..."
            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleCreateFolder}
              className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
            >
              创建
            </button>
            <button
              onClick={() => {
                setShowNewFolderDialog(false);
                setNewItemName('');
              }}
              className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
