/**
 * 动画组件库
 * 提供常用的动画组件和HOC
 */

import React, { forwardRef, ReactNode, useState, useEffect, ComponentProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// 定义 Motion 组件的属性类型
type MotionDivProps = ComponentProps<typeof motion.div>
type MotionButtonProps = ComponentProps<typeof motion.button>
import {
  pageVariants,
  stepVariants,
  cardHoverVariants,
  buttonVariants,
  loadingVariants,
  fadeVariants,
  slideUpVariants,
  scaleVariants,
  containerVariants,
  listItemVariants,
  modalVariants,
  backdropVariants,
  spinVariants,
  pulseVariants,
} from '../../utils/animations'

// 页面容器动画
interface AnimatedPageProps extends MotionDivProps {
  children: ReactNode
}

export const AnimatedPage = forwardRef<HTMLDivElement, AnimatedPageProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  )
)

AnimatedPage.displayName = 'AnimatedPage'

// 表单步骤动画
interface AnimatedStepProps extends MotionDivProps {
  children: ReactNode
  stepKey: string | number
}

export const AnimatedStep = forwardRef<HTMLDivElement, AnimatedStepProps>(
  ({ children, stepKey, ...props }, ref) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        ref={ref}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
)

AnimatedStep.displayName = 'AnimatedStep'

// 卡片悬停动画
interface AnimatedCardProps extends MotionDivProps {
  children: ReactNode
  enableHover?: boolean
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, enableHover = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={enableHover ? cardHoverVariants : undefined}
      initial="rest"
      whileHover={enableHover ? "hover" : undefined}
      whileTap={enableHover ? "tap" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
)

AnimatedCard.displayName = 'AnimatedCard'

// 按钮动画
interface AnimatedButtonProps extends MotionButtonProps {
  children: ReactNode
  enableAnimation?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, enableAnimation = true, ...props }, ref) => (
    <motion.button
      ref={ref}
      variants={enableAnimation ? buttonVariants : undefined}
      initial="rest"
      whileHover={enableAnimation ? "hover" : undefined}
      whileTap={enableAnimation ? "tap" : undefined}
      {...props}
    >
      {children}
    </motion.button>
  )
)

AnimatedButton.displayName = 'AnimatedButton'

// 数字计数动画组件
interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  formatter?: (value: number) => string
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 2000,
  className,
  prefix = '',
  suffix = '',
  formatter = (val) => val.toLocaleString(),
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(value * easeOutQuart))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <motion.span
      className={className}
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
    >
      {prefix}{formatter(displayValue)}{suffix}
    </motion.span>
  )
}

// 加载动画组件
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full ${className}`}
      variants={spinVariants}
      animate="spin"
    />
  )
}

// 脉冲加载动画
interface LoadingDotsProps {
  className?: string
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-primary-600 rounded-full"
          variants={pulseVariants}
          animate="pulse"
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

// 列表动画容器
interface AnimatedListProps {
  children: ReactNode
  className?: string
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {children}
  </motion.div>
)

// 列表项动画
interface AnimatedListItemProps extends MotionDivProps {
  children: ReactNode
  index?: number
}

export const AnimatedListItem = forwardRef<HTMLDivElement, AnimatedListItemProps>(
  ({ children, index = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={listItemVariants}
      custom={index}
      {...props}
    >
      {children}
    </motion.div>
  )
)

AnimatedListItem.displayName = 'AnimatedListItem'

// 模态框动画
interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* 背景遮罩 */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />
        
        {/* 模态框内容 */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className={`bg-white rounded-lg shadow-xl max-w-md w-full ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
)

// 淡入动画组件
interface FadeInProps extends MotionDivProps {
  children: ReactNode
  delay?: number
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
)

FadeIn.displayName = 'FadeIn'

// 滑入动画组件
interface SlideUpProps extends MotionDivProps {
  children: ReactNode
  delay?: number
}

export const SlideUp = forwardRef<HTMLDivElement, SlideUpProps>(
  ({ children, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
)

SlideUp.displayName = 'SlideUp'

// 缩放动画组件
interface ScaleInProps extends MotionDivProps {
  children: ReactNode
  delay?: number
}

export const ScaleIn = forwardRef<HTMLDivElement, ScaleInProps>(
  ({ children, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
)

ScaleIn.displayName = 'ScaleIn'

// 视口进入动画HOC
interface InViewAnimationProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn'
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

export const InViewAnimation: React.FC<InViewAnimationProps> = ({
  children,
  animation = 'fadeIn',
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  })

  const variants = {
    fadeIn: fadeVariants,
    slideUp: slideUpVariants,
    scaleIn: scaleVariants,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[animation]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

// 页面过渡动画HOC
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={className}
    variants={loadingVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
)

// 所有组件已经单独导出，无需重复导出
