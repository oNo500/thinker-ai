# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 落地页规划规则

善于使用 `sequential-thinking` 进行落地页规划。
善于使用 `│ @21st-dev/magic` 根据prd内容捕获灵感。
善于使用 `Context 7` 规范技术抉择最佳实践
善于使用 `reactbits`的组件 进行效果设计

基础组件使用shadcn/un，它被安装在/packages/ui目录下。遇到还没有的基础组件，可以使用 `pnpm dlx shadcn@latest add component-name` 命令添加。

## Development Commands

### Core Commands

- `pnpm dev` - Start all applications in development mode (uses Turborepo)
- `pnpm build` - Build all applications and packages for production
- `pnpm lint` - Run ESLint checks across entire codebase
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Type check with TypeScript compiler

### Application-Specific Commands

Each app in `apps/` has its own package.json with scripts:

- `dev` - Development server (thinker-ai-code: port 3000, nextjs-app: port 3001)
- `build` - Production build
- `test` - Run Vitest unit tests with UI
- `test:e2e` - Run Playwright E2E tests
- `mock:server` - Start MSW mock server for development

### UI Package Commands (packages/ui)

- `pnpm storybook` - Start Storybook development server on port 6006
- `pnpm generate:component` - Generate new React component scaffold

## Architecture Overview

This is a **Turborepo monorepo** with pnpm workspaces containing:

### Applications (`apps/`)

- **thinker-ai-code** - Next.js 15 app with React 19, main development target
- **nextjs-app** - Secondary Next.js application example

Both apps feature:

- Next.js 15 with App Router
- React 19 with modern features
- Tailwind CSS v4 for styling
- Zustand for state management
- TanStack Query for data fetching
- Full authentication flow
- MSW for API mocking
- Vitest + Playwright testing

### Shared Packages (`packages/`)

- **@repo/ui** - Shared UI component library based on shadcn/ui with Storybook
- **@repo/lint-config** - Shared ESLint configuration
- **@repo/ts-config** - Shared TypeScript configurations

## Technology Stack

### Core Framework

- **Next.js 15** with App Router and Turbopack
- **React 19** with latest features
- **TypeScript 5.8+** for type safety

### Styling & UI

- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** components via @repo/ui package
- **Radix UI** primitives for accessibility
- **Lucide React** for icons

### State & Data

- **Zustand** for client state management
- **TanStack Query** for server state and data fetching
- **React Hook Form** with Zod validation

### Development Tools

- **Turborepo** for monorepo task orchestration
- **pnpm** workspaces for package management
- **ESLint + Prettier** for code quality
- **Commitlint** with conventional commits
- **Husky** for git hooks

### Testing

- **Vitest** for unit/component testing with browser mode
- **Playwright** for E2E testing
- **MSW** for API mocking
- **Storybook** for component development/testing

### Monitoring & Analytics

- **Sentry** for error tracking
- **Vercel Analytics** for usage analytics

## Code Conventions

### Component Creation

1. Check existing components in `packages/ui/src/components/`
2. Follow established patterns for styling, props, and exports
3. Use Radix UI primitives when available
4. Implement proper TypeScript interfaces
5. Add to Storybook if it's a reusable component

### Adding New shadcn/ui Components

Use: `pnpm dlx shadcn@latest add component-name`
Components are installed to `packages/ui/` and exported for all apps

### State Management

- Use Zustand for complex client state
- Use TanStack Query for server state
- Follow existing store patterns in apps

### API Integration

- Use axios with TanStack Query
- Mock APIs with MSW in development
- Follow existing patterns in `src/api/` or `src/lib/`

## Commit Message Format

Follows conventional commits with strict rules:

- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Subject max 50 characters, no period
- Scope max 10 characters
- Body lines max 100 characters

## Testing Strategy

### Unit/Component Tests

- Use Vitest with browser mode
- Test utilities from @testing-library/react
- Run with `pnpm test` in app directories

### E2E Tests

- Playwright tests in `e2e/` directories
- Run with `pnpm test:e2e`
- Include smoke tests and critical user flows

### Component Testing

- Storybook stories for visual testing
- Accessible component examples

## Environment Requirements

- **Node.js**: >=22.11.0
- **pnpm**: >=10.12.1

## Important Notes

- Always run `pnpm install` from the root for proper workspace linking
- Use workspace references (`workspace:*`) for internal packages
- Turborepo handles task dependencies and caching automatically
- Environment files (`.env`) are per-application in `apps/` directories
