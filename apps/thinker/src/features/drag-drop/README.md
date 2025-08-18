# Drag & Drop 特性模块

这是一个基于拖拽的文件管理系统特性模块，包含桌面 IDE 界面。

## 目录结构

```
features/drag-drop/
├── components/           # 组件目录
│   ├── file-manager/        # 文件管理核心组件
│   │   ├── file-preview.tsx     # 文件预览组件
│   │   ├── file-toolbar.tsx     # 文件工具栏组件
│   │   ├── file-tree.tsx        # 文件树组件
│   │   └── file-tree-item.tsx   # 文件树项组件
│   └── desktop-ide/         # 桌面 IDE 组件
│       ├── desktop.tsx          # 桌面主组件
│       ├── enhanced-file-tree.tsx # 增强文件树
│       ├── window.tsx           # 窗口组件
│       ├── window-title-bar.tsx # 窗口标题栏
│       └── tab-system/          # 标签页系统
│           ├── tab.tsx              # 标签页组件
│           ├── tab-bar.tsx          # 标签栏组件
│           └── tab-content.tsx      # 标签内容组件
├── stores/               # 状态管理
│   ├── desktop-store.ts      # 桌面状态存储
│   └── file-system-data.ts   # 文件系统数据
├── types/                 # 类型定义
│   ├── index.ts              # 主要类型导出
│   └── desktop.ts            # 桌面 IDE 类型
├── index.ts               # 模块导出入口
└── README.md              # 说明文档
```

## 重构说明

### 架构优化
- **特性模块化**：将功能从 `app/` 目录移动到 `features/` 目录
- **职责分离**：`app/` 只负责页面路由，`features/` 负责功能实现
- **组件分组**：按功能将组件分为文件管理和桌面 IDE 两个主要模块

### 命名规范
- **文件命名**：所有文件使用 kebab-case 命名规范 ✅
- **目录命名**：所有目录使用 kebab-case 命名规范 ✅
- **组件命名**：React 组件内部仍使用 PascalCase（符合 React 规范）✅

### 导入方式
```tsx
// 从特性模块导入
import { 
  Desktop, 
  EnhancedFileTree, 
  useDesktopStore 
} from '@/features/drag-drop';

// 类型导入
import type { FileSystemItem } from '@/features/drag-drop';
```

### 路径别名配置
- 使用 `@/*` 别名指向 `./src/*`
- 所有跨目录导入使用绝对路径
- 同目录下的组件导入使用相对路径（`./`）

### 导入路径示例
```tsx
// 绝对路径导入（推荐）
import { useDesktopStore } from '@/features/drag-drop/stores/desktop-store';
import type { FileSystemItem } from '@/features/drag-drop/types';
import { FileTreeItem } from '@/features/drag-drop/components/file-manager/file-tree-item';

// 同目录相对导入（合理）
import { FileTreeItem } from './file-tree-item';
import { Tab } from './tab';
```

### 开发规范
- 新组件放在对应的功能子目录中
- 状态管理集中在 `stores/` 目录
- 类型定义统一在 `types/` 目录
- 通过 `index.ts` 统一导出，简化导入
- 优先使用绝对路径导入，提高代码可读性
- 严格遵循 kebab-case 文件命名规范

## 使用方式

### 在页面中使用
```tsx
// apps/thinker/src/app/(example)/drag-drop/page.tsx
import { Desktop, EnhancedFileTree, useDesktopStore } from '@/features/drag-drop';

export default function FileSystemPage() {
  const { windows, createWindow } = useDesktopStore();
  // ... 组件使用
}
```

### 在其他特性模块中使用
```tsx
// 导入需要的组件和功能
import { FileTree, FilePreview } from '@/features/drag-drop';
import { useDesktopStore } from '@/features/drag-drop';
```

## 优势

1. **架构清晰** - 功能模块与页面路由分离
2. **可复用性** - 其他页面可以轻松导入使用
3. **维护性** - 相关功能集中在一个模块中
4. **扩展性** - 可以轻松添加新的文件管理功能
5. **符合规范** - 遵循项目的特性模块架构规范
6. **导入清晰** - 使用绝对路径，避免复杂的相对路径
7. **命名一致** - 严格遵循 kebab-case 文件命名规范
