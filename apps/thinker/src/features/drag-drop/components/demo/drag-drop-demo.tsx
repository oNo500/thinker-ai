'use client';

import React, { useState } from 'react';

import { Desktop } from '../desktop-ide/desktop';
import { FileTree } from '../file-manager/file-tree';
import { FilePreview } from '../file-manager/file-preview';

export function DragDropDemo() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileSelect = (fileId: string, content: string) => {
    setSelectedFile(fileId);
    setFileContent(content);
  };

  return (
    <Desktop>
      <div className="flex h-screen w-screen">
        {/* 左侧文件树 */}
        <div className="w-80 flex-shrink-0">
          <FileTree onFileSelect={handleFileSelect} />
        </div>

        {/* 右侧文件预览 */}
        <div className="flex-1">
          <FilePreview fileId={selectedFile} content={fileContent} />
        </div>
      </div>
    </Desktop>
  );
}
