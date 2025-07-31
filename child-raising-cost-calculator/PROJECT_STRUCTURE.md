# 项目结构说明

## 目录结构

```
src/
├── components/              # 组件目录
│   ├── ui/                 # 基础UI组件
│   │   ├── Button.tsx      # 按钮组件
│   │   ├── Input.tsx       # 输入框组件
│   │   ├── Card.tsx        # 卡片组件
│   │   ├── Select.tsx      # 选择器组件
│   │   ├── Badge.tsx       # 徽章组件
│   │   └── index.ts        # UI组件导出
│   ├── forms/              # 表单组件
│   │   ├── CalculatorForm.tsx  # 计算器表单
│   │   └── index.ts        # 表单组件导出
│   ├── charts/             # 图表组件
│   │   ├── CostTrendChart.tsx      # 成本趋势图
│   │   ├── CostBreakdownChart.tsx  # 成本分解图
│   │   └── index.ts        # 图表组件导出
│   ├── CostBreakdown.tsx   # 遗留组件（向后兼容）
│   └── index.ts            # 所有组件导出
├── data/                   # 静态数据
│   ├── constants.ts        # 常量配置
│   ├── mockData.ts         # 模拟数据
│   └── index.ts            # 数据导出
├── hooks/                  # 自定义hooks
│   ├── useCalculator.ts    # 计算器hook
│   ├── useLocalStorage.ts  # 本地存储hook
│   ├── useFormPersistence.ts # 表单持久化hook
│   └── index.ts            # hooks导出
├── types/                  # TypeScript类型定义
│   └── index.ts            # 类型定义
├── utils/                  # 工具函数
│   ├── calculator.ts       # 计算相关工具
│   ├── cn.ts              # 类名合并工具
│   ├── validation.ts       # 验证工具
│   ├── export.ts          # 导出工具
│   └── index.ts           # 工具函数导出
└── styles/                # 样式文件
    ├── animations.css     # 动画样式
    ├── components.css     # 组件样式
    └── index.ts          # 样式导出
```

## 组件说明

### UI组件 (`components/ui/`)

- **Button**: 可配置的按钮组件，支持多种变体和尺寸
- **Input**: 输入框组件，支持标签、错误提示、图标等
- **Card**: 卡片容器组件，支持不同变体和内边距
- **Select**: 下拉选择组件，支持选项配置
- **Badge**: 徽章组件，用于状态显示

### 表单组件 (`components/forms/`)

- **CalculatorForm**: 主要的计算器表单，集成了所有输入字段

### 图表组件 (`components/charts/`)

- **CostTrendChart**: 显示成本随年龄变化的趋势图
- **CostBreakdownChart**: 显示成本构成的饼图和详细列表

## 数据管理 (`data/`)

### 常量配置 (`constants.ts`)
- 基础成本配置
- 城市等级系数
- 年龄系数
- 教育和医疗系数
- 选项配置
- 图表颜色配置

### 模拟数据 (`mockData.ts`)
- 示例计算结果
- 不同场景的测试数据

## 自定义Hooks (`hooks/`)

### useCalculator
- 管理计算状态
- 处理异步计算
- 错误处理

### useLocalStorage
- 本地存储管理
- 自动序列化/反序列化
- 存储事件监听

### useFormPersistence
- 表单数据持久化
- 自动保存和恢复
- 表单重置功能

## 工具函数 (`utils/`)

### calculator.ts
- 核心计算逻辑
- 成本分解计算
- 图表数据生成
- 货币格式化

### validation.ts
- 表单验证规则
- 字段验证函数
- 错误消息格式化

### export.ts
- 数据导出功能
- 支持JSON、CSV、文本格式
- 文件下载处理

### cn.ts
- CSS类名合并工具
- 基于clsx库

## 样式系统 (`styles/`)

### animations.css
- 自定义动画定义
- 动画工具类
- 延迟和持续时间配置

### components.css
- 组件特定样式
- 工具类定义
- 响应式样式

## 类型定义 (`types/`)

完整的TypeScript类型定义，包括：
- 表单数据类型
- 计算结果类型
- 成本分解类型
- 图表数据类型
- 配置类型

## 使用指南

### 导入组件
```typescript
import { Button, Input, Card } from '../components/ui'
import { CalculatorForm } from '../components/forms'
import { CostTrendChart } from '../components/charts'
```

### 使用Hooks
```typescript
import { useCalculator, useLocalStorage } from '../hooks'
```

### 使用工具函数
```typescript
import { calculateChildRaisingCost, formatCurrency } from '../utils'
```

### 使用常量
```typescript
import { BASE_COSTS, CITY_MULTIPLIERS } from '../data'
```

## 扩展指南

1. **添加新的UI组件**: 在`components/ui/`目录下创建，并在`index.ts`中导出
2. **添加新的表单**: 在`components/forms/`目录下创建
3. **添加新的图表**: 在`components/charts/`目录下创建
4. **添加新的Hook**: 在`hooks/`目录下创建
5. **添加新的工具函数**: 在`utils/`目录下创建
6. **添加新的常量**: 在`data/constants.ts`中定义
7. **添加新的类型**: 在`types/index.ts`中定义
