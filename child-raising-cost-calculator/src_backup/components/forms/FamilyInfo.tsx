import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Home, 
  Users, 
  Baby,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { UserInput } from '../../types'
import { OptionCard, Card } from '../ui'

// 收入水平选项
const INCOME_OPTIONS = [
  {
    value: 'low' as const,
    title: '较低收入',
    description: '家庭月收入 < 8,000元',
    range: '< 8K',
    impact: '注重性价比，基础需求为主',
    color: 'red'
  },
  {
    value: 'lower-middle' as const,
    title: '中低收入',
    description: '家庭月收入 8,000-15,000元',
    range: '8K-15K',
    impact: '适度投入，平衡质量与成本',
    color: 'orange'
  },
  {
    value: 'middle' as const,
    title: '中等收入',
    description: '家庭月收入 15,000-25,000元',
    range: '15K-25K',
    impact: '较好的教育和生活品质',
    color: 'blue'
  },
  {
    value: 'upper-middle' as const,
    title: '中高收入',
    description: '家庭月收入 25,000-50,000元',
    range: '25K-50K',
    impact: '追求优质教育和生活',
    color: 'purple'
  },
  {
    value: 'high' as const,
    title: '高收入',
    description: '家庭月收入 > 50,000元',
    range: '> 50K',
    impact: '高端教育和生活方式',
    color: 'green'
  }
]

// 住房情况选项
const HOUSING_OPTIONS = [
  {
    value: 'rental' as const,
    title: '租房',
    description: '租赁住房，需承担房租',
    icon: <Home className="w-5 h-5" />,
    impact: '增加住房成本',
    multiplier: '+20%'
  },
  {
    value: 'owned' as const,
    title: '自有住房',
    description: '拥有住房，无房租压力',
    icon: <Home className="w-5 h-5" />,
    impact: '住房成本较低',
    multiplier: '基准'
  },
  {
    value: 'school-district' as const,
    title: '学区房',
    description: '为教育购买的学区房',
    icon: <Home className="w-5 h-5" />,
    impact: '教育便利，成本较高',
    multiplier: '+15%'
  }
]

// 家庭支持选项
const FAMILY_SUPPORT_OPTIONS = [
  {
    value: 'minimal' as const,
    title: '很少支持',
    description: '主要靠自己，偶尔有帮助',
    icon: <Users className="w-5 h-5" />,
    impact: '成本较高',
    multiplier: '+15%'
  },
  {
    value: 'moderate' as const,
    title: '适度支持',
    description: '家庭偶尔提供帮助',
    icon: <Users className="w-5 h-5" />,
    impact: '成本适中',
    multiplier: '基准'
  },
  {
    value: 'significant' as const,
    title: '较多支持',
    description: '家庭经常提供帮助',
    icon: <Users className="w-5 h-5" />,
    impact: '成本较低',
    multiplier: '-20%'
  }
]

const FamilyInfo: React.FC = () => {
  const { watch, setValue, register, formState: { errors } } = useFormContext<UserInput>()
  
  const incomeLevel = watch('incomeLevel')
  const housingType = watch('housingType')
  const familySupport = watch('familySupport')
  const childAge = watch('childAge')
  const customIncome = watch('customIncome')

  const handleIncomeSelect = (income: UserInput['incomeLevel']) => {
    setValue('incomeLevel', income, { shouldValidate: true })
  }

  const handleHousingSelect = (housing: UserInput['housingType']) => {
    setValue('housingType', housing, { shouldValidate: true })
  }

  const handleSupportSelect = (support: UserInput['familySupport']) => {
    setValue('familySupport', support, { shouldValidate: true })
  }

  return (
    <div className="space-y-8">
      {/* 收入水平选择 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">家庭收入水平</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {INCOME_OPTIONS.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <OptionCard
                title={option.title}
                description={option.description}
                selected={incomeLevel === option.value}
                onClick={() => handleIncomeSelect(option.value)}
                extra={
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {option.range}
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* 自定义收入输入 */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4"
        >
          <Card variant="ghost" padding="sm">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                精确月收入:
              </label>
              <div className="flex-1 max-w-xs">
                <input
                  type="number"
                  placeholder="可选，更精确的计算"
                  className="input-field text-sm"
                  {...register('customIncome', { 
                    min: { value: 1000, message: '收入不能少于1000元' },
                    max: { value: 1000000, message: '收入不能超过100万元' }
                  })}
                />
                {errors.customIncome && (
                  <p className="text-red-500 text-xs mt-1">{errors.customIncome.message}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">元/月</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 孩子年龄 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Baby className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">孩子年龄</h3>
        </div>
        
        <Card variant="ghost" padding="sm">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              当前年龄:
            </label>
            <div className="flex-1 max-w-xs">
              <input
                type="number"
                placeholder="请输入孩子的年龄"
                className="input-field"
                {...register('childAge', { 
                  required: '请输入孩子年龄',
                  min: { value: 0, message: '年龄不能小于0岁' },
                  max: { value: 18, message: '年龄不能大于18岁' }
                })}
              />
              {errors.childAge && (
                <p className="text-red-500 text-xs mt-1">{errors.childAge.message}</p>
              )}
            </div>
            <span className="text-sm text-gray-500">岁</span>
          </div>
          
          {childAge && (
            <div className="mt-2 text-xs text-gray-500">
              将计算从 {childAge} 岁到 18 岁的养育成本
            </div>
          )}
        </Card>
      </div>

      {/* 住房情况 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Home className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">住房情况</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HOUSING_OPTIONS.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OptionCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                selected={housingType === option.value}
                onClick={() => handleHousingSelect(option.value)}
                extra={
                  <span className={`text-xs px-2 py-1 rounded ${
                    option.multiplier.includes('+') ? 'bg-red-100 text-red-600' :
                    option.multiplier.includes('-') ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {option.multiplier}
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 家庭支持 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">家庭支持</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FAMILY_SUPPORT_OPTIONS.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OptionCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                selected={familySupport === option.value}
                onClick={() => handleSupportSelect(option.value)}
                extra={
                  <span className={`text-xs px-2 py-1 rounded ${
                    option.multiplier.includes('+') ? 'bg-red-100 text-red-600' :
                    option.multiplier.includes('-') ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {option.multiplier}
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 实时预览影响 */}
      {(incomeLevel || housingType || familySupport) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                选择影响预览
              </h4>
              <div className="space-y-1 text-sm text-blue-700">
                {incomeLevel && (
                  <div>
                    • 收入水平: {INCOME_OPTIONS.find(opt => opt.value === incomeLevel)?.impact}
                  </div>
                )}
                {housingType && (
                  <div>
                    • 住房情况: {HOUSING_OPTIONS.find(opt => opt.value === housingType)?.impact}
                  </div>
                )}
                {familySupport && (
                  <div>
                    • 家庭支持: {FAMILY_SUPPORT_OPTIONS.find(opt => opt.value === familySupport)?.impact}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 提示信息 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-1">
              填写提示
            </h4>
            <p className="text-sm text-amber-700">
              这些信息将影响养娃成本的计算基准。家庭支持包括老人帮忙带孩子、经济支持等。
              住房情况主要影响住房相关的分摊成本。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FamilyInfo
