'client';

import React from 'react';

interface FilePreviewProps {
  fileId: string | null;
  content: string;
}

export function FilePreview({ fileId, content }: FilePreviewProps) {
  if (!fileId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="mb-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/50 dark:bg-gray-800/50">
              <span className="text-2xl">📄</span>
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold">选择文件</h2>
          <p className="max-w-md text-sm">在左侧文件树中点击文件以查看其内容，或拖拽文件到桌面创建新窗口</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">文件预览: {fileId}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">文件内容预览</p>
      </div>
      <div className="h-full overflow-auto p-4">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900 dark:text-gray-100">
          {content || '文件内容为空'}
        </pre>
      </div>
    </div>
  );
}
