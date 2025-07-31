# 🎨 现代化样式系统指南

## 📋 概述

我们为养娃成本计算器创建了一个完整的现代化样式系统，包含：

- ✅ **全局CSS变量系统** - 统一的设计令牌
- ✅ **扩展的Tailwind配置** - 自定义颜色、字体、动画
- ✅ **样式工具函数库** - 可复用的样式组合
- ✅ **响应式设计工具** - 移动端优先的布局
- ✅ **现代动画系统** - 流畅的交互体验

## 🎯 设计原则

### 1. 现代化设计趋势
- **简洁性** - 清晰的视觉层次和留白
- **一致性** - 统一的设计语言和组件
- **可访问性** - 符合WCAG标准的对比度和交互
- **响应式** - 移动端优先的设计方法

### 2. 技术特性
- **CSS变量** - 支持主题切换和动态样式
- **Tailwind CSS** - 原子化CSS和工具类优先
- **TypeScript** - 类型安全的样式工具
- **性能优化** - 按需加载和样式优化

## 🎨 颜色系统

### 主色调 (Primary)
```css
--color-primary-50: #eff6ff   /* 最浅 */
--color-primary-500: #3b82f6  /* 主色 */
--color-primary-900: #1e3a8a  /* 最深 */
```

### 语义化颜色
```css
--color-success: #22c55e    /* 成功 */
--color-warning: #f59e0b    /* 警告 */
--color-error: #ef4444      /* 错误 */
--color-info: #06b6d4       /* 信息 */
```

### 使用方式
```tsx
// Tailwind类名
<div className="bg-primary-500 text-white" />

// CSS变量
<div style={{ backgroundColor: 'var(--color-primary-500)' }} />

// 样式工具函数
<button className={buttonVariants.primary} />
```

## 🔤 字体系统

### 字体族
- **Sans**: Inter, SF Pro Display (现代无衬线)
- **Serif**: Playfair Display (优雅衬线)
- **Mono**: JetBrains Mono (等宽字体)

### 字体大小
```css
--font-size-xs: 0.75rem     /* 12px */
--font-size-base: 1rem      /* 16px */
--font-size-4xl: 2.25rem    /* 36px */
```

### 使用方式
```tsx
<h1 className="text-4xl font-bold font-sans">标题</h1>
<p className="text-base font-normal">正文</p>
<code className="text-sm font-mono">代码</code>
```

## 📐 间距系统

### 间距标准
```css
--spacing-1: 0.25rem    /* 4px */
--spacing-4: 1rem       /* 16px */
--spacing-8: 2rem       /* 32px */
--spacing-16: 4rem      /* 64px */
```

### 使用方式
```tsx
<div className="p-4 m-8 gap-2">
  <div className="space-y-4">内容</div>
</div>
```

## 🎭 组件样式

### 按钮系统
```tsx
import { buttonVariants, buttonSizes } from '@/utils/styles'

// 变体
<button className={buttonVariants.primary}>主要按钮</button>
<button className={buttonVariants.outline}>轮廓按钮</button>
<button className={buttonVariants.ghost}>幽灵按钮</button>

// 尺寸
<button className={cn(buttonVariants.primary, buttonSizes.lg)}>
  大按钮
</button>
```

### 卡片系统
```tsx
import { cardVariants } from '@/utils/styles'

<div className={cardVariants.default}>默认卡片</div>
<div className={cardVariants.elevated}>提升卡片</div>
<div className={cardVariants.glass}>玻璃态卡片</div>
```

### 输入框系统
```tsx
import { inputVariants } from '@/utils/styles'

<input className={inputVariants.default} />
<input className={inputVariants.error} />
<input className={inputVariants.success} />
```

## 🎬 动画系统

### 基础动画
```tsx
<div className="animate-fade-in">淡入</div>
<div className="animate-slide-up">滑入</div>
<div className="animate-bounce-in">弹入</div>
```

### 交互动画
```tsx
<button className="transition-all duration-300 hover:scale-105">
  悬停缩放
</button>
```

### 自定义动画
```tsx
import { animate, transition } from '@/utils/styles'

<div className={cn(
  animate('float'),
  transition(['transform'], '300ms', 'ease-out')
)}>
  浮动效果
</div>
```

## 📱 响应式设计

### 断点系统
```css
xs: 475px   /* 超小屏 */
sm: 640px   /* 小屏 */
md: 768px   /* 中屏 */
lg: 1024px  /* 大屏 */
xl: 1280px  /* 超大屏 */
2xl: 1536px /* 超超大屏 */
```

### 响应式工具
```tsx
import { responsive, grid, container } from '@/utils/styles'

// 响应式样式
<div className={responsive({
  base: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
})}>
  响应式文本
</div>

// 响应式网格
<div className={grid({
  cols: 1,
  gap: 4,
  responsive: { md: 2, lg: 3 }
})}>
  网格布局
</div>

// 响应式容器
<div className={container({ padding: true })}>
  容器内容
</div>
```

## 🛠️ 工具函数

### 核心工具
```tsx
import { cn, createVariants, createSizes } from '@/utils/styles'

// 类名合并
const className = cn('base-class', condition && 'conditional-class')

// 创建变体
const myVariants = createVariants({
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white'
})
```

### 布局工具
```tsx
import { flex, grid, container } from '@/utils/styles'

// 弹性布局
<div className={flex({
  direction: 'col',
  align: 'center',
  justify: 'between',
  gap: 4
})}>

// 网格布局
<div className={grid({
  cols: 3,
  gap: 6
})}>

// 容器
<div className={container({
  maxWidth: '4xl',
  center: true,
  padding: true
})}>
```

### 条件样式
```tsx
import { conditionalStyle, stateStyle } from '@/utils/styles'

// 条件样式
const buttonClass = conditionalStyle(
  isActive,
  'bg-blue-500',
  'bg-gray-500'
)

// 状态样式
const statusClass = stateStyle(status, {
  loading: 'animate-spin',
  success: 'text-green-500',
  error: 'text-red-500'
})
```

## 🌙 主题系统

### 深色模式
```tsx
// 自动主题切换
<div className="bg-background text-foreground">
  自适应主题
</div>

// 手动主题控制
import { darkMode } from '@/utils/styles'

<div className={darkMode('bg-white', 'bg-gray-900')}>
  主题切换
</div>
```

### CSS变量主题
```css
:root {
  --color-background: #ffffff;
  --color-foreground: #000000;
}

.dark {
  --color-background: #000000;
  --color-foreground: #ffffff;
}
```

## 🎯 最佳实践

### 1. 组件开发
```tsx
// ✅ 推荐：使用样式工具函数
import { cn, buttonVariants, buttonSizes } from '@/utils/styles'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Button = ({ variant = 'primary', size = 'md', className, ...props }) => {
  return (
    <button
      className={cn(
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  )
}
```

### 2. 样式组合
```tsx
// ✅ 推荐：使用cn函数合并类名
const cardClass = cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'special' && 'special-styles'
)

// ❌ 避免：字符串拼接
const cardClass = `base-styles ${isActive ? 'active-styles' : ''}`
```

### 3. 响应式设计
```tsx
// ✅ 推荐：移动端优先
<div className="text-sm md:text-base lg:text-lg">
  响应式文本
</div>

// ✅ 推荐：使用响应式工具
<div className={responsive({
  base: 'grid-cols-1',
  md: 'grid-cols-2',
  lg: 'grid-cols-3'
})}>
```

### 4. 性能优化
```tsx
// ✅ 推荐：使用CSS变量
<div style={{ color: 'var(--color-primary-500)' }} />

// ✅ 推荐：避免内联样式
<div className="text-primary-500" />
```

## 🚀 使用示例

### 完整组件示例
```tsx
import { cn, cardVariants, buttonVariants, flex } from '@/utils/styles'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className={cn(
      cardVariants.elevated,
      'p-6 transition-all duration-300 hover:scale-105'
    )}>
      <div className={flex({ direction: 'col', gap: 4 })}>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-muted-foreground">{product.description}</p>
        <div className={flex({ justify: 'between', align: 'center' })}>
          <span className="text-2xl font-bold text-primary">
            ¥{product.price}
          </span>
          <button
            onClick={onAddToCart}
            className={cn(
              buttonVariants.primary,
              'transition-all duration-200 hover:shadow-lg'
            )}
          >
            添加到购物车
          </button>
        </div>
      </div>
    </div>
  )
}
```

## 📚 扩展指南

### 添加新的颜色
1. 在 `src/styles/globals.css` 中添加CSS变量
2. 在 `tailwind.config.js` 中添加颜色配置
3. 在 `src/utils/styles.ts` 中创建相应的变体

### 添加新的组件样式
1. 在 `src/utils/styles.ts` 中使用 `createVariants` 创建变体
2. 导出变体供组件使用
3. 在组件中使用 `cn` 函数组合样式

### 自定义动画
1. 在 `tailwind.config.js` 中添加关键帧
2. 在动画配置中添加新动画
3. 使用 `animate` 工具函数应用动画

## 🎉 总结

这个样式系统提供了：

- 🎨 **完整的设计令牌** - 颜色、字体、间距等
- 🧩 **可复用的组件样式** - 按钮、卡片、输入框等
- 📱 **响应式设计工具** - 移动端优先的布局
- 🎬 **现代动画效果** - 流畅的用户体验
- 🌙 **主题切换支持** - 深色/浅色模式
- 🛠️ **强大的工具函数** - 提高开发效率

现在您可以使用这个现代化的样式系统来构建美观、一致、响应式的用户界面！
