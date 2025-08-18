# Drag & Drop 文件管理器页面

这是拖拽文件管理系统的页面入口，功能实现已移动到特性模块。

## 目录结构

```
drag-drop/
├── page.tsx             # 页面入口（路由）
└── README.md            # 说明文档
```

## 架构说明

### 职责分离
- **页面层** (`app/`)：只负责路由和页面渲染
- **功能层** (`features/`)：负责具体的功能实现

### 功能模块位置
所有拖拽文件管理功能已移动到：
```
src/features/drag-drop/
├── components/           # 组件实现
├── stores/              # 状态管理
├── types/               # 类型定义
└── index.ts             # 模块导出
```

### 导入方式
```tsx
// 页面中从特性模块导入
import { 
  Desktop, 
  EnhancedFileTree, 
  useDesktopStore 
} from '@/features/drag-drop';
```

## 优势

1. **架构清晰** - 页面与功能分离
2. **可复用** - 功能模块可在其他页面使用
3. **易维护** - 功能变更不影响页面结构
4. **符合规范** - 遵循 Next.js App Router 最佳实践

## 相关文件

- 功能实现：`src/features/drag-drop/`
- 页面路由：`src/app/(example)/drag-drop/page.tsx`
