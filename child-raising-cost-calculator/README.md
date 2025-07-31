# 养娃成本计算器 (Child Raising Cost Calculator)

一个基于 React + TypeScript + Tailwind CSS 的现代化养娃成本计算器，帮助家长科学规划育儿财务。

## 🚀 技术栈

- **React 19** - 现代化的前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React Hook Form** - 高性能的表单处理
- **Recharts** - 数据可视化图表库
- **Framer Motion** - 流畅的动画效果
- **Lucide React** - 美观的图标库

## 📦 功能特性

- 📊 **智能计算** - 基于地区、年龄、收入等因素计算养娃成本
- 📈 **数据可视化** - 直观的图表展示成本趋势
- 🎨 **现代化UI** - 响应式设计，支持移动端
- ⚡ **高性能** - 基于 Vite 的快速开发体验
- 🔧 **类型安全** - 完整的 TypeScript 支持

## 🛠️ 安装与运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── hooks/              # 自定义 React Hooks
├── assets/             # 静态资源
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎯 使用说明

1. 输入家庭基本信息（月收入、孩子年龄、所在城市）
2. 选择教育和医疗水平（可选）
3. 点击"计算养娃成本"按钮
4. 查看详细的成本分析和趋势图表

## 🔧 自定义配置

### Tailwind CSS 配置
项目已配置了自定义的颜色主题和动画效果，可在 `tailwind.config.js` 中修改。

### 计算逻辑
成本计算逻辑位于主组件中，可根据实际需求调整计算公式。

## 📝 开发指南

### 添加新组件
```typescript
// src/components/NewComponent.tsx
import { FC } from 'react'

interface NewComponentProps {
  // 定义 props 类型
}

const NewComponent: FC<NewComponentProps> = ({ }) => {
  return (
    <div className="card">
      {/* 组件内容 */}
    </div>
  )
}

export default NewComponent
```

### 使用自定义 Hook
```typescript
// src/hooks/useCalculator.ts
import { useState } from 'react'
import { FormData, CalculationResult } from '../types'

export const useCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculate = (data: FormData) => {
    // 计算逻辑
  }

  return { result, calculate }
}
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
