import { FC, HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 卡片变体样式 */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  /** 内边距大小 */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** 是否可悬停 */
  hoverable?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 卡片内容 */
  children: ReactNode
}

const Card: FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200'

  const variants = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    outlined: 'border-2 border-gray-300',
    ghost: 'border-0 shadow-none bg-gray-50'
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const interactiveClasses = cn(
    hoverable && 'hover:shadow-md hover:-translate-y-1',
    clickable && 'cursor-pointer hover:shadow-lg active:scale-[0.98]'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
