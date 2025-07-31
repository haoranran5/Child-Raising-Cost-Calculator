import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  MapPin, 
  DollarSign, 
  Home, 
  Users, 
  GraduationCap,
  Target,
  Baby,
  TrendingUp,
  Edit3
} from 'lucide-react'
import { UserInput } from '../../types'
import { Card, Button } from '../ui'

// 选项映射
const OPTION_LABELS = {
  cityTier: {
    'tier1': '一线城市',
    'new-tier1': '新一线城市', 
    'tier2': '二线城市',
    'tier3-4': '三四线城市'
  },
  incomeLevel: {
    'low': '较低收入 (< 8K)',
    'lower-middle': '中低收入 (8K-15K)',
    'middle': '中等收入 (15K-25K)',
    'upper-middle': '中高收入 (25K-50K)',
    'high': '高收入 (> 50K)'
  },
  housingType: {
    'rental': '租房',
    'owned': '自有住房',
    'school-district': '学区房'
  },
  familySupport: {
    'minimal': '很少支持',
    'moderate': '适度支持',
    'significant': '较多支持'
  },
  educationType: {
    'public': '公立教育',
    'private': '私立教育',
    'international': '国际教育'
  },
  trainingAttitude: {
    'relaxed': '佛系培养',
    'normal': '适度培养',
    'active': '积极培养',
    'intensive': '鸡娃模式'
  }
}

const ResultPreview: React.FC = () => {
  const { watch, setValue } = useFormContext<UserInput>()
  
  const formData = watch()

  // 预览项配置
  const previewItems = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: '城市类型',
      value: OPTION_LABELS.cityTier[formData.cityTier],
      step: 0,
      color: 'blue'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: '收入水平',
      value: OPTION_LABELS.incomeLevel[formData.incomeLevel],
      step: 1,
      color: 'green'
    },
    {
      icon: <Baby className="w-5 h-5" />,
      label: '孩子年龄',
      value: `${formData.childAge} 岁`,
      step: 1,
      color: 'purple'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: '住房情况',
      value: OPTION_LABELS.housingType[formData.housingType],
      step: 1,
      color: 'orange'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: '家庭支持',
      value: OPTION_LABELS.familySupport[formData.familySupport],
      step: 1,
      color: 'indigo'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: '教育类型',
      value: OPTION_LABELS.educationType[formData.educationType],
      step: 2,
      color: 'red'
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: '培训态度',
      value: OPTION_LABELS.trainingAttitude[formData.trainingAttitude],
      step: 2,
      color: 'pink'
    }
  ]

  // 自定义收入显示
  if (formData.customIncome) {
    const incomeItem = previewItems.find(item => item.label === '收入水平')
    if (incomeItem) {
      incomeItem.value = `${formData.customIncome.toLocaleString()} 元/月`
    }
  }

  // 获取颜色类名
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="space-y-6">
      {/* 确认提示 */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          确认您的选择
        </h3>
        <p className="text-gray-600">
          请检查以下信息是否正确，确认后将开始计算养娃成本
        </p>
      </div>

      {/* 信息预览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card 
              variant="outlined" 
              padding="md"
              className="h-full hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border ${getColorClasses(item.color)}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {item.label}
                    </div>
                    <div className="text-base font-semibold text-gray-900">
                      {item.value}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // 这里可以添加跳转到对应步骤的逻辑
                    console.log(`Edit step ${item.step}`)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 计算范围说明 */}
      <Card variant="ghost" padding="md">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              计算说明
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• 计算范围：从 {formData.childAge} 岁到 18 岁</div>
              <div>• 包含基本生活、教育、医疗、住房等各项费用</div>
              <div>• 根据您的选择调整各项费用系数</div>
              {formData.considerInflation && (
                <div>• 已考虑通胀因素对未来费用的影响</div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 通胀选项 */}
      <Card variant="outlined" padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                考虑通胀因素
              </div>
              <div className="text-sm text-gray-600">
                将通胀率纳入未来费用计算
              </div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.considerInflation}
              onChange={(e) => setValue('considerInflation', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </Card>

      {/* 数据使用说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">ℹ️</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              数据说明
            </h4>
            <p className="text-sm text-blue-700">
              计算结果基于统计数据和经验模型，仅供参考。实际费用会因个人情况、地区差异、
              时间变化等因素有所不同。建议将结果作为财务规划的参考依据。
            </p>
          </div>
        </div>
      </div>

      {/* 提交按钮区域 */}
      <div className="text-center pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-600 mb-4">
            确认信息无误后，点击下方按钮开始计算
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="secondary"
              onClick={() => {
                // 返回修改逻辑
                console.log('Go back to edit')
              }}
            >
              返回修改
            </Button>
            <Button
              type="submit"
              size="lg"
              className="px-8"
            >
              开始计算养娃成本
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultPreview
