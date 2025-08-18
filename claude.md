## 落地页规划规则

善于使用 `sequential-thinking` 进行落地页规划。
善于使用 `│ @21st-dev/magic` 根据prd内容捕获灵感。
善于使用 `Context 7` 规范技术抉择最佳实践

基础组件使用shadcn/cn，它被安装在/packages/ui目录下。遇到还没有的基础组件，可以使用 `pnpm dlx shadcn@latest add component-name` 命令添加。

## 项目开发规范

### Git 提交信息规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**提交类型（Type）**：
- feat: 新功能
- fix: 修复
- docs: 文档变更
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构（既不是新增功能，也不是修改bug的代码变动）
- perf: 性能优化
- test: 增加测试
- chore: 构建过程或辅助工具的变动

### 环境变量配置规范

- 使用 UPPER_SNAKE_CASE 命名
- 通过配置模块访问环境变量，不直接使用 process.env
- 使用 Zod 验证环境变量

```typescript
// ✅ 正确
import { env } from '@/config/env';
const apiUrl = env.API_BASE_URL;

// ❌ 错误
const apiUrl = process.env.API_BASE_URL;
```

### 导入规范

导入语句按以下顺序分组：
1. React 相关
2. 外部依赖
3. 内部模块
4. 组件
5. Hooks
6. 工具函数
7. 样式

```typescript
// React 相关
import React, { useState, useEffect } from 'react';

// 外部依赖
import { QueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// 内部模块
import { API_BASE_URL } from '@/config/env';
import type { User } from '@/types/api';

// 组件
import { Button } from '@/components/ui/button';

// Hooks
import { useAuth } from '@/hooks/use-auth';

// 工具函数
import { formatDate } from '@/lib/utils';

// 样式
import styles from './styles.module.css';
```

### Monorepo 架构规范（MVP 阶段）

```
.
├── apps/           # 独立应用目录
│   ├── land/      # Land 应用
│   └── thinker/   # Thinker 应用
│
├── packages/       # 共享包目录
│   ├── ui/        # UI 组件库
│   ├── lint-config/  # ESLint 配置
│   └── ts-config/   # TypeScript 配置
```

### 命名规范

- **文件和目录**：kebab-case (`user-profile.tsx`, `auth-service.ts`)
- **函数和变量**：camelCase (`getUserData`, `userData`, `isLoading`)
- **常量**：UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)
- **类型和接口**：PascalCase (`UserProfile`, `AuthResponse`)
- **React 组件**：PascalCase (`UserProfile`, `LoginForm`)

### 项目结构规范（MVP 阶段）

```
src/
├── app/           # 应用程序层（路由入口）
├── assets/        # 全局静态资源
├── components/    # 全局共享组件
├── config/        # 全局配置
├── features/      # 特性模块（核心）
│   └── [feature]/
│       ├── components/  # 功能组件（优先级最高）
│       ├── api/        # 功能相关 API（必要时添加）
│       ├── hooks/      # 功能 Hooks（必要时添加）
│       ├── stores/     # 功能状态（必要时添加）
│       ├── types/      # 功能类型（保持最小必要）
│       └── utils/      # 功能工具（保持最小必要）
├── hooks/         # 全局共享 Hooks
├── lib/           # 第三方库封装
├── stores/        # 全局状态管理
└── types/         # 全局类型定义
```

### TypeScript 和 React 规范

**TypeScript**：
- 优先使用 `const`，避免使用 `var`
- 使用类型注解，避免使用 `any`
- 使用 `unknown` 替代 `any`

**React**：
- 使用函数组件和 Hooks
- 自定义 Hook 命名必须以 `use` 开头
- Props 类型定义使用 interface

```typescript
// ✅ 正确的 React 组件
interface UserProfileProps {
  userId: string;
  onUpdate: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User>();
  return <div>{user?.name}</div>;
};
```


