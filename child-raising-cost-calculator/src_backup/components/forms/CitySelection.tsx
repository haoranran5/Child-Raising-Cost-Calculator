import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Home, 
  MapPin, 
  TrendingUp, 
  DollarSign,
  Users
} from 'lucide-react'
import { UserInput } from '../../types'
import { OptionCard } from '../ui'

// 城市等级选项配置
const CITY_OPTIONS = [
  {
    value: 'tier1' as const,
    title: '一线城市',
    description: '北京、上海、广州、深圳',
    icon: <Building2 className="w-5 h-5" />,
    details: [
      '教育资源丰富，名校众多',
      '医疗条件优越，三甲医院集中',
      '就业机会多，薪资水平高',
      '生活成本较高，房价昂贵'
    ],
    costLevel: '高',
    costMultiplier: '1.8x',
    examples: ['北京', '上海', '广州', '深圳'],
    color: 'red'
  },
  {
    value: 'new-tier1' as const,
    title: '新一线城市',
    description: '成都、杭州、武汉、南京等',
    icon: <TrendingUp className="w-5 h-5" />,
    details: [
      '发展迅速，机会较多',
      '教育资源相对丰富',
      '生活成本适中',
      '房价相对合理'
    ],
    costLevel: '中高',
    costMultiplier: '1.4x',
    examples: ['成都', '杭州', '武汉', '南京', '西安', '苏州'],
    color: 'orange'
  },
  {
    value: 'tier2' as const,
    title: '二线城市',
    description: '省会城市及重要地级市',
    icon: <Home className="w-5 h-5" />,
    details: [
      '教育资源较好',
      '生活节奏适中',
      '房价相对合理',
      '生活成本适中'
    ],
    costLevel: '中等',
    costMultiplier: '1.2x',
    examples: ['青岛', '大连', '厦门', '长沙', '郑州', '济南'],
    color: 'blue'
  },
  {
    value: 'tier3-4' as const,
    title: '三四线城市',
    description: '地级市及县级市',
    icon: <MapPin className="w-5 h-5" />,
    details: [
      '生活成本较低',
      '房价相对便宜',
      '生活节奏较慢',
      '教育资源相对有限'
    ],
    costLevel: '较低',
    costMultiplier: '1.0x',
    examples: ['绍兴', '台州', '嘉兴', '湖州', '金华', '衢州'],
    color: 'green'
  }
]

// 获取颜色样式
const getColorClasses = (color: string, selected: boolean) => {
  const colorMap = {
    red: {
      badge: selected ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600',
      border: selected ? 'border-red-200' : 'border-red-100'
    },
    orange: {
      badge: selected ? 'bg-orange-100 text-orange-700' : 'bg-orange-50 text-orange-600',
      border: selected ? 'border-orange-200' : 'border-orange-100'
    },
    blue: {
      badge: selected ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600',
      border: selected ? 'border-blue-200' : 'border-blue-100'
    },
    green: {
      badge: selected ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600',
      border: selected ? 'border-green-200' : 'border-green-100'
    }
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

const CitySelection: React.FC = () => {
  const { watch, setValue } = useFormContext<UserInput>()
  const selectedCity = watch('cityTier')

  const handleCitySelect = (cityTier: UserInput['cityTier']) => {
    setValue('cityTier', cityTier, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      {/* 说明文字 */}
      <div className="text-center">
        <p className="text-gray-600">
          请选择您所在的城市类型，这将影响养娃成本的计算基准
        </p>
      </div>

      {/* 城市选项网格 */}
      <div className="grid md:grid-cols-2 gap-4">
        {CITY_OPTIONS.map((option, index) => {
          const isSelected = selectedCity === option.value
          const colorClasses = getColorClasses(option.color, isSelected)

          return (
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
                selected={isSelected}
                onClick={() => handleCitySelect(option.value)}
                className="h-full"
                extra={
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${colorClasses.badge}`}>
                      {option.costLevel}成本
                    </span>
                    <span className="text-xs text-gray-500">
                      {option.costMultiplier}
                    </span>
                  </div>
                }
              />
            </motion.div>
          )
        })}
      </div>

      {/* 选中城市的详细信息 */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {(() => {
            const selectedOption = CITY_OPTIONS.find(opt => opt.value === selectedCity)
            if (!selectedOption) return null

            const colorClasses = getColorClasses(selectedOption.color, true)

            return (
              <div className={`border-2 rounded-xl p-6 ${colorClasses.border} bg-gray-50`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {selectedOption.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedOption.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          成本系数: {selectedOption.costMultiplier}
                        </span>
                      </div>
                    </div>

                    {/* 特点列表 */}
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {selectedOption.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* 示例城市 */}
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">典型城市:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedOption.examples.map((city, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">💡</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              选择提示
            </h4>
            <p className="text-sm text-blue-700">
              城市等级主要影响教育、住房、医疗等费用水平。如果您的城市不在典型城市列表中，
              请选择经济发展水平和消费水平最接近的类型。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitySelection
