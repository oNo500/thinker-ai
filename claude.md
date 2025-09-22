# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 落地页规划规则

善于使用 `sequential-thinking` 进行落地页规划。
善于使用 `│ @21st-dev/magic` 根据prd内容捕获灵感。
善于使用 `Context 7` 规范技术抉择最佳实践
善于使用 `reactbits`的组件 进行效果设计

基础组件使用shadcn/ui，它被安装在/packages/ui目录下。遇到还没有的基础组件，可以使用 `pnpm dlx shadcn@latest add component-name` 命令添加。

## 开发命令

### 核心命令

- `pnpm dev` - 以开发模式启动所有应用（使用 Turborepo）
- `pnpm build` - 为生产环境构建所有应用和包
- `pnpm lint` - 在整个代码库中运行 ESLint 检查
- `pnpm lint:fix` - 自动修复 ESLint 问题
- `pnpm format` - 使用 Prettier 格式化代码
- `pnpm check-types` - 使用 TypeScript 编译器进行类型检查

### 应用特定命令

`apps/` 中的每个应用都有自己的 package.json 脚本：

- `dev` - 开发服务器（thinker-ai-code: 端口 3000，nextjs-app: 端口 3001）
- `build` - 生产构建
- `test` - 运行 Vitest 单元测试（带 UI）
- `test:e2e` - 运行 Playwright E2E 测试
- `mock:server` - 启动 MSW 模拟服务器用于开发

### UI 包命令 (packages/ui)

- `pnpm storybook` - 在端口 6006 启动 Storybook 开发服务器
- `pnpm generate:component` - 生成新的 React 组件脚手架

## 架构概览

这是一个使用 pnpm 工作区的 **Turborepo 单体仓库**，包含：

### 应用程序 (`apps/`)

- **thinker-ai-code** - 使用 React 19 的 Next.js 15 应用，主要开发目标
- **nextjs-app** - 次要的 Next.js 应用示例

两个应用都具有：

- 带 App Router 的 Next.js 15
- 具有现代特性的 React 19
- 用于样式的 Tailwind CSS v4
- 用于状态管理的 Zustand
- 用于数据获取的 TanStack Query
- 完整的身份验证流程
- 用于 API 模拟的 MSW
- Vitest + Playwright 测试

### 共享包 (`packages/`)

- **@repo/ui** - 基于 shadcn/ui 的共享 UI 组件库，带 Storybook
- **@repo/lint-config** - 共享 ESLint 配置
- **@repo/ts-config** - 共享 TypeScript 配置

## 技术栈

### 核心框架

- **Next.js 15** 带 App Router 和 Turbopack
- **React 19** 具有最新特性
- **TypeScript 5.8+** 提供类型安全

### 样式和 UI

- **Tailwind CSS v4** 实用优先的样式
- 通过 @repo/ui 包使用 **shadcn/ui** 组件
- **Radix UI** 原语提供可访问性
- **Lucide React** 图标库

### 状态和数据

- **Zustand** 用于客户端状态管理
- **TanStack Query** 用于服务器状态和数据获取
- **React Hook Form** 配合 Zod 验证

### 开发工具

- **Turborepo** 用于单体仓库任务编排
- **pnpm** 工作区用于包管理
- **ESLint + Prettier** 用于代码质量
- **Commitlint** 配合约定式提交
- **Husky** 用于 git 钩子

### 测试

- **Vitest** 用于单元/组件测试（带浏览器模式）
- **Playwright** 用于 E2E 测试
- **MSW** 用于 API 模拟
- **Storybook** 用于组件开发/测试

### 监控和分析

- **Sentry** 用于错误跟踪
- **Vercel Analytics** 用于使用分析

## 代码约定

### 组件创建

1. 检查 `packages/ui/src/components/` 中的现有组件
2. 遵循已建立的样式、属性和导出模式
3. 在可用时使用 Radix UI 原语
4. 实现正确的 TypeScript 接口
5. 如果是可重用组件，添加到 Storybook

### 添加新的 shadcn/ui 组件

使用：`pnpm dlx shadcn@latest add component-name`
组件安装到 `packages/ui/` 并为所有应用导出

### 状态管理

- 对复杂的客户端状态使用 Zustand
- 对服务器状态使用 TanStack Query
- 遵循应用中的现有存储模式

### API 集成

- 使用 axios 配合 TanStack Query
- 在开发中使用 MSW 模拟 API
- 遵循 `src/api/` 或 `src/lib/` 中的现有模式

## 提交信息格式

遵循约定式提交的严格规则：

- 类型：feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- 主题最多 50 个字符，无句号
- 范围最多 10 个字符
- 正文行最多 100 个字符

## 测试策略

### 单元/组件测试

- 使用带浏览器模式的 Vitest
- 来自 @testing-library/react 的测试工具
- 在应用目录中使用 `pnpm test` 运行

### E2E 测试

- `e2e/` 目录中的 Playwright 测试
- 使用 `pnpm test:e2e` 运行
- 包括冒烟测试和关键用户流程

### 组件测试

- 用于视觉测试的 Storybook 故事
- 可访问的组件示例

## 环境要求

- **Node.js**: >=22.11.0
- **pnpm**: >=10.12.1

## 重要说明

- 始终从根目录运行 `pnpm install` 以正确链接工作区
- 对内部包使用工作区引用（`workspace:*`）
- Turborepo 自动处理任务依赖和缓存
- 环境文件（`.env`）位于 `apps/` 目录中的每个应用

# 重要指令提醒

按要求执行；不多不少。
除非绝对有必要实现目标，否则永远不要创建文件。
始终优先编辑现有文件而不是创建新文件。
永远不要主动创建文档文件（\*.md）或 README 文件。只有在用户明确要求时才创建文档文件。
