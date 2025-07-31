import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Calculator, Heart } from 'lucide-react'

interface LoadingSpinnerProps {
  /** 加载文本 */
  text?: string
  /** 大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** 类型 */
  variant?: 'spinner' | 'dots' | 'pulse' | 'calculator'
  /** 是否全屏 */
  fullScreen?: boolean
  /** 自定义类名 */
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = '加载中...',
  size = 'md',
  variant = 'spinner',
  fullScreen = false,
  className = ''
}) => {
  // 尺寸配置
  const sizeConfig = {
    sm: { icon: 'w-4 h-4', text: 'text-sm', container: 'p-2' },
    md: { icon: 'w-6 h-6', text: 'text-base', container: 'p-4' },
    lg: { icon: 'w-8 h-8', text: 'text-lg', container: 'p-6' },
    xl: { icon: 'w-12 h-12', text: 'text-xl', container: 'p-8' }
  }

  const config = sizeConfig[size]

  // 渲染不同类型的加载动画
  const renderLoadingAnimation = () => {
    switch (variant) {
      case 'spinner':
        return (
          <Loader2 className={`${config.icon} animate-spin text-blue-600 dark:text-blue-400`} />
        )

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <motion.div
            className={`${config.icon} bg-blue-600 dark:bg-blue-400 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
        )

      case 'calculator':
        return (
          <div className="relative">
            <Calculator className={`${config.icon} text-blue-600 dark:text-blue-400`} />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-3 h-3 text-pink-500" />
            </motion.div>
          </div>
        )

      default:
        return (
          <Loader2 className={`${config.icon} animate-spin text-blue-600 dark:text-blue-400`} />
        )
    }
  }

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center ${config.container} ${className}`}
    >
      <div className="mb-3">
        {renderLoadingAnimation()}
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${config.text} text-gray-600 dark:text-gray-400 font-medium text-center`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          {content}
        </div>
      </div>
    )
  }

  return content
}

export default LoadingSpinner

// 页面级加载组件
export const PageLoading: React.FC<{ text?: string }> = ({ text = '页面加载中...' }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <LoadingSpinner
      text={text}
      size="lg"
      variant="calculator"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    />
  </div>
)

// 内容加载组件
export const ContentLoading: React.FC<{ text?: string }> = ({ text = '内容加载中...' }) => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner
      text={text}
      size="md"
      variant="dots"
    />
  </div>
)

// 按钮加载组件
export const ButtonLoading: React.FC = () => (
  <LoadingSpinner
    size="sm"
    variant="spinner"
    className="px-2"
  />
)

// 卡片加载骨架
export const CardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
)

// 表格加载骨架
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="animate-pulse space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
      </div>
    ))}
  </div>
)
