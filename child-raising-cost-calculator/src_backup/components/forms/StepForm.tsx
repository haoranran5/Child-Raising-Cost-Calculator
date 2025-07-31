import { useState, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UserInput } from '../../types'
import { Button, Card, ProgressSteps } from '../ui'
import CitySelection from './CitySelection'
import FamilyInfo from './FamilyInfo'
import EducationChoice from './EducationChoice'
import ResultPreview from './ResultPreview'

interface StepFormProps {
  /** 表单提交回调 */
  onSubmit: (data: UserInput) => void
  /** 初始数据 */
  initialData?: Partial<UserInput>
  /** 是否显示预览步骤 */
  showPreview?: boolean
  /** 数据变化回调（用于自动保存） */
  onDataChange?: (data: Partial<UserInput>) => void
}

// 表单步骤定义
const FORM_STEPS = [
  {
    id: 'city',
    title: '城市选择',
    description: '选择您所在的城市类型',
    component: CitySelection
  },
  {
    id: 'family',
    title: '家庭信息',
    description: '填写收入、住房等基本信息',
    component: FamilyInfo
  },
  {
    id: 'education',
    title: '教育偏好',
    description: '选择教育类型和培训态度',
    component: EducationChoice
  },
  {
    id: 'preview',
    title: '确认信息',
    description: '预览您的选择并提交',
    component: ResultPreview,
    optional: true
  }
]

// 页面切换动画配置
const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

const StepForm: React.FC<StepFormProps> = ({
  onSubmit,
  initialData = {},
  showPreview = true,
  onDataChange
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // 根据是否显示预览调整步骤
  const steps = showPreview ? FORM_STEPS : FORM_STEPS.slice(0, -1)

  // 初始化表单
  const methods = useForm<UserInput>({
    defaultValues: {
      cityTier: 'tier2',
      incomeLevel: 'middle',
      housingType: 'owned',
      familySupport: 'moderate',
      educationType: 'public',
      trainingAttitude: 'normal',
      childAge: 5,
      considerInflation: true,
      ...initialData
    },
    mode: 'onChange'
  })

  const { handleSubmit, trigger, getValues, watch, formState: { isValid } } = methods

  // 监听表单数据变化，用于自动保存
  const watchedData = watch()
  useEffect(() => {
    if (onDataChange) {
      onDataChange(watchedData)
    }
  }, [watchedData, onDataChange])

  // 验证当前步骤
  const validateCurrentStep = useCallback(async () => {
    const stepFields = getStepFields(currentStep)
    if (stepFields.length === 0) return true
    
    const result = await trigger(stepFields)
    return result
  }, [currentStep, trigger])

  // 获取步骤对应的字段
  const getStepFields = (stepIndex: number): (keyof UserInput)[] => {
    switch (stepIndex) {
      case 0: // 城市选择
        return ['cityTier']
      case 1: // 家庭信息
        return ['incomeLevel', 'housingType', 'familySupport', 'childAge']
      case 2: // 教育偏好
        return ['educationType', 'trainingAttitude']
      default:
        return []
    }
  }

  // 下一步
  const handleNext = useCallback(async () => {
    const isStepValid = await validateCurrentStep()
    
    if (isStepValid) {
      // 标记当前步骤为完成
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep])
      }
      
      // 移动到下一步
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }, [currentStep, steps.length, validateCurrentStep, completedSteps])

  // 上一步
  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  // 跳转到指定步骤
  const handleStepClick = useCallback(async (stepIndex: number) => {
    // 只允许跳转到已完成的步骤或下一步
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex)
    }
  }, [currentStep, completedSteps])

  // 表单提交
  const handleFormSubmit = useCallback((data: UserInput) => {
    onSubmit(data)
  }, [onSubmit])

  // 渲染当前步骤组件
  const renderCurrentStep = () => {
    const StepComponent = steps[currentStep].component
    return (
      <motion.div
        key={currentStep}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        <StepComponent />
      </motion.div>
    )
  }

  // 检查是否可以进行下一步
  const canProceed = () => {
    if (currentStep === steps.length - 1) {
      return isValid // 最后一步需要整个表单有效
    }
    return true // 其他步骤在handleNext中验证
  }

  // 检查是否是最后一步
  const isLastStep = currentStep === steps.length - 1

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 进度指示器 */}
        <Card>
          <ProgressSteps
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
            orientation="horizontal"
            showDescription={true}
          />
        </Card>

        {/* 表单内容 */}
        <Card className="min-h-[500px]">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* 步骤标题 */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 mt-1">
                {steps[currentStep].description}
              </p>
            </div>

            {/* 步骤内容 */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                {renderCurrentStep()}
              </AnimatePresence>
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                leftIcon={<ChevronLeft />}
              >
                上一步
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>

              {isLastStep ? (
                <Button
                  type="submit"
                  disabled={!canProceed()}
                  rightIcon={<ChevronRight />}
                >
                  完成计算
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  rightIcon={<ChevronRight />}
                >
                  下一步
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* 表单数据预览（开发模式） */}
        {process.env.NODE_ENV === 'development' && (
          <Card variant="ghost" className="mt-4">
            <details>
              <summary className="cursor-pointer text-sm text-gray-500">
                表单数据预览 (开发模式)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(getValues(), null, 2)}
              </pre>
            </details>
          </Card>
        )}
      </div>
    </FormProvider>
  )
}

export default StepForm
