import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, RotateCcw } from 'lucide-react'
import { StepForm } from '../components/forms'
import { Button, Card } from '../components/ui'
import { calculateCompleteChildCost } from '../utils/calculator'
import { useCalculation, useNavigation } from '../store'
import type { UserInput, CalculationResult } from '../types'
import {
  cn,
  buttonVariants,
  buttonSizes,
  cardVariants,
  container,
  flex
} from '../utils/styles'

interface CalculatorPageProps {
  /** 返回首页回调（可选，优先使用路由导航） */
  onBack?: () => void
  /** 进入结果页回调（可选，优先使用路由导航） */
  onComplete?: (userInput: UserInput, result: CalculationResult) => void
  /** 初始数据 */
  initialData?: Partial<UserInput>
}

// localStorage键名
const STORAGE_KEY = 'child-cost-calculator-data'
const PROGRESS_KEY = 'child-cost-calculator-progress'

const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onBack,
  onComplete,
  initialData
}) => {
  const navigate = useNavigate()
  const { userInput, setUserInput, setCalculationResult, setCalculating } = useCalculation()
  const { currentStep, setCurrentStep } = useNavigation()

  const [isCalculating, setIsCalculating] = useState(false)
  const [savedData, setSavedData] = useState<Partial<UserInput> | null>(null)
  const [showSaveNotification, setShowSaveNotification] = useState(false)

  // 页面进入动画
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  // 加载保存的数据
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedData = JSON.parse(saved)
        setSavedData(parsedData)
      }
    } catch (error) {
      console.error('Failed to load saved data:', error)
    }
  }, [])

  // 保存数据到localStorage
  const saveToLocalStorage = useCallback((data: Partial<UserInput>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      localStorage.setItem(PROGRESS_KEY, new Date().toISOString())
      setSavedData(data)
      
      // 显示保存通知
      setShowSaveNotification(true)
      setTimeout(() => setShowSaveNotification(false), 2000)
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }, [])

  // 清除保存的数据
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(PROGRESS_KEY)
      setSavedData(null)
    } catch (error) {
      console.error('Failed to clear saved data:', error)
    }
  }, [])

  // 处理返回首页
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/')
    }
  }

  // 处理表单提交
  const handleFormSubmit = useCallback(async (data: UserInput) => {
    setIsCalculating(true)
    setCalculating(true)

    try {
      // 保存用户输入到全局状态
      setUserInput(data)

      // 模拟计算延迟
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 执行计算
      const result = calculateCompleteChildCost(data)

      // 保存计算结果到全局状态
      setCalculationResult(result)

      // 清除保存的数据
      clearSavedData()

      // 进入结果页
      if (onComplete) {
        onComplete(data, result)
      } else {
        navigate('/results')
      }
    } catch (error) {
      console.error('Calculation failed:', error)
      setCalculating(false)
      // 这里可以添加错误处理
    } finally {
      setIsCalculating(false)
    }
  }, [onComplete, clearSavedData, navigate, setUserInput, setCalculationResult, setCalculating])

  // 获取初始数据（优先使用传入的初始数据，其次使用保存的数据）
  const getInitialData = useCallback((): Partial<UserInput> => {
    return {
      ...savedData,
      ...initialData
    }
  }, [savedData, initialData])

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50"
    >
      {/* 顶部导航栏 */}
      <div className="bg-background shadow-sm border-b border-border">
        <div className={container({ padding: true }) + ' py-4'}>
          <div className={flex({ align: 'center', justify: 'between' })}>
            <div className={flex({ align: 'center', gap: 4 })}>
              <button
                onClick={handleBack}
                className={cn(
                  buttonVariants.ghost,
                  buttonSizes.md,
                  flex({ align: 'center', gap: 2 })
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </button>

              <div className="h-6 w-px bg-border" />

              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  养娃成本计算
                </h1>
                <p className="text-sm text-muted-foreground">
                  填写信息，获取个性化分析报告
                </p>
              </div>
            </div>

            <div className={flex({ align: 'center', gap: 3 })}>
              {/* 保存通知 */}
              <AnimatePresence>
                {showSaveNotification && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      flex({ align: 'center', gap: 2 }),
                      'bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm'
                    )}
                  >
                    <Save className="w-4 h-4" />
                    <span>已自动保存</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 重置按钮 */}
              {savedData && (
                <button
                  onClick={clearSavedData}
                  className={cn(
                    buttonVariants.ghost,
                    buttonSizes.sm,
                    flex({ align: 'center', gap: 2 })
                  )}
                >
                  <RotateCcw className="w-4 h-4" />
                  重新开始
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className={container({ padding: true }) + ' py-8'}>
        {/* 恢复数据提示 */}
        {savedData && !initialData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Save className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">
                      发现未完成的计算
                    </h3>
                    <p className="text-sm text-blue-700">
                      我们为您保存了上次填写的信息，您可以继续完成计算
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSavedData}
                  className="text-blue-600 hover:text-blue-700"
                >
                  重新开始
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 表单组件 */}
        <StepForm
          onSubmit={handleFormSubmit}
          initialData={getInitialData()}
          showPreview={true}
          onDataChange={saveToLocalStorage}
        />

        {/* 计算中遮罩 */}
        <AnimatePresence>
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl p-8 max-w-md mx-4 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  正在计算中...
                </h3>
                <p className="text-gray-600 mb-4">
                  我们正在根据您的信息进行精确计算，请稍候
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>分析城市成本系数</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                    <span>计算教育费用影响</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
                    <span>生成个性化建议</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部帮助信息 */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">数据安全</h4>
              <p className="text-sm text-gray-600">
                您的数据仅用于计算，不会被存储或分享
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">自动保存</h4>
              <p className="text-sm text-gray-600">
                填写过程中会自动保存，避免数据丢失
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">专业算法</h4>
              <p className="text-sm text-gray-600">
                基于大数据和统计模型，确保结果准确性
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CalculatorPage
