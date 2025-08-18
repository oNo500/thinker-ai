# Pragmatic Drag and Drop API Documentation

本文档记录了 Atlassian Pragmatic Drag and Drop 库的核心 API 及其使用方法，基于实际的国际象棋教程实现。

## 核心概念

Pragmatic Drag and Drop 由三个核心概念组成：

1. **Draggables（可拖拽元素）** - 可以被拖拽的元素
2. **Drop Targets（拖放目标）** - 可以接收拖拽元素的区域  
3. **Monitors（监听器）** - 观察和处理拖拽操作的全局监听器

## 安装和导入

```bash
npm install @atlaskit/pragmatic-drag-and-drop
```

```typescript
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
```

## API 参考

### 1. draggable()

创建可拖拽元素的核心函数。

#### 函数签名

```typescript
function draggable(args: {
  element: Element;
  getInitialData?: () => Record<string, unknown>;
  onDragStart?: (args: DragStartArgs) => void;
  onDrop?: (args: DropArgs) => void;
  canDrag?: (args: CanDragArgs) => boolean;
}): () => void;
```

#### 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `element` | `Element` | ✅ | 要设置为可拖拽的 DOM 元素 |
| `getInitialData` | `() => Record<string, unknown>` | ❌ | 返回拖拽时要传递的数据 |
| `onDragStart` | `(args: DragStartArgs) => void` | ❌ | 拖拽开始时的回调函数 |
| `onDrop` | `(args: DropArgs) => void` | ❌ | 拖拽结束时的回调函数 |
| `canDrag` | `(args: CanDragArgs) => boolean` | ❌ | 决定元素是否可以被拖拽 |

#### 使用示例

```typescript
function Piece({ location, pieceType }: PieceProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      // 设置拖拽时传递的数据
      getInitialData: () => ({ location, pieceType }),
      // 拖拽开始时设置状态
      onDragStart: () => setDragging(true),
      // 拖拽结束时重置状态
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  return <div ref={ref}>...</div>;
}
```

#### 返回值

返回一个清理函数，调用时会移除拖拽功能。通常在 `useEffect` 的清理函数中使用。

### 2. dropTargetForElements()

创建拖放目标区域的函数。

#### 函数签名

```typescript
function dropTargetForElements(args: {
  element: Element;
  getData?: () => Record<string, unknown>;
  canDrop?: (args: CanDropArgs) => boolean;
  onDragEnter?: (args: DragEnterArgs) => void;
  onDragLeave?: (args: DragLeaveArgs) => void;
  onDrop?: (args: DropArgs) => void;
}): () => void;
```

#### 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `element` | `Element` | ✅ | 要设置为拖放目标的 DOM 元素 |
| `getData` | `() => Record<string, unknown>` | ❌ | 返回拖放目标的数据 |
| `canDrop` | `(args: CanDropArgs) => boolean` | ❌ | 决定是否可以在此元素上放置 |
| `onDragEnter` | `(args: DragEnterArgs) => void` | ❌ | 拖拽元素进入时的回调 |
| `onDragLeave` | `(args: DragLeaveArgs) => void` | ❌ | 拖拽元素离开时的回调 |
| `onDrop` | `(args: DropArgs) => void` | ❌ | 元素放置时的回调 |

#### 使用示例

```typescript
function Square({ pieces, location, children }: SquareProps) {
  const ref = useRef(null);
  const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      // 提供拖放目标的数据
      getData: () => ({ location }),
      // 控制是否可以放置
      canDrop: ({ source }) => {
        if (!isCoord(source.data.location)) {
          return false;
        }
        // 不能放置在原位置
        return !isEqualCoord(source.data.location, location);
      },
      // 拖拽进入时更新状态
      onDragEnter: ({ source }) => {
        if (!isCoord(source.data.location) || !isPieceType(source.data.pieceType)) {
          return;
        }

        if (canMove(source.data.location, location, source.data.pieceType, pieces)) {
          setState('validMove');
        } else {
          setState('invalidMove');
        }
      },
      // 拖拽离开时重置状态
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [location, pieces]);

  return <div ref={ref}>...</div>;
}
```

### 3. monitorForElements()

全局监听拖拽操作的函数。

#### 函数签名

```typescript
function monitorForElements(args: {
  onDrop?: (args: DropArgs) => void;
  onDragStart?: (args: DragStartArgs) => void;
  canMonitor?: (args: CanMonitorArgs) => boolean;
}): () => void;
```

#### 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `onDrop` | `(args: DropArgs) => void` | ❌ | 全局拖放完成时的回调 |
| `onDragStart` | `(args: DragStartArgs) => void` | ❌ | 全局拖拽开始时的回调 |
| `canMonitor` | `(args: CanMonitorArgs) => boolean` | ❌ | 决定是否监听此拖拽操作 |

#### 使用示例

```typescript
function Chessboard() {
  const [pieces, setPieces] = useState<PieceRecord[]>([
    { type: 'king', location: [3, 2] },
    { type: 'pawn', location: [1, 6] },
  ]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        // 获取第一个拖放目标
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }

        const destinationLocation = destination.data.location;
        const sourceLocation = source.data.location;
        const pieceType = source.data.pieceType;

        // 类型保护
        if (!isCoord(destinationLocation) || !isCoord(sourceLocation) || !isPieceType(pieceType)) {
          return;
        }

        const piece = pieces.find((p) => isEqualCoord(p.location, sourceLocation));
        const restOfPieces = pieces.filter((p) => p !== piece);

        // 验证移动是否有效并更新状态
        if (canMove(sourceLocation, destinationLocation, pieceType, pieces) && piece !== undefined) {
          setPieces([{ type: piece.type, location: destinationLocation }, ...restOfPieces]);
        }
      },
    });
  }, [pieces]);

  return <div>...</div>;
}
```

## 类型定义

### 核心类型

```typescript
// 事件参数类型
interface DragStartArgs {
  source: {
    element: Element;
    data: Record<string, unknown>;
  };
}

interface DropArgs {
  source: {
    element: Element;
    data: Record<string, unknown>;
  };
  location: {
    current: {
      dropTargets: Array<{
        element: Element;
        data: Record<string, unknown>;
      }>;
    };
  };
}

interface DragEnterArgs {
  source: {
    element: Element;
    data: Record<string, unknown>;
  };
}

interface CanDropArgs {
  source: {
    element: Element;
    data: Record<string, unknown>;
  };
}
```

### 应用特定类型

```typescript
// 坐标类型
export type Coord = [number, number];

// 棋子记录类型
export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

// 棋子类型
export type PieceType = 'king' | 'pawn';

// 悬停状态类型
type HoveredState = 'idle' | 'validMove' | 'invalidMove';
```

## 类型保护函数

为了确保类型安全，需要实现类型保护函数：

```typescript
// 坐标类型保护
export function isCoord(token: unknown): token is Coord {
  return Array.isArray(token) && token.length === 2 && token.every((val) => typeof val === 'number');
}

// 棋子类型保护
const pieceTypes: PieceType[] = ['king', 'pawn'];
export function isPieceType(value: unknown): value is PieceType {
  return typeof value === 'string' && pieceTypes.includes(value as PieceType);
}
```

## 最佳实践

### 1. 数据传递

使用 `getInitialData` 和 `getData` 来传递拖拽相关的数据：

```typescript
// 在 draggable 中设置数据
getInitialData: () => ({ location, pieceType })

// 在 dropTarget 中设置数据
getData: () => ({ location })
```

### 2. 类型安全

始终使用类型保护函数来验证传递的数据：

```typescript
if (!isCoord(source.data.location) || !isPieceType(source.data.pieceType)) {
  return;
}
```

### 3. 状态管理

使用本地状态来管理拖拽相关的 UI 状态：

```typescript
const [dragging, setDragging] = useState<boolean>(false);
const [hoveredState, setHoveredState] = useState<HoveredState>('idle');
```

### 4. 清理函数

确保在组件卸载时正确清理：

```typescript
useEffect(() => {
  const el = ref.current;
  if (!el) return;

  // 返回清理函数
  return draggable({
    element: el,
    // ... other options
  });
}, [dependencies]);
```

### 5. 依赖数组

确保 useEffect 的依赖数组包含所有必要的依赖：

```typescript
useEffect(() => {
  // ... setup code
}, [location, pieceType, pieces]); // 包含所有使用的变量
```

## 常见模式

### 拖拽反馈

```typescript
// 拖拽时改变透明度
className={cn(
  'base-styles',
  dragging && 'opacity-30'
)}
```

### 悬停反馈

```typescript
// 根据状态改变背景色
function getColor(state: HoveredState, isDark: boolean): string {
  if (state === 'validMove') {
    return '#90EE90'; // lightgreen
  } else if (state === 'invalidMove') {
    return '#FFB6C1'; // pink
  }
  return isDark ? '#D3D3D3' : '#FFFFFF';
}
```

### 防止默认拖拽

```typescript
// 禁用浏览器默认拖拽行为
<img draggable="false" />
```

## 注意事项

1. **性能**：避免在拖拽回调中执行昂贵的操作
2. **内存泄漏**：确保正确清理事件监听器
3. **类型安全**：始终验证从其他组件传递的数据
4. **用户体验**：提供清晰的视觉反馈
5. **浏览器兼容性**：测试不同浏览器的兼容性

## 调试技巧

1. 使用 `console.log` 在回调函数中打印调试信息
2. 检查 `source.data` 和 `destination.data` 的内容
3. 验证类型保护函数是否正常工作
4. 使用浏览器开发者工具监控 DOM 变化

## 可选包 (Optional Packages)

除了核心功能外，Pragmatic Drag and Drop 还提供了多个可选包来增强拖拽体验：

### 1. @atlaskit/pragmatic-drag-and-drop-hitbox

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-hitbox
```

**用途**: 为拖放目标添加交互区域信息，确定拖拽操作的具体类型。

#### List Item Hitbox
用于列表项的拖拽操作，支持三种操作类型：
- `"reorder-before"` - 重新排序到前面
- `"reorder-after"` - 重新排序到后面  
- `"combine"` - 合并操作

```typescript
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';

dropTargetForElements({
  element: myElement,
  getData: ({ input, element }) => {
    const data = { itemId: 'A' };
    return attachInstruction(data, {
      input,
      element,
      operations: {
        'reorder-before': 'available',
        'reorder-after': 'available',
        'combine': 'available',
      },
    });
  },
  onDrop: (args) => {
    const instruction: Instruction | null = extractInstruction(args.self.data);
    // 处理拖拽指令
  },
});
```

#### Closest Edge
检测拖拽元素最接近的边缘 (`top`, `right`, `bottom`, `left`)：

```typescript
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

dropTargetForElements({
  element: myElement,
  getData: ({ input, element }) => {
    const data = { itemId: 'A' };
    return attachClosestEdge(data, {
      input,
      element,
      allowedEdges: ['top', 'bottom'],
    });
  },
  onDrop: (args) => {
    const closestEdge: Edge | null = extractClosestEdge(args.self.data);
  },
});
```

### 2. @atlaskit/pragmatic-drag-and-drop-react-drop-indicator

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-react-drop-indicator
```

**用途**: React 组件库，提供视觉拖放指示器（如拖放线条）。

#### 核心组件

**List Item Drop Indicator**
```typescript
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';

function Item({ instruction }: { instruction: Instruction | null }) {
  return (
    <div style={{ position: 'relative' }}>
      <span>Item content</span>
      {instruction && <DropIndicator instruction={instruction} />}
    </div>
  );
}
```

**Box Drop Indicator**
```typescript
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

function Item({ closestEdge }: { closestEdge: Edge | null }) {
  return (
    <div style={{ position: 'relative' }}>
      <span>Item content</span>
      {closestEdge && <DropIndicator edge={closestEdge} />}
    </div>
  );
}
```

**配置选项**：
- `lineType`: `"terminal"` | `"terminal-no-bleed"` | `"no-terminal"`
- `appearance`: `"default"` | `"warning"`
- `gap`: 元素间距
- `indent`: 缩进量

### 3. @atlaskit/pragmatic-drag-and-drop-flourish

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-flourish
```

**用途**: 提供微妙的拖拽效果增强用户体验（如拖放时的闪烁效果）。

```typescript
import { triggerFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/flash';

// 在拖放完成时触发闪烁效果
monitorForElements({
  onDrop({ source, location }) {
    const destination = location.current.dropTargets[0];
    if (destination) {
      triggerFlash(destination.element);
    }
  },
});
```

### 4. @atlaskit/pragmatic-drag-and-drop-auto-scroll

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-auto-scroll
```

**用途**: 在拖拽时提供更流畅的自动滚动功能。

```typescript
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll';

useEffect(() => {
  return autoScrollForElements({
    element: scrollableContainer,
  });
}, []);
```

### 5. @atlaskit/pragmatic-drag-and-drop-react-accessibility

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-react-accessibility
```

**用途**: 提供无障碍访问组件，确保拖拽功能对屏幕阅读器用户可用。

### 6. @atlaskit/pragmatic-drag-and-drop-live-region

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-live-region
```

**用途**: 为屏幕阅读器用户提供实时消息通知。

```typescript
import { liveRegion } from '@atlaskit/pragmatic-drag-and-drop-live-region';

// 在拖拽操作时通知屏幕阅读器
monitorForElements({
  onDrop() {
    liveRegion.announce('Item moved successfully');
  },
});
```

### 7. @atlaskit/pragmatic-drag-and-drop-unit-testing

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-unit-testing
```

**用途**: 单元测试辅助工具。

```typescript
import { userEvent } from '@atlaskit/pragmatic-drag-and-drop-unit-testing';

// 在测试中模拟拖拽操作
test('drag and drop functionality', async () => {
  await userEvent.dragAndDrop(sourceElement, targetElement);
});
```

### 8. @atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration

#### 安装
```bash
npm install @atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration
```

**用途**: 帮助从 `react-beautiful-dnd` 快速迁移到 Pragmatic drag and drop。

## 使用建议

### 核心组合
对于大多数应用，推荐使用以下组合：

```bash
# 核心包（必需）
npm install @atlaskit/pragmatic-drag-and-drop

# 交互区域检测
npm install @atlaskit/pragmatic-drag-and-drop-hitbox

# 视觉指示器  
npm install @atlaskit/pragmatic-drag-and-drop-react-drop-indicator

# 增强体验
npm install @atlaskit/pragmatic-drag-and-drop-flourish
npm install @atlaskit/pragmatic-drag-and-drop-auto-scroll

# 无障碍访问
npm install @atlaskit/pragmatic-drag-and-drop-live-region
```

### 完整示例：带有视觉指示器的列表

```typescript
'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/list-item';
import { triggerFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/flash';

type Item = {
  id: string;
  content: string;
};

function ListItem({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({ type: 'list-item', itemId: item.id, index }),
      }),
      dropTargetForElements({
        element,
        getData: ({ input, element }) => {
          const data = { type: 'list-item', itemId: item.id, index };
          return attachInstruction(data, {
            input,
            element,
            operations: {
              'reorder-before': 'available',
              'reorder-after': 'available',
            },
          });
        },
        onDragEnter: (args) => {
          setInstruction(extractInstruction(args.self.data));
        },
        onDragLeave: () => {
          setInstruction(null);
        },
        onDrop: () => {
          setInstruction(null);
        },
      })
    );
  }, [item.id, index]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        padding: '8px',
        border: '1px solid #ccc',
        margin: '4px 0',
        backgroundColor: 'white',
      }}
    >
      {item.content}
      {instruction && <DropIndicator instruction={instruction} />}
    </div>
  );
}

function DragDropList() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const instruction = extractInstruction(destination.data);
        if (!instruction) return;

        // 处理重新排序逻辑
        const sourceIndex = source.data.index as number;
        const destIndex = destination.data.index as number;

        if (instruction.operation === 'reorder-before') {
          // 重新排序逻辑
        } else if (instruction.operation === 'reorder-after') {
          // 重新排序逻辑
        }

        // 添加闪烁效果
        triggerFlash(destination.element);
      },
    });
  }, [items]);

  return (
    <div>
      {items.map((item, index) => (
        <ListItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
```

这个 API 文档提供了 Pragmatic Drag and Drop 库的完整使用指南，包括核心功能和所有可选包的详细说明。