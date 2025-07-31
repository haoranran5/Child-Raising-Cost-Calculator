/**
 * Framer Motion动画配置
 * 兼容所有版本，不依赖外部类型导出
 */

// 检测用户是否偏好减少动画
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 基础过渡配置
export const transitions = {
  fast: { duration: 0.2, ease: 'easeOut' },
  normal: { duration: 0.3, ease: 'easeInOut' },
  slow: { duration: 0.5, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
}

// 获取适配减动画偏好的过渡
export const getTransition = (transition: any) => {
  if (prefersReducedMotion()) {
    return { duration: 0.01, ease: 'linear' }
  }
  return transition
}

// 页面进入退出动画
export const pageVariants = {
  initial: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : 20,
    scale: prefersReducedMotion() ? 1 : 0.98,
  },
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: getTransition(transitions.normal),
  },
  exit: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -20,
    scale: prefersReducedMotion() ? 1 : 0.98,
    transition: getTransition(transitions.fast),
  },
}

// 表单步骤切换动画
export const stepVariants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getTransition(transitions.normal),
  },
  exit: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -50,
    transition: getTransition(transitions.fast),
  },
}

// 卡片悬停效果
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    transition: getTransition(transitions.fast),
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.02,
    y: prefersReducedMotion() ? 0 : -2,
    transition: getTransition(transitions.normal),
  },
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.98,
    transition: getTransition({ duration: 0.1 }),
  },
}

// 数字增长动画
export const numberCountVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: getTransition(transitions.spring),
  },
}

// 图表出现动画
export const chartVariants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.8,
    y: prefersReducedMotion() ? 0 : 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: getTransition({
      duration: 0.6,
      ease: 'easeOut',
    }),
  },
}

// 按钮点击反馈
export const buttonVariants = {
  rest: {
    scale: 1,
    transition: getTransition(transitions.fast),
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.05,
    transition: getTransition(transitions.fast),
  },
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.95,
    transition: getTransition({ duration: 0.1 }),
  },
}

// 加载状态动画
export const loadingVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: getTransition(transitions.fast),
  },
  exit: {
    opacity: 0,
    transition: getTransition(transitions.fast),
  },
}

// 脉冲动画（用于加载指示器）
export const pulseVariants = {
  pulse: {
    scale: prefersReducedMotion() ? 1 : [1, 1.1, 1],
    opacity: prefersReducedMotion() ? 1 : [1, 0.8, 1],
    transition: {
      duration: prefersReducedMotion() ? 0 : 1.5,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      ease: 'easeInOut',
    },
  },
}

// 旋转动画（用于加载spinner）
export const spinVariants = {
  spin: {
    rotate: prefersReducedMotion() ? 0 : 360,
    transition: {
      duration: prefersReducedMotion() ? 0 : 1,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      ease: 'linear',
    },
  },
}

// 列表项动画
export const listItemVariants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -20,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: getTransition({
      delay: prefersReducedMotion() ? 0 : index * 0.1,
      duration: 0.3,
    }),
  }),
}

// 容器动画（用于stagger children）
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
      delayChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
}

// 模态框动画
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.8,
    y: prefersReducedMotion() ? 0 : 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: getTransition({
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }),
  },
  exit: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.8,
    y: prefersReducedMotion() ? 0 : 20,
    transition: getTransition(transitions.fast),
  },
}

// 背景遮罩动画
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: getTransition(transitions.fast),
  },
  exit: {
    opacity: 0,
    transition: getTransition(transitions.fast),
  },
}

// 滑动动画
export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? (prefersReducedMotion() ? 0 : 1000) : (prefersReducedMotion() ? 0 : -1000),
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: getTransition(transitions.normal),
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? (prefersReducedMotion() ? 0 : 1000) : (prefersReducedMotion() ? 0 : -1000),
    opacity: 0,
    transition: getTransition(transitions.normal),
  }),
}

// 淡入淡出动画
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: getTransition(transitions.normal),
  },
  exit: {
    opacity: 0,
    transition: getTransition(transitions.fast),
  },
}

// 从下方滑入动画
export const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition(transitions.normal),
  },
}

// 从上方滑入动画
export const slideDownVariants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition(transitions.normal),
  },
}

// 缩放动画
export const scaleVariants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: getTransition(transitions.normal),
  },
}

// 数字计数动画Hook
export const useCountAnimation = (target: number, duration: number = 2000) => {
  if (typeof window === 'undefined') return target
  
  let count = 0
  const increment = target / (duration / 16) // 60fps
  
  const animate = () => {
    count += increment
    if (count < target) {
      requestAnimationFrame(animate)
    } else {
      count = target
    }
  }
  
  if (!prefersReducedMotion()) {
    requestAnimationFrame(animate)
  } else {
    count = target
  }
  
  return count
}
