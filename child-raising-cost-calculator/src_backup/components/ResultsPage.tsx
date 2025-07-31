import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  ArrowLeft,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Lightbulb
} from 'lucide-react'
import { Button, Card } from './ui'
import ResultOverview from './ResultOverview'
import { CostBreakdownChart, AgeGroupChart, ComparisonChart } from './charts'
import SavingTips from './SavingTips'
import type { UserInput, CalculationResult } from '../types'

interface ResultsPageProps {
  /** 用户输入数据 */
  userInput: UserInput
  /** 计算结果 */
  calculationResult: CalculationResult
  /** 返回编辑回调 */
  onBack?: () => void
  /** 重新计算回调 */
  onRecalculate?: () => void
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  userInput,
  calculationResult,
  onBack,
  onRecalculate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'agegroup' | 'comparison' | 'tips'>('overview')

  // 标签页配置
  const tabs = [
    {
      id: 'overview' as const,
      label: '总览',
      icon: <BarChart3 className="w-4 h-4" />,
      description: '费用总览和收入占比'
    },
    {
      id: 'breakdown' as const,
      label: '费用分解',
      icon: <PieChart className="w-4 h-4" />,
      description: '各类别费用占比'
    },
    {
      id: 'agegroup' as const,
      label: '年龄段分析',
      icon: <TrendingUp className="w-4 h-4" />,
      description: '各年龄段费用对比'
    },
    {
      id: 'comparison' as const,
      label: '对比分析',
      icon: <BarChart3 className="w-4 h-4" />,
      description: '与平均水平对比'
    },
    {
      id: 'tips' as const,
      label: '省钱建议',
      icon: <Lightbulb className="w-4 h-4" />,
      description: '个性化省钱建议'
    }
  ]

  // 页面动画配置
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  }

  // 渲染当前标签页内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ResultOverview
            totalCost={calculationResult.costBreakdown.totalCost}
            yearlyAverage={calculationResult.costBreakdown.yearlyAverage}
            monthlyAverage={calculationResult.costBreakdown.monthlyAverage}
            incomeRatio={calculationResult.costBreakdown.incomeRatio}
            comparisonData={{
              nationalAverage: calculationResult.comparisonData.averages.national,
              difference: calculationResult.comparisonData.analysis.vsNational.amount,
              percentageDiff: calculationResult.comparisonData.analysis.vsNational.percentage,
              isHigher: calculationResult.comparisonData.analysis.vsNational.isHigher
            }}
            ageRange={{
              from: userInput.childAge,
              to: 18
            }}
          />
        )

      case 'breakdown':
        return (
          <CostBreakdownChart
            data={Object.values(calculationResult.costBreakdown.byCategory)}
            title="月度费用分解"
            showLegend={true}
            chartType="pie"
            showPercentage={true}
          />
        )

      case 'agegroup':
        return (
          <AgeGroupChart
            data={calculationResult.costBreakdown.byAgeGroup}
            title="各年龄段费用分析"
            showDetails={true}
          />
        )

      case 'comparison':
        return (
          <ComparisonChart
            data={calculationResult.comparisonData}
            title="费用对比分析"
            showAnalysis={true}
          />
        )

      case 'tips':
        return (
          <SavingTips
            userInput={userInput}
            currentCosts={{
              monthlyTotal: calculationResult.costBreakdown.monthlyAverage,
              yearlyTotal: calculationResult.costBreakdown.yearlyAverage
            }}
            showDetails={true}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 页面标题和操作 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                leftIcon={<ArrowLeft />}
              >
                返回编辑
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                养娃成本计算结果
              </h1>
              <p className="text-gray-600 mt-1">
                基于您的选择生成的个性化分析报告
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              leftIcon={<Share2 />}
            >
              分享结果
            </Button>
            <Button
              variant="secondary"
              leftIcon={<Download />}
            >
              下载报告
            </Button>
            {onRecalculate && (
              <Button
                onClick={onRecalculate}
                leftIcon={<FileText />}
              >
                重新计算
              </Button>
            )}
          </div>
        </motion.div>

        {/* 标签页导航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card padding="sm">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* 当前标签页描述 */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 标签页内容 */}
        <motion.div
          key={activeTab}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderTabContent()}
        </motion.div>

        {/* 底部操作区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  需要更详细的分析？
                </h3>
                <p className="text-gray-600">
                  我们可以为您提供更个性化的财务规划建议
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="secondary">
                  联系专家
                </Button>
                <Button>
                  获取详细报告
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 免责声明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Card variant="ghost" className="bg-gray-50">
            <div className="text-sm text-gray-500 space-y-2">
              <p>
                <strong>免责声明：</strong>
                本计算结果基于统计数据和经验模型，仅供参考。
              </p>
              <p>
                实际费用可能因个人情况、地区差异、时间变化等因素有所不同。
                建议将结果作为财务规划的参考依据，并结合实际情况进行调整。
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsPage
