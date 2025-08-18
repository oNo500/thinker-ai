import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type {
  DesktopState,
  WindowState,
  WindowConfig,
  TabItem,
  DragContext,
  Position,
  DockConfig,
  DockItemData,
  DockState,
} from '../types';

interface DesktopStore extends DesktopState {
  // 窗口操作
  createWindow: (config: WindowConfig) => string;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindow: (windowId: string, updates: Partial<WindowState>) => void;
  moveWindow: (windowId: string, position: Position) => void;
  resizeWindow: (windowId: string, size: { width: number; height: number }) => void;
  toggleMaximizeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;

  // Tab操作
  addTab: (windowId: string, tab: TabItem) => void;
  removeTab: (windowId: string, tabId: string) => void;
  switchTab: (windowId: string, tabId: string) => void;
  moveTab: (fromWindow: string, toWindow: string, tabId: string, index?: number) => void;
  updateTab: (windowId: string, tabId: string, updates: Partial<TabItem>) => void;

  // 拖拽状态
  setDragContext: (context: DragContext | null) => void;

  // Dock 操作
  updateDockConfig: (config: Partial<DockConfig>) => void;
  toggleDockPosition: () => void;
  toggleDockVisibility: () => void;
  updateDockItems: () => void;
  getDockItem: (windowId: string) => DockItemData | undefined;

  // 工具方法
  getNextZIndex: () => number;
  getWindow: (windowId: string) => WindowState | undefined;
  getActiveWindow: () => WindowState | undefined;
}

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// 默认窗口配置
const defaultWindowConfig: Partial<WindowConfig> = {
  position: { x: 100, y: 100 },
  size: { width: 800, height: 600 },
  hasFileTree: false,
};

// 默认 Dock 配置
const defaultDockConfig: DockConfig = {
  position: 'bottom',
  autoHide: false,
  size: 'medium',
  showLabels: false,
};

export const useDesktopStore = create<DesktopStore>()(
  devtools(
    (set, get) => ({
      // 初始状态
      windows: {},
      activeWindowId: null,
      nextZIndex: 1000,
      dragContext: null,
      dock: {
        isVisible: true,
        config: defaultDockConfig,
        items: [],
      },

      // 窗口操作
      createWindow: (config: WindowConfig) => {
        const id = generateId();
        const { nextZIndex } = get();

        const windowConfig = { ...defaultWindowConfig, ...config };

        const newWindow: WindowState = {
          id,
          title: windowConfig.title!,
          position: windowConfig.position!,
          size: windowConfig.size!,
          isMaximized: false,
          isMinimized: false,
          zIndex: nextZIndex,
          tabs: windowConfig.initialTab ? [windowConfig.initialTab] : [],
          activeTabId: windowConfig.initialTab?.id || null,
          hasFileTree: windowConfig.hasFileTree || false,
        };

        set((state) => ({
          windows: { ...state.windows, [id]: newWindow },
          activeWindowId: id,
          nextZIndex: nextZIndex + 1,
        }));

        // 更新 Dock 项目
        get().updateDockItems();

        return id;
      },

      closeWindow: (windowId: string) => {
        set((state) => {
          const { [windowId]: removed, ...remainingWindows } = state.windows;
          const windowIds = Object.keys(remainingWindows);

          return {
            windows: remainingWindows,
            activeWindowId:
              state.activeWindowId === windowId
                ? windowIds.length > 0
                  ? windowIds[windowIds.length - 1]
                  : null
                : state.activeWindowId,
          };
        });

        // 更新 Dock 项目
        get().updateDockItems();
      },

      focusWindow: (windowId: string) => {
        const { getNextZIndex } = get();
        set((state: DesktopStore) => ({
          ...state,
          windows: {
            ...state.windows,
            [windowId]: {
              ...state.windows[windowId]!,
              zIndex: getNextZIndex(),
              isMinimized: false,
            },
          },
          activeWindowId: windowId,
          nextZIndex: state.nextZIndex + 1,
        }));

        // 更新 Dock 项目
        get().updateDockItems();
      },

      updateWindow: (windowId: string, updates: Partial<WindowState>) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state; // 如果窗口不存在，直接返回原状态

          return {
            windows: {
              ...state.windows,
              [windowId]: { ...window, ...updates },
            },
          };
        });
      },

      moveWindow: (windowId: string, position: Position) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          return {
            windows: {
              ...state.windows,
              [windowId]: { ...window, position },
            },
          };
        });
      },

      resizeWindow: (windowId: string, size: { width: number; height: number }) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          return {
            windows: {
              ...state.windows,
              [windowId]: { ...window, size },
            },
          };
        });
      },

      toggleMaximizeWindow: (windowId: string) => {
        set((state) => {
          const window = state.windows[windowId]!;
          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                isMaximized: !window.isMaximized,
              },
            },
          };
        });
      },

      minimizeWindow: (windowId: string) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                isMinimized: true,
              },
            },
          };
        });

        // 更新 Dock 项目
        get().updateDockItems();
      },

      // Tab操作
      addTab: (windowId: string, tab: TabItem) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          // 检查tab是否已存在
          const existingTab = window.tabs.find((t) => t.fileId === tab.fileId);
          if (existingTab) {
            // 如果tab已存在，直接激活它
            return {
              windows: {
                ...state.windows,
                [windowId]: {
                  ...window,
                  activeTabId: existingTab.id,
                },
              },
            };
          }

          // 取消当前活跃tab
          const updatedTabs = window.tabs.map((t) => ({ ...t, isActive: false }));

          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                tabs: [...updatedTabs, { ...tab, isActive: true }],
                activeTabId: tab.id,
              },
            },
          };
        });
      },

      removeTab: (windowId: string, tabId: string) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          const updatedTabs = window.tabs.filter((t) => t.id !== tabId);
          let newActiveTabId = window.activeTabId;

          // 如果删除的是当前活跃tab，选择下一个tab
          if (window.activeTabId === tabId) {
            if (updatedTabs.length > 0) {
              const lastTab = updatedTabs[updatedTabs.length - 1];
              newActiveTabId = lastTab ? lastTab.id : null;
            } else {
              newActiveTabId = null;
            }
          }

          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                tabs: updatedTabs.map((t) => ({
                  ...t,
                  isActive: t.id === newActiveTabId,
                })),
                activeTabId: newActiveTabId,
              },
            },
          };
        });
      },

      switchTab: (windowId: string, tabId: string) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                tabs: window.tabs.map((t) => ({
                  ...t,
                  isActive: t.id === tabId,
                })),
                activeTabId: tabId,
              },
            },
          };
        });
      },

      moveTab: (fromWindow: string, toWindow: string, tabId: string, index?: number) => {
        set((state) => {
          const sourceWindow = state.windows[fromWindow];
          const targetWindow = state.windows[toWindow];

          if (!sourceWindow || !targetWindow) return state;

          const tabToMove = sourceWindow.tabs.find((t) => t.id === tabId);
          if (!tabToMove) return state;

          // 从源窗口移除tab
          const sourceUpdatedTabs = sourceWindow.tabs.filter((t) => t.id !== tabId);
          let sourceActiveTabId = sourceWindow.activeTabId;

          if (sourceWindow.activeTabId === tabId) {
            sourceActiveTabId = sourceUpdatedTabs.length > 0 ? sourceUpdatedTabs[0]?.id || null : null;
          }

          // 添加到目标窗口
          const targetUpdatedTabs = [...targetWindow.tabs];
          const insertIndex = index !== undefined ? index : targetUpdatedTabs.length;
          targetUpdatedTabs.splice(insertIndex, 0, { ...tabToMove, isActive: true });

          return {
            windows: {
              ...state.windows,
              [fromWindow]: {
                ...sourceWindow,
                tabs: sourceUpdatedTabs.map((t) => ({
                  ...t,
                  isActive: t.id === sourceActiveTabId,
                })),
                activeTabId: sourceActiveTabId,
              },
              [toWindow]: {
                ...targetWindow,
                tabs: targetUpdatedTabs.map((t) => ({
                  ...t,
                  isActive: t.id === tabId,
                })),
                activeTabId: tabId,
              },
            },
          };
        });
      },

      updateTab: (windowId: string, tabId: string, updates: Partial<TabItem>) => {
        set((state) => {
          const window = state.windows[windowId];
          if (!window) return state;

          return {
            windows: {
              ...state.windows,
              [windowId]: {
                ...window,
                tabs: window.tabs.map((t) => (t.id === tabId ? { ...t, ...updates } : t)),
              },
            },
          };
        });
      },

      // 拖拽状态
      setDragContext: (context: DragContext | null) => {
        set({ dragContext: context });
      },

      // Dock 操作
      updateDockConfig: (config: Partial<DockConfig>) => {
        set((state) => ({
          dock: {
            ...state.dock,
            config: { ...state.dock.config, ...config },
          },
        }));
      },

      toggleDockPosition: () => {
        set((state) => ({
          dock: {
            ...state.dock,
            config: {
              ...state.dock.config,
              position: state.dock.config.position === 'bottom' ? 'left' : 'bottom',
            },
          },
        }));
      },

      toggleDockVisibility: () => {
        set((state) => ({
          dock: {
            ...state.dock,
            isVisible: !state.dock.isVisible,
          },
        }));
      },

      updateDockItems: () => {
        const { windows, activeWindowId } = get();
        const dockItems: DockItemData[] = Object.values(windows).map((window, index) => ({
          id: window.id,
          windowId: window.id,
          title: window.title,
          icon: window.hasFileTree ? '📁' : '📄',
          isActive: activeWindowId === window.id && !window.isMinimized,
          isMinimized: window.isMinimized,
          hasMultipleTabs: window.tabs.length > 1,
          tabCount: window.tabs.length,
          order: index,
        }));

        set((state) => ({
          dock: {
            ...state.dock,
            items: dockItems,
          },
        }));
      },

      getDockItem: (windowId: string) => {
        const { dock } = get();
        return dock.items.find((item) => item.windowId === windowId);
      },

      // 工具方法
      getNextZIndex: () => {
        const { nextZIndex } = get();
        set({ nextZIndex: nextZIndex + 1 });
        return nextZIndex;
      },

      getWindow: (windowId: string) => {
        return get().windows[windowId];
      },

      getActiveWindow: () => {
        const { windows, activeWindowId } = get();
        return activeWindowId ? windows[activeWindowId] : undefined;
      },
    }),
    {
      name: 'desktop-store',
    },
  ),
);
