/**
 * 响应式设计工具和配置
 * 移动端优先的设计方案
 */

import { cn } from './styles'

// 断点定义
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const

// 设备类型检测
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  
  if (width < breakpoints.sm) return 'mobile'
  if (width < breakpoints.lg) return 'tablet'
  return 'desktop'
}

// 触摸设备检测
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  )
}

// 移动端检测
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// iOS设备检测
export const isIOS = () => {
  if (typeof window === 'undefined') return false
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

// Android设备检测
export const isAndroid = () => {
  if (typeof window === 'undefined') return false
  
  return /Android/.test(navigator.userAgent)
}

// 响应式容器类
export const responsiveContainer = {
  // 基础容器
  base: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
  
  // 不同尺寸的容器
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
  
  // 组合容器类
  content: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8',
}

// 响应式网格系统
export const responsiveGrid = {
  // 基础网格
  base: 'grid gap-4',
  
  // 列数配置
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-12',
  },
  
  // 间距配置
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
}

// 响应式弹性布局
export const responsiveFlex = {
  // 基础弹性布局
  base: 'flex',
  
  // 方向配置
  direction: {
    row: 'flex-row',
    col: 'flex-col',
    rowReverse: 'flex-row-reverse',
    colReverse: 'flex-col-reverse',
    responsive: 'flex-col sm:flex-row',
    responsiveReverse: 'flex-col-reverse sm:flex-row-reverse',
  },
  
  // 对齐配置
  align: {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  },
  
  // 分布配置
  justify: {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  
  // 换行配置
  wrap: {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    reverse: 'flex-wrap-reverse',
  },
}

// 响应式字体大小
export const responsiveText = {
  // 标题字体
  heading: {
    h1: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
    h2: 'text-2xl sm:text-3xl lg:text-4xl',
    h3: 'text-xl sm:text-2xl lg:text-3xl',
    h4: 'text-lg sm:text-xl lg:text-2xl',
    h5: 'text-base sm:text-lg lg:text-xl',
    h6: 'text-sm sm:text-base lg:text-lg',
  },
  
  // 正文字体
  body: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
  },
  
  // 特殊字体
  display: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
  lead: 'text-lg sm:text-xl lg:text-2xl',
  caption: 'text-xs sm:text-sm',
}

// 响应式间距
export const responsiveSpacing = {
  // 内边距
  padding: {
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12',
  },
  
  // 外边距
  margin: {
    xs: 'm-2 sm:m-3',
    sm: 'm-3 sm:m-4',
    md: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8',
    xl: 'm-8 sm:m-12',
  },
  
  // 垂直间距
  vertical: {
    xs: 'py-2 sm:py-3',
    sm: 'py-3 sm:py-4',
    md: 'py-4 sm:py-6',
    lg: 'py-6 sm:py-8',
    xl: 'py-8 sm:py-12',
  },
  
  // 水平间距
  horizontal: {
    xs: 'px-2 sm:px-3',
    sm: 'px-3 sm:px-4',
    md: 'px-4 sm:px-6',
    lg: 'px-6 sm:px-8',
    xl: 'px-8 sm:px-12',
  },
}

// 触摸友好的交互设计
export const touchFriendly = {
  // 最小触摸目标尺寸 (44px)
  minTarget: 'min-h-[44px] min-w-[44px]',
  
  // 按钮尺寸
  button: {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  },
  
  // 输入框尺寸
  input: {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-5 text-lg',
  },
  
  // 间距
  spacing: {
    tight: 'space-y-2',
    normal: 'space-y-4',
    loose: 'space-y-6',
  },
}

// 移动端表单优化
export const mobileForm = {
  // 表单容器
  container: cn(
    responsiveContainer.base,
    responsiveSpacing.padding.md,
    'max-w-md mx-auto'
  ),
  
  // 表单组
  group: 'space-y-4 sm:space-y-6',
  
  // 标签样式
  label: cn(
    responsiveText.body.base,
    'font-medium text-gray-700 mb-2 block'
  ),
  
  // 输入框样式
  input: cn(
    touchFriendly.input.md,
    'w-full border border-gray-300 rounded-lg',
    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'transition-colors duration-200'
  ),
  
  // 按钮组
  buttonGroup: cn(
    responsiveFlex.direction.responsive,
    responsiveFlex.justify.between,
    'gap-4 mt-8'
  ),
  
  // 主要按钮
  primaryButton: cn(
    touchFriendly.button.lg,
    'flex-1 bg-primary-600 text-white rounded-lg',
    'hover:bg-primary-700 focus:ring-2 focus:ring-primary-500',
    'transition-colors duration-200'
  ),
  
  // 次要按钮
  secondaryButton: cn(
    touchFriendly.button.lg,
    'flex-1 bg-gray-100 text-gray-700 rounded-lg',
    'hover:bg-gray-200 focus:ring-2 focus:ring-gray-500',
    'transition-colors duration-200'
  ),
}

// 图表响应式配置
export const responsiveChart = {
  // 容器
  container: 'w-full h-64 sm:h-80 lg:h-96',
  
  // 小屏幕优化
  mobile: {
    height: 'h-48',
    fontSize: 'text-xs',
    padding: 'p-2',
  },
  
  // 平板优化
  tablet: {
    height: 'h-64',
    fontSize: 'text-sm',
    padding: 'p-4',
  },
  
  // 桌面优化
  desktop: {
    height: 'h-80',
    fontSize: 'text-base',
    padding: 'p-6',
  },
}

// 导航响应式配置
export const responsiveNavigation = {
  // 桌面导航
  desktop: cn(
    'hidden lg:flex',
    responsiveFlex.align.center,
    'space-x-8'
  ),
  
  // 移动端导航
  mobile: cn(
    'lg:hidden',
    'fixed inset-x-0 top-0 z-50',
    'bg-white shadow-lg'
  ),
  
  // 汉堡菜单按钮
  hamburger: cn(
    touchFriendly.minTarget,
    'lg:hidden flex items-center justify-center',
    'text-gray-700 hover:text-gray-900'
  ),
  
  // 移动端菜单
  mobileMenu: cn(
    'absolute top-full left-0 right-0',
    'bg-white shadow-lg border-t',
    'py-4 space-y-2'
  ),
  
  // 导航链接
  link: cn(
    touchFriendly.minTarget,
    'flex items-center px-4 py-2',
    'text-gray-700 hover:text-primary-600',
    'transition-colors duration-200'
  ),
}

// 工具函数：获取响应式类名
export const getResponsiveClass = (
  base: string,
  responsive: Record<string, string>
) => {
  const classes = [base]
  
  Object.entries(responsive).forEach(([breakpoint, className]) => {
    if (breakpoint === 'base') {
      classes.unshift(className)
    } else {
      classes.push(`${breakpoint}:${className}`)
    }
  })
  
  return cn(...classes)
}

// 工具函数：根据设备类型获取类名
export const getDeviceClass = (
  mobile: string,
  tablet: string,
  desktop: string
) => {
  const deviceType = getDeviceType()
  
  switch (deviceType) {
    case 'mobile':
      return mobile
    case 'tablet':
      return tablet
    case 'desktop':
      return desktop
    default:
      return desktop
  }
}

// 导出所有配置
export {
  responsiveContainer,
  responsiveGrid,
  responsiveFlex,
  responsiveText,
  responsiveSpacing,
  touchFriendly,
  mobileForm,
  responsiveChart,
  responsiveNavigation,
}
