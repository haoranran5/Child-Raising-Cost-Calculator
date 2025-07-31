/**
 * 样式工具函数库
 * 提供常用样式组合、条件样式函数和响应式工具
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ==========================================================================
// 核心工具函数
// ==========================================================================

/**
 * 合并和优化Tailwind CSS类名
 * 使用clsx处理条件类名，使用twMerge去重和优化
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 创建变体样式映射
 */
export function createVariants<T extends Record<string, string>>(variants: T) {
  return variants
}

/**
 * 创建尺寸样式映射
 */
export function createSizes<T extends Record<string, string>>(sizes: T) {
  return sizes
}

// ==========================================================================
// 常用样式组合
// ==========================================================================

/**
 * 按钮样式变体
 */
export const buttonVariants = createVariants({
  // 主要按钮
  primary: cn(
    'bg-primary-500 text-white border-primary-500',
    'hover:bg-primary-600 hover:border-primary-600',
    'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'active:bg-primary-700',
    'disabled:bg-primary-300 disabled:cursor-not-allowed'
  ),
  
  // 次要按钮
  secondary: cn(
    'bg-secondary-100 text-secondary-900 border-secondary-200',
    'hover:bg-secondary-200 hover:border-secondary-300',
    'focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
    'active:bg-secondary-300',
    'disabled:bg-secondary-50 disabled:text-secondary-400 disabled:cursor-not-allowed'
  ),
  
  // 轮廓按钮
  outline: cn(
    'bg-transparent text-primary-600 border-primary-500',
    'hover:bg-primary-50 hover:text-primary-700',
    'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'active:bg-primary-100',
    'disabled:text-primary-300 disabled:border-primary-200 disabled:cursor-not-allowed'
  ),
  
  // 幽灵按钮
  ghost: cn(
    'bg-transparent text-gray-700 border-transparent',
    'hover:bg-gray-100 hover:text-gray-900',
    'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    'active:bg-gray-200',
    'disabled:text-gray-400 disabled:cursor-not-allowed'
  ),
  
  // 危险按钮
  destructive: cn(
    'bg-error-500 text-white border-error-500',
    'hover:bg-error-600 hover:border-error-600',
    'focus:ring-2 focus:ring-error-500 focus:ring-offset-2',
    'active:bg-error-700',
    'disabled:bg-error-300 disabled:cursor-not-allowed'
  ),
  
  // 链接按钮
  link: cn(
    'bg-transparent text-primary-600 border-transparent underline-offset-4',
    'hover:underline hover:text-primary-700',
    'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'disabled:text-primary-300 disabled:cursor-not-allowed'
  ),
})

/**
 * 按钮尺寸变体
 */
export const buttonSizes = createSizes({
  xs: 'h-7 px-2 text-xs',
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-6 text-base',
  xl: 'h-11 px-8 text-base',
  '2xl': 'h-12 px-10 text-lg',
})

/**
 * 卡片样式变体
 */
export const cardVariants = createVariants({
  default: cn(
    'bg-card text-card-foreground',
    'border border-border',
    'rounded-lg shadow-sm'
  ),
  
  elevated: cn(
    'bg-card text-card-foreground',
    'border border-border',
    'rounded-lg shadow-lg'
  ),
  
  outlined: cn(
    'bg-card text-card-foreground',
    'border-2 border-border',
    'rounded-lg'
  ),
  
  ghost: cn(
    'bg-transparent text-card-foreground',
    'rounded-lg'
  ),
  
  glass: cn(
    'glass text-card-foreground',
    'rounded-lg backdrop-blur-md'
  ),
})

/**
 * 输入框样式变体
 */
export const inputVariants = createVariants({
  default: cn(
    'flex h-9 w-full rounded-md border border-input',
    'bg-background px-3 py-1 text-sm',
    'ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
  
  error: cn(
    'flex h-9 w-full rounded-md border-2 border-error-500',
    'bg-background px-3 py-1 text-sm',
    'ring-offset-background',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
  
  success: cn(
    'flex h-9 w-full rounded-md border-2 border-success-500',
    'bg-background px-3 py-1 text-sm',
    'ring-offset-background',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
})

/**
 * 徽章样式变体
 */
export const badgeVariants = createVariants({
  default: cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
  ),
  
  secondary: cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
  ),
  
  destructive: cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
  ),
  
  outline: cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'text-foreground'
  ),
})

// ==========================================================================
// 条件样式函数
// ==========================================================================

/**
 * 根据条件返回样式
 */
export function conditionalStyle(
  condition: boolean,
  trueStyle: string,
  falseStyle: string = ''
): string {
  return condition ? trueStyle : falseStyle
}

/**
 * 根据状态返回样式
 */
export function stateStyle(
  state: 'idle' | 'loading' | 'success' | 'error',
  styles: Partial<Record<typeof state, string>>
): string {
  return styles[state] || ''
}

/**
 * 根据变体和尺寸组合样式
 */
export function variantStyle<V extends string, S extends string>(
  variant: V,
  size: S,
  variants: Record<V, string>,
  sizes: Record<S, string>,
  baseStyle: string = ''
): string {
  return cn(baseStyle, variants[variant], sizes[size])
}

// ==========================================================================
// 响应式工具函数
// ==========================================================================

/**
 * 创建响应式样式
 */
export function responsive(styles: {
  base?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
}): string {
  const { base = '', xs, sm, md, lg, xl, '2xl': xl2, '3xl': xl3 } = styles
  
  return cn(
    base,
    xs && `xs:${xs}`,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
    xl2 && `2xl:${xl2}`,
    xl3 && `3xl:${xl3}`
  )
}

/**
 * 创建容器样式
 */
export function container(options: {
  center?: boolean
  padding?: boolean | string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
} = {}): string {
  const { center = true, padding = true, maxWidth = '7xl' } = options
  
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }
  
  return cn(
    'w-full',
    maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] || maxWidthClasses['7xl'],
    center && 'mx-auto',
    padding === true && 'px-4 sm:px-6 lg:px-8',
    typeof padding === 'string' && padding
  )
}

/**
 * 创建网格样式
 */
export function grid(options: {
  cols?: number | 'auto' | 'subgrid'
  gap?: number | string
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
} = {}): string {
  const { cols = 1, gap = 4, responsive = {} } = options
  
  const colsClass = typeof cols === 'number' ? `grid-cols-${cols}` : `grid-cols-${cols}`
  const gapClass = typeof gap === 'number' ? `gap-${gap}` : gap
  
  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, colCount]) => `${breakpoint}:grid-cols-${colCount}`)
    .join(' ')
  
  return cn('grid', colsClass, gapClass, responsiveClasses)
}

/**
 * 创建弹性布局样式
 */
export function flex(options: {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  wrap?: boolean | 'reverse'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  gap?: number | string
} = {}): string {
  const {
    direction = 'row',
    wrap = false,
    justify = 'start',
    align = 'start',
    gap = 0
  } = options
  
  const directionClass = `flex-${direction}`
  const wrapClass = wrap === true ? 'flex-wrap' : wrap === 'reverse' ? 'flex-wrap-reverse' : ''
  const justifyClass = `justify-${justify}`
  const alignClass = `items-${align}`
  const gapClass = gap ? (typeof gap === 'number' ? `gap-${gap}` : gap) : ''
  
  return cn('flex', directionClass, wrapClass, justifyClass, alignClass, gapClass)
}

// ==========================================================================
// 动画工具函数
// ==========================================================================

/**
 * 创建过渡样式
 */
export function transition(
  properties: string[] = ['all'],
  duration: string = '200ms',
  easing: string = 'ease-in-out'
): string {
  const transitionClass = properties.includes('all') 
    ? 'transition-all' 
    : `transition-[${properties.join(',')}]`
  
  return cn(transitionClass, `duration-${duration.replace('ms', '')}`, `ease-${easing}`)
}

/**
 * 创建动画样式
 */
export function animate(
  animation: string,
  delay?: string,
  duration?: string,
  iteration?: string
): string {
  return cn(
    `animate-${animation}`,
    delay && `animation-delay-${delay}`,
    duration && `animation-duration-${duration}`,
    iteration && `animation-iteration-${iteration}`
  )
}

// ==========================================================================
// 主题工具函数
// ==========================================================================

/**
 * 创建深色模式样式
 */
export function darkMode(lightStyle: string, darkStyle: string): string {
  return cn(lightStyle, `dark:${darkStyle}`)
}

/**
 * 创建主题变体样式
 */
export function themeVariant(
  theme: 'light' | 'dark' | 'auto',
  styles: {
    light: string
    dark: string
    auto?: string
  }
): string {
  switch (theme) {
    case 'light':
      return styles.light
    case 'dark':
      return styles.dark
    case 'auto':
      return styles.auto || cn(styles.light, `dark:${styles.dark}`)
    default:
      return ''
  }
}
