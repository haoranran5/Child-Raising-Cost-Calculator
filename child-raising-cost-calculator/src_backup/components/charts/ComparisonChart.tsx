import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Info,
  Users,
  MapPin
} from 'lucide-react'
import { Card } from '../ui'
import { formatCurrency, formatPercentage } from '../../utils/calculator'
import type { ComparisonData } from '../../types'

interface ComparisonChartProps {
  /** 对比数据 */
  data: ComparisonData
  /** 图表标题 */
  title?: string
  /** 是否显示详细分析 */
  showAnalysis?: boolean
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  title = '费用对比分析',
  showAnalysis = true
}) => {
  // 准备图表数据
  const chartData = [
    {
      name: '全国平均',
      value: data.averages.national,
      type: 'average',
      color: '#6B7280',
      icon: '🇨🇳'
    },
    {
      name: '城市平均',
      value: data.averages.city,
      type: 'average',
      color: '#3B82F6',
      icon: '🏙️'
    },
    {
      name: '同收入水平',
      value: data.averages.sameIncomeLevel,
      type: 'average',
      color: '#10B981',
      icon: '💰'
    },
    {
      name: '同教育类型',
      value: data.averages.sameEducationType,
      type: 'average',
      color: '#8B5CF6',
      icon: '🎓'
    },
    {
      name: '您的费用',
      value: data.userCost,
      type: 'user',
      color: '#EF4444',
      icon: '👤'
    }
  ]

  // 计算差异数据
  const comparisonItems = [
    {
      label: '与全国平均',
      difference: data.analysis.vsNational.amount,
      percentage: data.analysis.vsNational.percentage,
      isHigher: data.analysis.vsNational.isHigher,
      icon: <Users className="w-4 h-4" />
    },
    {
      label: '与城市平均',
      difference: data.analysis.vsCity.amount,
      percentage: data.analysis.vsCity.percentage,
      isHigher: data.analysis.vsCity.isHigher,
      icon: <MapPin className="w-4 h-4" />
    },
    {
      label: '与同收入水平',
      difference: data.analysis.vsIncomeLevel.amount,
      percentage: data.analysis.vsIncomeLevel.percentage,
      isHigher: data.analysis.vsIncomeLevel.isHigher,
      icon: <Target className="w-4 h-4" />
    }
  ]

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const isUser = data.type === 'user'
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{data.icon}</span>
            <h4 className={`font-semibold ${isUser ? 'text-red-600' : 'text-gray-900'}`}>
              {data.name}
            </h4>
          </div>
          
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">年均费用:</span>
              <span className={`font-medium ${isUser ? 'text-red-600' : 'text-gray-900'}`}>
                {formatCurrency(data.value)}
              </span>
            </div>
            
            {isUser && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  您的费用水平: {data.ranking?.levelDescription}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  // 获取最大值用于设置Y轴范围
  const maxValue = Math.max(...chartData.map(item => item.value))
  const yAxisMax = Math.ceil(maxValue * 1.1 / 10000) * 10000

  return (
    <Card>
      {/* 标题 */}
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
              tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
              fontSize={12}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* 参考线 - 全国平均 */}
            <ReferenceLine 
              y={data.averages.national} 
              stroke="#6B7280" 
              strokeDasharray="5 5"
              label={{ value: "全国平均", position: "topRight" }}
            />
            
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.type === 'user' ? '#DC2626' : 'none'}
                  strokeWidth={entry.type === 'user' ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 对比分析 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {comparisonItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 ${
              item.isHigher 
                ? 'border-red-200 bg-red-50' 
                : 'border-green-200 bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
              {item.isHigher ? (
                <TrendingUp className="w-4 h-4 text-red-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-600" />
              )}
            </div>
            
            <div className="space-y-1">
              <div className={`text-lg font-bold ${
                item.isHigher ? 'text-red-600' : 'text-green-600'
              }`}>
                {item.isHigher ? '+' : ''}{formatCurrency(item.difference)}
              </div>
              <div className={`text-sm ${
                item.isHigher ? 'text-red-600' : 'text-green-600'
              }`}>
                {item.isHigher ? '+' : ''}{item.percentage.toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 排名信息 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Target className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              费用水平评估
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-blue-700">全国排名</div>
                <div className="text-lg font-bold text-blue-800">
                  前 {(100 - data.ranking.nationalPercentile).toFixed(0)}%
                </div>
                <div className="text-xs text-blue-600">
                  超过 {data.ranking.nationalPercentile}% 的家庭
                </div>
              </div>
              <div>
                <div className="text-sm text-purple-700">城市排名</div>
                <div className="text-lg font-bold text-purple-800">
                  前 {(100 - data.ranking.cityPercentile).toFixed(0)}%
                </div>
                <div className="text-xs text-purple-600">
                  超过 {data.ranking.cityPercentile}% 的同城家庭
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                综合评价: {data.ranking.levelDescription}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详细分析 */}
      {showAnalysis && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">影响因素分析</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 主要影响因素 */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                主要影响因素
              </h5>
              <div className="space-y-2">
                {data.analysis.mainFactors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 费用构成对比 */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                费用水平说明
              </h5>
              <div className="space-y-2 text-sm text-gray-600">
                {data.userCost > data.averages.national ? (
                  <>
                    <div>• 您的费用高于全国平均水平</div>
                    <div>• 可能与城市等级、教育选择相关</div>
                    <div>• 建议关注可选费用的优化</div>
                  </>
                ) : (
                  <>
                    <div>• 您的费用低于全国平均水平</div>
                    <div>• 选择相对经济实惠</div>
                    <div>• 可考虑适度增加教育投入</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-amber-900 mb-1">
              对比说明
            </h4>
            <p className="text-sm text-amber-700">
              以上对比数据基于统计模型和调研数据，实际情况可能因地区、时间、个人选择等因素有所差异。
              建议将对比结果作为参考，结合自身实际情况进行财务规划。
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ComparisonChart
