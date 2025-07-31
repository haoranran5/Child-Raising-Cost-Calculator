import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button, Card } from './ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // 调用外部错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // 发送错误报告到监控服务（如果需要）
    this.reportError(error, errorInfo)
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // 这里可以集成错误监控服务，如 Sentry
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId
    }

    // 示例：发送到监控服务
    // sendToErrorService(errorReport)
    
    // 开发环境下打印详细错误信息
    if (process.env.NODE_ENV === 'development') {
      console.group('🐛 Error Boundary Report')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Error Report:', errorReport)
      console.groupEnd()
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  哎呀，出现了一些问题
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  应用遇到了意外错误，我们正在努力修复这个问题
                </p>
              </div>

              {/* 错误详情（仅开发环境） */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left"
                >
                  <div className="flex items-center mb-2">
                    <Bug className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      开发调试信息
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                    <div>
                      <strong>错误ID:</strong> {this.state.errorId}
                    </div>
                    <div>
                      <strong>错误信息:</strong> {this.state.error.message}
                    </div>
                    {this.state.error.stack && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                          查看错误堆栈
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded text-xs overflow-auto">
                          {this.state.error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </motion.div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleRetry}
                  leftIcon={<RefreshCw />}
                  className="flex-1 sm:flex-none"
                >
                  重试
                </Button>
                <Button
                  variant="secondary"
                  onClick={this.handleGoHome}
                  leftIcon={<Home />}
                  className="flex-1 sm:flex-none"
                >
                  返回首页
                </Button>
                <Button
                  variant="ghost"
                  onClick={this.handleReload}
                  className="flex-1 sm:flex-none"
                >
                  刷新页面
                </Button>
              </div>

              {/* 帮助信息 */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  如果问题持续存在，请尝试：
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                  <li>• 清除浏览器缓存和Cookie</li>
                  <li>• 使用无痕模式访问</li>
                  <li>• 检查网络连接</li>
                  <li>• 联系技术支持</li>
                </ul>
              </div>

              {/* 错误ID（用户可以提供给技术支持） */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  错误ID: <code className="font-mono">{this.state.errorId}</code>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  如需技术支持，请提供此错误ID
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// 简化版错误边界（用于小组件）
export const SimpleErrorBoundary: React.FC<{
  children: ReactNode
  fallback?: ReactNode
}> = ({ children, fallback }) => {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-sm text-red-700 dark:text-red-300">
                组件加载失败
              </span>
            </div>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  )
}
