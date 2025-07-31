import { FC } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

interface Step {
  /** 步骤ID */
  id: string
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  description?: string
  /** 是否可选步骤 */
  optional?: boolean
}

interface ProgressStepsProps {
  /** 步骤列表 */
  steps: Step[]
  /** 当前步骤索引（从0开始） */
  currentStep: number
  /** 已完成的步骤索引数组 */
  completedSteps?: number[]
  /** 点击步骤回调 */
  onStepClick?: (stepIndex: number) => void
  /** 是否显示步骤描述 */
  showDescription?: boolean
  /** 自定义样式类名 */
  className?: string
  /** 布局方向 */
  orientation?: 'horizontal' | 'vertical'
}

const ProgressSteps: FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  onStepClick,
  showDescription = true,
  className,
  orientation = 'horizontal'
}) => {
  const isStepCompleted = (stepIndex: number) => completedSteps.includes(stepIndex)
  const isStepCurrent = (stepIndex: number) => stepIndex === currentStep
  const isStepClickable = (stepIndex: number) => 
    onStepClick && (isStepCompleted(stepIndex) || stepIndex <= currentStep)

  const getStepStatus = (stepIndex: number) => {
    if (isStepCompleted(stepIndex)) return 'completed'
    if (isStepCurrent(stepIndex)) return 'current'
    if (stepIndex < currentStep) return 'completed'
    return 'upcoming'
  }

  const StepIndicator: FC<{ stepIndex: number; step: Step }> = ({ stepIndex, step }) => {
    const status = getStepStatus(stepIndex)
    const clickable = isStepClickable(stepIndex)

    const indicatorClasses = cn(
      'relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
      {
        'bg-blue-500 border-blue-500 text-white': status === 'completed' || status === 'current',
        'bg-white border-gray-300 text-gray-500': status === 'upcoming'
      },
      clickable && 'cursor-pointer hover:scale-110'
    )

    const handleClick = () => {
      if (clickable && onStepClick) {
        onStepClick(stepIndex)
      }
    }

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
        className={indicatorClasses}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : -1}
      >
        {status === 'completed' ? (
          <Check className="w-4 h-4" />
        ) : (
          <span className="text-sm font-medium">{stepIndex + 1}</span>
        )}

        {/* 当前步骤的脉冲效果 */}
        {status === 'current' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    )
  }

  const StepContent: FC<{ stepIndex: number; step: Step }> = ({ stepIndex, step }) => {
    const status = getStepStatus(stepIndex)
    
    return (
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h3 className={cn(
            'text-sm font-medium',
            status === 'current' ? 'text-blue-600' : 
            status === 'completed' ? 'text-gray-900' : 'text-gray-500'
          )}>
            {step.title}
            {step.optional && (
              <span className="ml-1 text-xs text-gray-400">(可选)</span>
            )}
          </h3>
        </div>
        
        {showDescription && step.description && (
          <p className={cn(
            'mt-1 text-xs',
            status === 'current' ? 'text-blue-500' : 'text-gray-400'
          )}>
            {step.description}
          </p>
        )}
      </div>
    )
  }

  const Connector: FC<{ isCompleted: boolean }> = ({ isCompleted }) => (
    <div className={cn(
      'flex-1 h-0.5 transition-colors duration-300',
      orientation === 'vertical' ? 'w-0.5 h-8 mx-auto' : 'mx-4',
      isCompleted ? 'bg-blue-500' : 'bg-gray-300'
    )} />
  )

  if (orientation === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <StepIndicator stepIndex={index} step={step} />
              {index < steps.length - 1 && (
                <Connector isCompleted={isStepCompleted(index)} />
              )}
            </div>
            <StepContent stepIndex={index} step={step} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex items-center space-x-3">
            <StepIndicator stepIndex={index} step={step} />
            <StepContent stepIndex={index} step={step} />
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex items-center mx-4">
              <Connector isCompleted={isStepCompleted(index)} />
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProgressSteps
