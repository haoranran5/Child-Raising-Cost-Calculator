# UI组件文档

## 概述

本项目包含一套完整的基础UI组件，使用Tailwind CSS构建，支持TypeScript类型定义。所有组件都具有响应式设计、无障碍访问支持和流畅的动画效果。

## 组件列表

### 1. Button 按钮组件

**文件位置**: `src/components/ui/Button.tsx`

#### Props接口
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}
```

#### 使用示例
```tsx
import { Button } from './components/ui'
import { Download, Heart } from 'lucide-react'

// 基础使用
<Button>点击我</Button>

// 不同变体
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="ghost">幽灵按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中等按钮</Button>
<Button size="lg">大按钮</Button>

// 带图标
<Button leftIcon={<Download />}>下载</Button>
<Button rightIcon={<Heart />}>收藏</Button>

// 状态
<Button loading>加载中...</Button>
<Button disabled>禁用状态</Button>
<Button fullWidth>全宽按钮</Button>
```

#### 特性
- ✅ 三种变体样式（primary、secondary、ghost）
- ✅ 三种尺寸（sm、md、lg）
- ✅ 加载状态显示
- ✅ 左右图标支持
- ✅ 全宽选项
- ✅ 悬停和点击动画
- ✅ 无障碍访问支持

---

### 2. Card 卡片组件

**文件位置**: `src/components/ui/Card.tsx`

#### Props接口
```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
  children: ReactNode
}
```

#### 使用示例
```tsx
import { Card } from './components/ui'

// 基础使用
<Card>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</Card>

// 不同变体
<Card variant="default">默认卡片</Card>
<Card variant="elevated">高阴影卡片</Card>
<Card variant="outlined">边框卡片</Card>
<Card variant="ghost">幽灵卡片</Card>

// 不同内边距
<Card padding="sm">小内边距</Card>
<Card padding="md">中等内边距</Card>
<Card padding="lg">大内边距</Card>

// 交互效果
<Card hoverable>悬停效果</Card>
<Card clickable onClick={handleClick}>可点击卡片</Card>
```

#### 特性
- ✅ 四种变体样式
- ✅ 四种内边距选项
- ✅ 悬停效果支持
- ✅ 点击交互支持
- ✅ 入场动画
- ✅ 响应式设计

---

### 3. OptionCard 选项卡片组件

**文件位置**: `src/components/ui/OptionCard.tsx`

#### Props接口
```typescript
interface OptionCardProps {
  title: string
  description?: string
  icon?: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  value?: string
  extra?: ReactNode
}
```

#### 使用示例
```tsx
import { OptionCard } from './components/ui'
import { Home, School } from 'lucide-react'

const [selected, setSelected] = useState('option1')

<OptionCard
  title="一线城市"
  description="北京、上海、广州、深圳"
  icon={<Home />}
  selected={selected === 'option1'}
  onClick={() => setSelected('option1')}
  extra={<span className="badge">高成本</span>}
/>

<OptionCard
  title="公立教育"
  description="以公立学校为主"
  icon={<School />}
  selected={selected === 'option2'}
  onClick={() => setSelected('option2')}
  disabled={true}
/>
```

#### 特性
- ✅ 选中状态视觉反馈
- ✅ 图标支持
- ✅ 额外信息显示
- ✅ 禁用状态
- ✅ 键盘导航支持
- ✅ 悬停和点击动画
- ✅ 无障碍访问支持

---

### 4. ProgressSteps 进度步骤组件

**文件位置**: `src/components/ui/ProgressSteps.tsx`

#### Props接口
```typescript
interface Step {
  id: string
  title: string
  description?: string
  optional?: boolean
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  completedSteps?: number[]
  onStepClick?: (stepIndex: number) => void
  showDescription?: boolean
  className?: string
  orientation?: 'horizontal' | 'vertical'
}
```

#### 使用示例
```tsx
import { ProgressSteps } from './components/ui'

const steps = [
  {
    id: 'basic-info',
    title: '基本信息',
    description: '填写家庭基本情况'
  },
  {
    id: 'preferences',
    title: '偏好设置',
    description: '选择教育和生活偏好'
  },
  {
    id: 'results',
    title: '结果报告',
    description: '获取完整报告',
    optional: true
  }
]

// 水平布局
<ProgressSteps
  steps={steps}
  currentStep={1}
  completedSteps={[0]}
  onStepClick={handleStepClick}
  orientation="horizontal"
/>

// 垂直布局
<ProgressSteps
  steps={steps}
  currentStep={1}
  completedSteps={[0]}
  orientation="vertical"
  showDescription={true}
/>
```

#### 特性
- ✅ 水平和垂直布局
- ✅ 当前步骤高亮
- ✅ 完成状态显示
- ✅ 可选步骤标记
- ✅ 步骤点击导航
- ✅ 脉冲动画效果
- ✅ 响应式设计

---

## 设计系统

### 颜色方案
- **主色调**: Blue-500 (#3B82F6)
- **次要色**: Gray-200 (#E5E7EB)
- **成功色**: Green-500 (#10B981)
- **警告色**: Yellow-500 (#F59E0B)
- **错误色**: Red-500 (#EF4444)

### 尺寸规范
- **小尺寸**: padding: 0.375rem 0.75rem, text: 0.875rem
- **中等尺寸**: padding: 0.5rem 1rem, text: 1rem
- **大尺寸**: padding: 0.75rem 1.5rem, text: 1.125rem

### 圆角规范
- **小圆角**: 0.375rem (6px)
- **中等圆角**: 0.5rem (8px)
- **大圆角**: 0.75rem (12px)

### 阴影规范
- **轻阴影**: shadow-sm
- **中等阴影**: shadow-md
- **重阴影**: shadow-lg

## 最佳实践

### 1. 组件组合
```tsx
// 推荐：组合使用组件
<Card>
  <ProgressSteps steps={steps} currentStep={0} />
  
  <div className="grid gap-4 mt-6">
    <OptionCard title="选项1" selected={true} />
    <OptionCard title="选项2" />
  </div>
  
  <div className="flex justify-between mt-6">
    <Button variant="secondary">上一步</Button>
    <Button>下一步</Button>
  </div>
</Card>
```

### 2. 响应式设计
```tsx
// 推荐：使用响应式类名
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <OptionCard title="选项1" />
  <OptionCard title="选项2" />
  <OptionCard title="选项3" />
</div>
```

### 3. 无障碍访问
```tsx
// 推荐：提供适当的aria属性
<OptionCard
  title="选项"
  onClick={handleClick}
  aria-label="选择此选项"
  role="button"
/>
```

## 扩展指南

### 添加新变体
1. 在组件的variants对象中添加新样式
2. 更新TypeScript类型定义
3. 添加相应的文档和示例

### 自定义主题
1. 修改Tailwind配置文件
2. 更新组件中的颜色类名
3. 确保所有组件保持一致性

### 性能优化
1. 使用React.memo包装纯组件
2. 合理使用useCallback和useMemo
3. 避免不必要的重新渲染

## 测试

项目包含组件展示页面，可以通过以下方式查看：

1. 启动开发服务器：`npm run dev`
2. 在主页面点击"查看组件展示"按钮
3. 或直接访问ComponentShowcase组件

展示页面包含所有组件的各种状态和用法示例，便于开发和测试。
