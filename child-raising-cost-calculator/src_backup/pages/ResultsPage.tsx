import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  Share2,
  RotateCcw,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Mail,
  MessageCircle
} from 'lucide-react'
import { Button, Card } from '../components/ui'
import ResultOverview from '../components/ResultOverview'
// import { CostBreakdownChart, AgeGroupChart, ComparisonChart } from '../components/charts'
import SavingTips from '../components/SavingTips'
import { useCalculation } from '../store'
import type { UserInput, CalculationResult } from '../types'
import {
  cn,
  buttonVariants,
  buttonSizes,
  cardVariants,
  container,
  flex,
  grid
} from '../utils/styles'

interface ResultsPageProps {
  /** 用户输入数据（可选，优先使用全局状态） */
  userInput?: UserInput
  /** 计算结果（可选，优先使用全局状态） */
  calculationResult?: CalculationResult
  /** 返回首页回调（可选，优先使用路由导航） */
  onBackToHome?: () => void
  /** 重新计算回调（可选，优先使用路由导航） */
  onRecalculate?: () => void
  /** 编辑数据回调（可选，优先使用路由导航） */
  onEditData?: () => void
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  userInput: propUserInput,
  calculationResult: propCalculationResult,
  onBackToHome,
  onRecalculate,
  onEditData
}) => {
  const navigate = useNavigate()
  const { userInput: storeUserInput, calculationResult: storeCalculationResult } = useCalculation()

  // 优先使用全局状态，其次使用props
  const userInput = propUserInput || storeUserInput
  const calculationResult = propCalculationResult || storeCalculationResult

  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'agegroup' | 'comparison' | 'tips'>('overview')
  const [isExporting, setIsExporting] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // 检查是否有必要的数据
  useEffect(() => {
    if (!userInput || !calculationResult) {
      // 如果没有数据，重定向到首页
      navigate('/')
    }
  }, [userInput, calculationResult, navigate])

  // 页面进入动画
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  // 标签页配置
  const tabs = [
    {
      id: 'overview' as const,
      label: '总览',
      description: '费用总览和收入占比分析'
    },
    {
      id: 'breakdown' as const,
      label: '费用分解',
      description: '各类别费用占比详情'
    },
    {
      id: 'agegroup' as const,
      label: '年龄段分析',
      description: '各年龄段费用对比'
    },
    {
      id: 'comparison' as const,
      label: '对比分析',
      description: '与平均水平对比'
    },
    {
      id: 'tips' as const,
      label: '省钱建议',
      description: '个性化省钱建议'
    }
  ]

  // 导出数据
  const handleExport = useCallback(async () => {
    setIsExporting(true)
    
    try {
      // 模拟导出延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 生成报告数据
      const reportData = {
        userInput,
        calculationResult,
        generatedAt: new Date().toISOString(),
        summary: {
          totalCost: calculationResult.costBreakdown.totalCost,
          yearlyAverage: calculationResult.costBreakdown.yearlyAverage,
          monthlyAverage: calculationResult.costBreakdown.monthlyAverage,
          incomeRatio: calculationResult.costBreakdown.incomeRatio
        }
      }
      
      // 创建下载链接
      const dataStr = JSON.stringify(reportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `养娃成本计算报告_${new Date().toLocaleDateString()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [userInput, calculationResult])

  // 复制分享链接
  const handleCopyLink = useCallback(async () => {
    try {
      const shareUrl = `${window.location.origin}/share?data=${encodeURIComponent(JSON.stringify({
        totalCost: calculationResult.costBreakdown.totalCost,
        yearlyAverage: calculationResult.costBreakdown.yearlyAverage,
        monthlyAverage: calculationResult.costBreakdown.monthlyAverage
      }))}`
      
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }, [calculationResult])

  // 社交分享
  const handleSocialShare = useCallback((platform: 'wechat' | 'weibo' | 'qq') => {
    const shareText = `我用养娃成本计算器算了一下，从${userInput.childAge}岁到18岁大概需要${Math.round(calculationResult.costBreakdown.totalCost / 10000)}万元，年均${Math.round(calculationResult.costBreakdown.yearlyAverage / 10000)}万元。你也来算算看吧！`
    const shareUrl = window.location.href
    
    let targetUrl = ''
    switch (platform) {
      case 'wechat':
        // 微信分享通常需要特殊处理
        alert('请复制链接到微信分享')
        handleCopyLink()
        break
      case 'weibo':
        targetUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
        break
      case 'qq':
        targetUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
        break
    }
    
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'width=600,height=400')
    }
    
    setShareMenuOpen(false)
  }, [userInput, calculationResult, handleCopyLink])

  // 处理导航
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome()
    } else {
      navigate('/')
    }
  }

  const handleRecalculate = () => {
    if (onRecalculate) {
      onRecalculate()
    } else {
      navigate('/calculator')
    }
  }

  const handleEditData = () => {
    if (onEditData) {
      onEditData()
    } else {
      navigate('/calculator')
    }
  }

  // 如果没有数据，显示加载或重定向
  if (!userInput || !calculationResult) {
    return null
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
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">费用分解图表</h3>
              <p className="text-gray-600">图表组件开发中...</p>
            </div>
          </Card>
        )

      case 'agegroup':
        return (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">年龄段分析图表</h3>
              <p className="text-gray-600">图表组件开发中...</p>
            </div>
          </Card>
        )

      case 'comparison':
        return (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">对比分析图表</h3>
              <p className="text-gray-600">图表组件开发中...</p>
            </div>
          </Card>
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
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
    >
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                leftIcon={<ArrowLeft />}
              >
                返回首页
              </Button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  计算结果报告
                </h1>
                <p className="text-sm text-gray-600">
                  基于您的选择生成的个性化分析
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* 分享按钮 */}
              <div className="relative">
                <Button
                  variant="secondary"
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  leftIcon={<Share2 />}
                >
                  分享
                </Button>
                
                <AnimatePresence>
                  {shareMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        {copySuccess ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copySuccess ? '已复制' : '复制链接'}</span>
                      </button>
                      <button
                        onClick={() => handleSocialShare('wechat')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>微信分享</span>
                      </button>
                      <button
                        onClick={() => handleSocialShare('weibo')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>微博分享</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 导出按钮 */}
              <Button
                variant="secondary"
                onClick={handleExport}
                loading={isExporting}
                leftIcon={<Download />}
              >
                {isExporting ? '导出中...' : '导出报告'}
              </Button>

              {/* 编辑按钮 */}
              <Button
                variant="ghost"
                onClick={handleEditData}
                leftIcon={<FileText />}
              >
                编辑数据
              </Button>

              {/* 重新计算按钮 */}
              <Button
                onClick={handleRecalculate}
                leftIcon={<RotateCcw />}
              >
                重新计算
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* 标签页导航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card padding="sm">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </Card>
        </motion.div>

        {/* 标签页内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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

      {/* 点击外部关闭分享菜单 */}
      {shareMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShareMenuOpen(false)}
        />
      )}
    </motion.div>
  )
}

export default ResultsPage
