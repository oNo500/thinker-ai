# 文件拖拽系统

这是一个基于 React 和 Pragmatic Drag and Drop 的完整文件拖拽系统，支持文件系统内部排序/嵌套和桌面拖拽功能。

## 功能特性

### 🗂️ 文件系统内部拖拽
- **排序功能**: 拖拽文件/文件夹可以重新排序
- **嵌套功能**: 拖拽文件到文件夹内实现嵌套
- **智能提示**: 拖拽时显示视觉指示器
- **防循环**: 防止将文件夹拖拽到自己的子文件夹中

### 🖥️ 桌面拖拽
- **新窗口创建**: 拖拽文件到桌面创建新的编辑器窗口
- **拖拽提示**: 拖拽过程中显示友好的提示信息
- **窗口管理**: 自动管理新创建的窗口

### 🎯 拖拽操作类型
1. **reorder-before**: 移动到目标项之前
2. **reorder-after**: 移动到目标项之后  
3. **combine**: 移动到文件夹内（仅文件夹支持）

## 架构设计

### 核心组件
- `FileTreeItem`: 文件树项组件，处理拖拽逻辑
- `DesktopDropZone`: 桌面拖拽区域，接收文件拖拽
- `FileTree`: 文件树容器，管理整体结构
- `Desktop`: 桌面容器，集成拖拽区域

### 状态管理
- `useFileSystem`: 文件系统状态管理 Hook
- `useDesktopStore`: 桌面状态管理 Store
- `file-system-data`: 文件系统数据操作工具

### 类型系统
```typescript
// 拖拽数据类型
type DragData = {
  type: 'file-system-item';
  itemId: string;
  itemType: FileType;
  // ... 其他属性
};

type DesktopDragData = {
  type: 'desktop-file';
  fileId: string;
  fileName: string;
  content: string;
  // ... 其他属性
};

// 拖拽指令类型
type FileSystemInstruction =
  | { type: 'move-into-folder'; targetId: string }
  | { type: 'reorder-before'; targetId: string }
  | { type: 'reorder-after'; targetId: string };
```

## 使用方法

### 基本使用
```tsx
import { DragDropDemo } from '@/features/drag-drop/components/demo/drag-drop-demo';

function App() {
  return <DragDropDemo />;
}
```

### 自定义文件树
```tsx
import { FileTree } from '@/features/drag-drop/components/file-manager/file-tree';

function CustomFileManager() {
  const handleFileSelect = (fileId: string, content: string) => {
    console.log('Selected file:', fileId, content);
  };

  return <FileTree onFileSelect={handleFileSelect} />;
}
```

### 集成桌面拖拽
```tsx
import { DesktopDropZone } from '@/features/drag-drop/components/desktop/desktop-drop-zone';

function CustomDesktop() {
  return (
    <DesktopDropZone>
      <div>你的桌面内容</div>
    </DesktopDropZone>
  );
}
```

## 拖拽流程

### 1. 文件系统内部拖拽
```
用户拖拽文件 → FileTreeItem 检测拖拽 → 显示指示器 → 用户放置 → 执行移动操作
```

### 2. 桌面拖拽
```
用户拖拽文件 → DesktopDropZone 检测拖拽 → 显示提示 → 用户放置 → 创建新窗口
```

### 3. 拖拽验证
- 检查源项目和目标项目的类型
- 验证移动操作的合法性
- 防止循环引用

## 配置选项

### 文件系统配置
```typescript
// 在 file-system-data.ts 中配置初始数据
export function getInitialFileSystemState(): FileSystemState {
  // 返回初始文件系统结构
}
```

### 桌面配置
```typescript
// 在 desktop-store.ts 中配置窗口默认设置
const defaultWindowConfig: Partial<WindowConfig> = {
  position: { x: 100, y: 100 },
  size: { width: 800, height: 600 },
  hasFileTree: false,
};
```

## 扩展功能

### 添加新的拖拽类型
1. 在 `types/index.ts` 中定义新的拖拽数据类型
2. 在相应的组件中实现拖拽逻辑
3. 更新状态管理以处理新类型

### 自定义拖拽指示器
```tsx
// 在 FileTreeItem 中自定义指示器样式
{instruction && (
  <CustomDropIndicator 
    instruction={instruction} 
    className="custom-indicator" 
  />
)}
```

### 添加拖拽动画
```tsx
// 使用 CSS 动画或 Framer Motion
const [isDragging, setIsDragging] = useState(false);

<div className={`item ${isDragging ? 'dragging' : ''}`}>
  {/* 内容 */}
</div>
```

## 性能优化

### 拖拽优化
- 使用 `useCallback` 优化事件处理函数
- 使用 `useMemo` 缓存计算结果
- 避免在拖拽过程中进行不必要的重渲染

### 状态更新优化
- 批量更新状态，减少重渲染次数
- 使用不可变数据结构
- 合理使用 Zustand 的更新策略

## 故障排除

### 常见问题

1. **拖拽不工作**
   - 检查是否正确导入了 Pragmatic Drag and Drop
   - 验证组件是否正确注册了拖拽事件

2. **拖拽指示器不显示**
   - 检查 CSS 样式是否正确
   - 验证拖拽指令是否正确生成

3. **文件移动失败**
   - 检查移动验证逻辑
   - 验证目标位置是否合法

### 调试技巧
```typescript
// 启用拖拽调试
console.log('Drag start:', source.data);
console.log('Drop target:', target.data);
console.log('Instruction:', instruction);
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
