// 样式文件导出
// 这个文件用于集中管理所有样式相关的导入

// 导入自定义CSS文件
import './animations.css'
import './components.css'

// 导出样式相关的常量和工具
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060
} as const
