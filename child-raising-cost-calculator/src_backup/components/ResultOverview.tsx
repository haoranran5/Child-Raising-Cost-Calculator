import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  AlertCircle,
  Info
} from 'lucide-react'
import { Card } from './ui'
import { formatCurrency, formatPercentage } from '../utils/calculator'

interface ResultOverviewProps {
  /** 总费用 */
  totalCost: number
  /** 年均费用 */
  yearlyAverage: number
  /** 月均费用 */
  monthlyAverage: number
  /** 收入占比 */
  incomeRatio: number
  /** 与全国平均对比 */
  comparisonData?: {
    nationalAverage: number
    difference: number
    percentageDiff: number
    isHigher: boolean
  }
  /** 计算年龄范围 */
  ageRange?: {
    from: number
    to: number
  }
  /** 是否加载中 */
  loading?: boolean
}

const ResultOverview: React.FC<ResultOverviewProps> = ({
  totalCost,
  yearlyAverage,
  monthlyAverage,
  incomeRatio,
  comparisonData,
  ageRange = { from: 0, to: 18 },
  loading = false
}) => {
  // 动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // 获取收入占比的颜色和状态
  const getIncomeRatioStatus = (ratio: number) => {
    if (ratio < 0.2) return { color: 'green', status: '较低', icon: TrendingDown }
    if (ratio < 0.3) return { color: 'blue', status: '适中', icon: Target }
    if (ratio < 0.5) return { color: 'orange', status: '较高', icon: TrendingUp }
    return { color: 'red', status: '很高', icon: AlertCircle }
  }

  const incomeStatus = getIncomeRatioStatus(incomeRatio)
  const IncomeIcon = incomeStatus.icon

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* 主要费用展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 总费用 */}
        <motion.div variants={itemVariants}>
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-700">
                总养育成本
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {formatCurrency(totalCost)}
              </p>
              <p className="text-xs text-blue-600">
                {ageRange.from}岁 - {ageRange.to}岁
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 年均费用 */}
        <motion.div variants={itemVariants}>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-700">
                年均费用
              </p>
              <p className="text-3xl font-bold text-purple-900">
                {formatCurrency(yearlyAverage)}
              </p>
              <p className="text-xs text-purple-600">
                每年平均支出
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 月均费用 */}
        <motion.div variants={itemVariants}>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-700">
                月均费用
              </p>
              <p className="text-3xl font-bold text-green-900">
                {formatCurrency(monthlyAverage)}
              </p>
              <p className="text-xs text-green-600">
                每月平均支出
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 收入占比和对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 收入占比 */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                收入占比分析
              </h3>
              <div className={`p-2 rounded-lg ${
                incomeStatus.color === 'green' ? 'bg-green-100' :
                incomeStatus.color === 'blue' ? 'bg-blue-100' :
                incomeStatus.color === 'orange' ? 'bg-orange-100' :
                'bg-red-100'
              }`}>
                <IncomeIcon className={`w-5 h-5 ${
                  incomeStatus.color === 'green' ? 'text-green-600' :
                  incomeStatus.color === 'blue' ? 'text-blue-600' :
                  incomeStatus.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">月均养娃费用</span>
                <span className="font-medium">{formatCurrency(monthlyAverage)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">占家庭收入比例</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-lg ${
                    incomeStatus.color === 'green' ? 'text-green-600' :
                    incomeStatus.color === 'blue' ? 'text-blue-600' :
                    incomeStatus.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {formatPercentage(incomeRatio)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    incomeStatus.color === 'green' ? 'bg-green-100 text-green-700' :
                    incomeStatus.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    incomeStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {incomeStatus.status}
                  </span>
                </div>
              </div>

              {/* 进度条 */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    incomeStatus.color === 'green' ? 'bg-green-500' :
                    incomeStatus.color === 'blue' ? 'bg-blue-500' :
                    incomeStatus.color === 'orange' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(incomeRatio * 100, 100)}%` }}
                />
              </div>

              <div className="text-xs text-gray-500">
                建议养娃费用占家庭收入的20%-30%
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 全国平均对比 */}
        {comparisonData && (
          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  全国平均对比
                </h3>
                <div className={`p-2 rounded-lg ${
                  comparisonData.isHigher ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {comparisonData.isHigher ? (
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">您的年均费用</span>
                  <span className="font-medium">{formatCurrency(yearlyAverage)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">全国平均水平</span>
                  <span className="font-medium">{formatCurrency(comparisonData.nationalAverage)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">差异</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${
                      comparisonData.isHigher ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {comparisonData.isHigher ? '+' : ''}{formatCurrency(comparisonData.difference)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      comparisonData.isHigher ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {comparisonData.isHigher ? '+' : ''}{comparisonData.percentageDiff.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  comparisonData.isHigher ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    <Info className={`w-4 h-4 mt-0.5 ${
                      comparisonData.isHigher ? 'text-red-600' : 'text-green-600'
                    }`} />
                    <p className={`text-xs ${
                      comparisonData.isHigher ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {comparisonData.isHigher 
                        ? '您的养娃成本高于全国平均水平，可能与城市等级、教育选择等因素有关。'
                        : '您的养娃成本低于全国平均水平，说明您的选择相对经济实惠。'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* 提示信息 */}
      <motion.div variants={itemVariants}>
        <Card variant="ghost" className="bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                费用说明
              </h4>
              <p className="text-sm text-blue-700">
                以上费用包含基本生活、教育、医疗、住房等各项支出。实际费用可能因个人选择、
                地区差异、通胀等因素有所变化。建议将此结果作为财务规划的参考依据。
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default ResultOverview
