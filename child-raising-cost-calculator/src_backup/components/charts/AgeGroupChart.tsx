import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { 
  BarChart3, 
  TrendingUp, 
  Info,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, Button } from '../ui'
import { formatCurrency } from '../../utils/calculator'
import type { AgeGroupCost } from '../../types'

interface AgeGroupChartProps {
  /** 年龄段费用数据 */
  data: AgeGroupCost[]
  /** 图表标题 */
  title?: string
  /** 是否显示详细信息 */
  showDetails?: boolean
  /** 点击回调 */
  onAgeGroupClick?: (ageGroup: AgeGroupCost) => void
}

// 年龄段颜色映射
const AGE_GROUP_COLORS = {
  'infant': '#EF4444',    // 0-2岁 - 红色
  'toddler': '#F97316',   // 3-5岁 - 橙色
  'primary': '#EAB308',   // 6-11岁 - 黄色
  'middle': '#22C55E',    // 12-14岁 - 绿色
  'high': '#3B82F6'       // 15-18岁 - 蓝色
}

// 年龄段标签映射
const AGE_GROUP_LABELS = {
  'infant': '婴幼儿期',
  'toddler': '学前期',
  'primary': '小学期',
  'middle': '初中期',
  'high': '高中期'
}

// 年龄段描述
const AGE_GROUP_DESCRIPTIONS = {
  'infant': '奶粉、尿布、婴儿用品等费用较高',
  'toddler': '早教、玩具、基础医疗费用',
  'primary': '学费、课外活动、兴趣培养',
  'middle': '补习班、升学准备、青春期需求',
  'high': '高考准备、大学预备、职业规划'
}

const AgeGroupChart: React.FC<AgeGroupChartProps> = ({
  data,
  title = '各年龄段费用分析',
  showDetails = true,
  onAgeGroupClick
}) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null)
  const [showYearlyView, setShowYearlyView] = useState(false)

  // 准备图表数据
  const chartData = data.map(item => ({
    ...item,
    name: AGE_GROUP_LABELS[item.ageGroup],
    ageRange: `${item.ageRange.min}-${item.ageRange.max}岁`,
    color: AGE_GROUP_COLORS[item.ageGroup],
    description: AGE_GROUP_DESCRIPTIONS[item.ageGroup],
    displayValue: showYearlyView ? item.yearlyAverage : item.monthlyAverage
  }))

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <h4 className="font-semibold text-gray-900">{data.name}</h4>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">年龄范围:</span>
              <span className="font-medium">{data.ageRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">月均费用:</span>
              <span className="font-medium">{formatCurrency(data.monthlyAverage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">年均费用:</span>
              <span className="font-medium">{formatCurrency(data.yearlyAverage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">总费用:</span>
              <span className="font-medium">{formatCurrency(data.totalCost)}</span>
            </div>
          </div>
          
          {data.description && (
            <div className="mt-3 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">{data.description}</p>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // 处理柱状图点击
  const handleBarClick = (data: any) => {
    setSelectedAgeGroup(data.ageGroup)
    if (onAgeGroupClick) {
      onAgeGroupClick(data)
    }
  }

  // 获取最高费用用于Y轴范围
  const maxValue = Math.max(...chartData.map(item => item.displayValue))
  const yAxisMax = Math.ceil(maxValue * 1.1 / 1000) * 1000

  return (
    <Card>
      {/* 标题和控制按钮 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={!showYearlyView ? 'primary' : 'ghost'}
            onClick={() => setShowYearlyView(false)}
          >
            月均
          </Button>
          <Button
            size="sm"
            variant={showYearlyView ? 'primary' : 'ghost'}
            onClick={() => setShowYearlyView(true)}
          >
            年均
          </Button>
        </div>
      </div>

      {/* 图表区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-80 mb-6"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              stroke="#6b7280"
            />
            <YAxis 
              domain={[0, yAxisMax]}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              fontSize={12}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="displayValue" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={handleBarClick}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={selectedAgeGroup === entry.ageGroup ? '#374151' : 'none'}
                  strokeWidth={selectedAgeGroup === entry.ageGroup ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 详细信息 */}
      {showDetails && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">年龄段详情</h4>
            <span className="text-sm text-gray-500">
              点击柱状图查看详细信息
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chartData.map((item, index) => (
              <motion.div
                key={item.ageGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAgeGroup === item.ageGroup
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleBarClick(item)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <h5 className="font-medium text-gray-900">{item.name}</h5>
                    <p className="text-xs text-gray-500">{item.ageRange}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">月均:</span>
                    <span className="font-medium">{formatCurrency(item.monthlyAverage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">总计:</span>
                    <span className="font-medium">{formatCurrency(item.totalCost)}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 趋势分析 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                费用趋势分析
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• 婴幼儿期费用较高，主要是奶粉、尿布等必需品</div>
                <div>• 学前期费用相对较低，开始有早教投入</div>
                <div>• 小学期费用上升，课外活动和兴趣班增加</div>
                <div>• 初高中期费用最高，补习和升学准备成本大</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 选中年龄段的详细费用分解 */}
      {selectedAgeGroup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          {(() => {
            const selectedData = data.find(item => item.ageGroup === selectedAgeGroup)
            if (!selectedData) return null

            return (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {AGE_GROUP_LABELS[selectedData.ageGroup]} 费用明细
                  </h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedAgeGroup(null)}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedData.items.map((item, index) => (
                    <div key={item.category} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">{item.name}</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {formatCurrency(item.monthlyAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}
    </Card>
  )
}

export default AgeGroupChart
