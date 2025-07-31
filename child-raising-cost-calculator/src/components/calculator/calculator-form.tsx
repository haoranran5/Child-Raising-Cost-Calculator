'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Calculator, DollarSign, MapPin, GraduationCap, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorFormData, CityTier, EducationType, HealthcareLevel } from '@/types'

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormData) => void
  loading?: boolean
}

const cityOptions = [
  { value: 'tier1' as CityTier, label: '一线城市', description: '北京、上海、广州、深圳等' },
  { value: 'tier2' as CityTier, label: '二线城市', description: '杭州、南京、武汉、成都等' },
  { value: 'tier3' as CityTier, label: '三线及以下城市', description: '其他城市' },
]

const educationOptions = [
  { value: 'public' as EducationType, label: '公立教育', description: '公立学校，费用较低' },
  { value: 'private' as EducationType, label: '私立教育', description: '私立学校，费用中等' },
  { value: 'international' as EducationType, label: '国际教育', description: '国际学校，费用较高' },
]

const healthcareOptions = [
  { value: 'basic' as HealthcareLevel, label: '基础医疗', description: '基本医疗保障' },
  { value: 'premium' as HealthcareLevel, label: '高端医疗', description: '高端医疗服务' },
]

export function CalculatorForm({ onSubmit, loading = false }: CalculatorFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<CalculatorFormData>({
    defaultValues: {
      monthlyIncome: 20000,
      childAge: 5,
      location: 'tier2',
      educationLevel: 'public',
      healthcareLevel: 'basic',
      extracurricular: true,
    }
  })

  const watchedValues = watch()

  const steps = [
    {
      title: '基本信息',
      icon: Calculator,
      fields: ['monthlyIncome', 'childAge']
    },
    {
      title: '地区选择',
      icon: MapPin,
      fields: ['location']
    },
    {
      title: '教育医疗',
      icon: GraduationCap,
      fields: ['educationLevel', 'healthcareLevel']
    },
    {
      title: '其他选项',
      icon: Zap,
      fields: ['extracurricular']
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onFormSubmit = (data: CalculatorFormData) => {
    onSubmit(data)
  }

  return (
    <div className="space-y-6">
      {/* 步骤指示器 */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
              ${index <= currentStep 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'border-muted-foreground text-muted-foreground'
              }
            `}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="ml-3 hidden sm:block">
              <div className={`text-sm font-medium ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                index < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* 步骤 0: 基本信息 */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  基本信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    家庭月收入 (元)
                  </label>
                  <input
                    type="number"
                    {...register('monthlyIncome', { 
                      required: '请输入家庭月收入',
                      min: { value: 1000, message: '月收入不能少于1000元' },
                      max: { value: 1000000, message: '月收入不能超过100万元' }
                    })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="请输入家庭月收入"
                  />
                  {errors.monthlyIncome && (
                    <p className="text-sm text-destructive mt-1">{errors.monthlyIncome.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    孩子年龄 (岁)
                  </label>
                  <input
                    type="number"
                    {...register('childAge', { 
                      required: '请输入孩子年龄',
                      min: { value: 0, message: '年龄不能小于0岁' },
                      max: { value: 18, message: '年龄不能大于18岁' }
                    })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="请输入孩子年龄"
                  />
                  {errors.childAge && (
                    <p className="text-sm text-destructive mt-1">{errors.childAge.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 步骤 1: 地区选择 */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  所在地区
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {cityOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`
                        flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                        ${watchedValues.location === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-input hover:border-primary/50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        {...register('location', { required: '请选择所在地区' })}
                        value={option.value}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                      <div className={`
                        w-4 h-4 rounded-full border-2 transition-colors
                        ${watchedValues.location === option.value 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                        }
                      `} />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 步骤 2: 教育医疗 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                    教育选择
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {educationOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`
                          flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                          ${watchedValues.educationLevel === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-input hover:border-primary/50'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          {...register('educationLevel')}
                          value={option.value}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-colors
                          ${watchedValues.educationLevel === option.value 
                            ? 'border-primary bg-primary' 
                            : 'border-muted-foreground'
                          }
                        `} />
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    医疗水平
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {healthcareOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`
                          flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                          ${watchedValues.healthcareLevel === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-input hover:border-primary/50'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          {...register('healthcareLevel')}
                          value={option.value}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-colors
                          ${watchedValues.healthcareLevel === option.value 
                            ? 'border-primary bg-primary' 
                            : 'border-muted-foreground'
                          }
                        `} />
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 步骤 3: 其他选项 */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  其他选项
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('extracurricular')}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium">参加课外活动</div>
                    <div className="text-sm text-muted-foreground">
                      包括兴趣班、培训班、体育活动等
                    </div>
                  </div>
                </label>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* 导航按钮 */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            上一步
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              下一步
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? '计算中...' : '开始计算'}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
