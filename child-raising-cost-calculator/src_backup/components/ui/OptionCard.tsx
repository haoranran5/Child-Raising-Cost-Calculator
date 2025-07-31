import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

interface OptionCardProps {
  /** 选项标题 */
  title: string
  /** 选项描述 */
  description?: string
  /** 选项图标 */
  icon?: ReactNode
  /** 是否选中 */
  selected?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 点击回调 */
  onClick?: () => void
  /** 自定义样式类名 */
  className?: string
  /** 选项值（用于表单） */
  value?: string
  /** 额外信息（如价格、标签等） */
  extra?: ReactNode
}

const OptionCard: FC<OptionCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  disabled = false,
  onClick,
  className,
  extra,
  ...props
}) => {
  const baseClasses = cn(
    'relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    selected 
      ? 'border-blue-500 bg-blue-50 shadow-md' 
      : 'border-gray-200 bg-white hover:border-gray-300',
    disabled && 'opacity-50 cursor-not-allowed hover:border-gray-200 hover:shadow-none'
  )

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(baseClasses, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-pressed={selected}
      aria-disabled={disabled}
      {...props}
    >
      {/* 选中状态指示器 */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      <div className="flex items-start space-x-3">
        {/* 图标 */}
        {icon && (
          <div className={cn(
            'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg',
            selected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          )}>
            {icon}
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              'font-medium text-sm',
              selected ? 'text-blue-900' : 'text-gray-900'
            )}>
              {title}
            </h3>
            {extra && (
              <div className="ml-2 flex-shrink-0">
                {extra}
              </div>
            )}
          </div>
          
          {description && (
            <p className={cn(
              'mt-1 text-sm',
              selected ? 'text-blue-700' : 'text-gray-500'
            )}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* 悬停效果边框 */}
      <div className={cn(
        'absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-200',
        !disabled && 'hover:border-blue-200'
      )} />
    </motion.div>
  )
}

export default OptionCard
