import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../store'

interface ThemeToggleProps {
  /** 显示模式 */
  variant?: 'button' | 'dropdown' | 'inline'
  /** 大小 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否显示标签 */
  showLabel?: boolean
  /** 自定义类名 */
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const { theme, isDarkMode, setTheme, toggleTheme } = useTheme()

  // 尺寸配置
  const sizeConfig = {
    sm: { icon: 'w-4 h-4', button: 'p-2', text: 'text-sm' },
    md: { icon: 'w-5 h-5', button: 'p-2.5', text: 'text-base' },
    lg: { icon: 'w-6 h-6', button: 'p-3', text: 'text-lg' }
  }

  const config = sizeConfig[size]

  // 主题选项
  const themeOptions = [
    {
      value: 'light' as const,
      label: '浅色模式',
      icon: Sun,
      description: '始终使用浅色主题'
    },
    {
      value: 'dark' as const,
      label: '深色模式',
      icon: Moon,
      description: '始终使用深色主题'
    },
    {
      value: 'system' as const,
      label: '跟随系统',
      icon: Monitor,
      description: '跟随系统设置'
    }
  ]

  // 获取当前主题图标
  const getCurrentIcon = () => {
    const currentOption = themeOptions.find(option => option.value === theme)
    const IconComponent = currentOption?.icon || Sun
    return <IconComponent className={config.icon} />
  }

  // 按钮模式
  if (variant === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`
          ${config.button} 
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          rounded-lg transition-colors duration-200
          flex items-center space-x-2
          ${className}
        `}
        title={`当前: ${themeOptions.find(opt => opt.value === theme)?.label}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentIcon()}
        </motion.div>
        {showLabel && (
          <span className={config.text}>
            {themeOptions.find(opt => opt.value === theme)?.label}
          </span>
        )}
      </motion.button>
    )
  }

  // 下拉菜单模式
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className={`
            ${config.button} ${config.text}
            bg-gray-100 dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            border border-gray-300 dark:border-gray-600
            rounded-lg focus:ring-2 focus:ring-blue-500
            appearance-none cursor-pointer
            pr-8
          `}
        >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {getCurrentIcon()}
        </div>
      </div>
    )
  }

  // 内联模式（单选按钮组）
  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {themeOptions.map((option) => {
          const IconComponent = option.icon
          const isActive = theme === option.value
          
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(option.value)}
              className={`
                ${config.button}
                rounded-lg transition-all duration-200
                flex items-center space-x-2
                ${isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
              title={option.description}
            >
              <IconComponent className={config.icon} />
              {showLabel && (
                <span className={config.text}>{option.label}</span>
              )}
            </motion.button>
          )
        })}
      </div>
    )
  }

  return null
}

export default ThemeToggle

// 简化的主题切换按钮
export const SimpleThemeToggle: React.FC<{ className?: string }> = ({ className }) => (
  <ThemeToggle variant="button" size="md" className={className} />
)

// 带标签的主题切换
export const LabeledThemeToggle: React.FC<{ className?: string }> = ({ className }) => (
  <ThemeToggle variant="button" size="md" showLabel={true} className={className} />
)

// 主题选择器
export const ThemeSelector: React.FC<{ className?: string }> = ({ className }) => (
  <ThemeToggle variant="inline" size="sm" showLabel={true} className={className} />
)
