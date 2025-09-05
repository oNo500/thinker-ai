import React from 'react';
import { createRoot } from 'react-dom/client';
import { TextSelectionHandler } from '@/components/text-selection-handler';
import '@/assets/tailwind.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Text selection content script loaded');
    
    const mountPoint = document.createElement('div');
    mountPoint.id = 'thinker-ai-text-selection-handler';
    mountPoint.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2147483647;
      pointer-events: none;
      width: 100vw;
      height: 100vh;
    `;
    
    document.documentElement.appendChild(mountPoint);
    
    const root = createRoot(mountPoint);
    root.render(React.createElement(TextSelectionHandler));
  },
});
