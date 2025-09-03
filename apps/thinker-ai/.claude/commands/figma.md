# 还原 Figma 设计稿

## 📋 **还原流程**

### 1. 获取 Figma 数据

- 使用 Figma MCP 获取组件/页面设计数据
- 提取颜色、尺寸、文字等样式信息
- 获取图片和 SVG 资源

### 2. 样式优先级

1. **Figma 设计稿** - 最终视觉标准
2. **现有 Tailwind 设计令牌** - 技术实现方式
3. **现有 UI 组件** - 复用基础架构

### 3. 实施步骤

1. **现有代码分析**: 识别需要改造的现有组件和页面
2. **样式差异对比**: Figma 设计 vs 现有实现的视觉差异
3. **样式改造**: 修改现有组件的样式以匹配 Figma 设计
4. **颜色映射**: 将 Figma 颜色映射到项目的 Tailwind 设计令牌
5. **样式应用**: 优先使用 Tailwind 类，特殊情况使用 CSS Variables

## 🎨 **颜色处理规则**

```tsx
// 优先使用现有的 Tailwind 设计令牌
className="bg-background text-foreground border-border"

// 如果现有令牌无法满足需求，使用 Figma 设计稿中的颜色
// 例如：Figma 设计稿中的颜色
className="bg-[#f1f2ff] text-[#333333] border-[#cccccc]"
// 特殊颜色使用现有的 CSS Variables
style={{backgroundColor: 'var(--bg-primary)'}}

// 如果都没有，使用 Tailwind 任意值
className="bg-[#f1f2ff]"
```

## 🛠 **资产处理**

### 开发阶段

```tsx
// ✅ 开发时：直接使用 Figma MCP 的 localhost 源
if (figmaAsset.src?.startsWith('http://localhost')) {
  return <img src={figmaAsset.src} alt={figmaAsset.alt} />;
}

// ✅ 无 localhost 源：使用现有图标库
return <Search className="h-4 w-4" />; // Lucide React
```

### 生产部署

```bash
# 构建前运行资产下载脚本
npm run download-figma-assets

# 自动将 localhost 源替换为本地文件路径
# http://localhost:3001/figma-asset/icon-123 → /assets/figma/icon-123.svg
```

## 📝 **样式改造规范**

### 现有组件样式改造

```tsx
// 改造前：现有组件
const ExistingButton = ({ children, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: '#ddd',
        padding: '8px 16px',
        borderRadius: '4px',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// 改造后：匹配 Figma 设计
const ExistingButton = ({ children, ...props }) => {
  return (
    <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2" {...props}>
      {children}
    </button>
  );
};
```

### 现有页面布局改造

```tsx
// 改造前：内联样式
<div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
  <div style={{ width: '300px', backgroundColor: '#f5f5f5' }}>
    {/* 侧边栏 */}
  </div>
  <div style={{ flex: 1 }}>
    {/* 主内容 */}
  </div>
</div>

// 改造后：Tailwind + Figma 设计
<div className="flex gap-4 p-6">
  <div className="w-80 bg-secondary rounded-lg p-4">
    {/* 侧边栏 */}
  </div>
  <div className="flex-1 bg-background">
    {/* 主内容 */}
  </div>
</div>
```

### 仅在必要时创建新组件

```tsx
// ⚠️ 仅当现有组件设计不合理无法还原时才创建新组件
// 例如：现有组件结构过于复杂，无法通过样式修改匹配 Figma 设计

// 现有组件改造失败的情况下，才考虑重构或新建
export const RefactoredCard = ({ children }) => {
  return <div className="border-border bg-card text-card-foreground rounded-lg border p-6 shadow-sm">{children}</div>;
};
```

## ✅ **完成检查清单**

- [ ] 视觉效果与 Figma 设计稿一致
- [ ] 优先改造现有组件样式，而非创建新组件
- [ ] 移除了内联样式，使用 Tailwind 类替代
- [ ] 使用了现有的 Tailwind 设计令牌和 CSS Variables
- [ ] 正确处理了 Figma 资产（开发用 localhost，生产用本地文件）
- [ ] 没有导入新的图标库，使用 Figma 提供的资产
- [ ] 仅在现有组件无法改造时才考虑新建组件
- [ ] 响应式设计在移动端正常工作

## 现有组件还原工作流程

### 样式统一改造流程

1. **组件审计**: 识别使用内联样式、styled-components 的组件
2. **颜色标准化**: 替换硬编码颜色为 CSS Variables 或 Tailwind 类
3. **组件重构**: 使用 src/components/ui/ 中的基础组件替换
4. **测试验证**: 确保视觉效果一致性
5. **确认改造**: 一旦需要修改基础组件，你需要给我以上流程的方案经过我的统一再开始修改

### 新组件开发流程

1. **检查现有**: 优先使用 src/components/ui/ 中的组件
2. **Context7 查询**: 寻找最佳实践和实现方案
3. **设计一致性**: 遵循现有设计系统

### Figma 设计稿还原流程（样式改造为主）

1. **获取数据**: 使用 Figma MCP 获取设计数据和资源
2. **现有代码分析**: 识别需要改造的现有组件和页面
3. **样式差异对比**: Figma 设计 vs 现有实现的视觉差异
4. **样式改造**: 修改现有组件样式，移除内联样式，使用 Tailwind 类
5. **颜色映射**: 将 Figma 颜色映射到现有 Tailwind 设计令牌，优先使用 figma 设计稿中的颜色
6. **资产处理**: 开发时使用 localhost 源，生产时本地化资产文件
7. **样式优先级**: Figma 设计稿 > 现有 Tailwind 设计令牌 > 改造现有组件
8. **组件重构**: 仅在现有组件设计不合理无法还原时才考虑新建

## 原则

关注细节、边、阴影、hover、active 等状态，确保视觉效果与 Figma 设计稿一致。
需要考虑原始组件所基于的技术栈及其特性，考虑周全之后再开始改造。

查看figma选中的组件，和当前的代码对比，执行以上工作流开始还原figma中的样式/布局
