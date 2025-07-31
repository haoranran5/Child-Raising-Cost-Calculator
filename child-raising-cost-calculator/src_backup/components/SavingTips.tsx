import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  DollarSign, 
  Star, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Home,
  ShoppingCart,
  Heart,
  Target,
  Filter
} from 'lucide-react'
import { Card, Button } from './ui'
import type { UserInput } from '../types'

interface SavingTip {
  id: string
  title: string
  description: string
  category: 'education' | 'housing' | 'daily' | 'healthcare' | 'entertainment'
  difficulty: 'easy' | 'medium' | 'hard'
  impact: 'low' | 'medium' | 'high'
  potentialSaving: number
  feasibilityScore: number
  icon: React.ReactNode
  details: string[]
  considerations: string[]
}

interface SavingTipsProps {
  /** 用户输入数据 */
  userInput: UserInput
  /** 当前费用数据 */
  currentCosts?: {
    monthlyTotal: number
    yearlyTotal: number
  }
  /** 是否显示详细信息 */
  showDetails?: boolean
}

// 省钱建议数据
const generateSavingTips = (userInput: UserInput): SavingTip[] => {
  const tips: SavingTip[] = []

  // 教育相关建议
  if (userInput.educationType === 'private' || userInput.educationType === 'international') {
    tips.push({
      id: 'education-public',
      title: '考虑公立教育',
      description: '在保证教育质量的前提下，选择优质公立学校',
      category: 'education',
      difficulty: 'hard',
      impact: 'high',
      potentialSaving: 8000,
      feasibilityScore: 60,
      icon: <BookOpen className="w-5 h-5" />,
      details: [
        '选择口碑好的公立学校',
        '关注学校的师资力量和升学率',
        '可以节省大量学费支出',
        '将节省的费用用于课外培训'
      ],
      considerations: [
        '需要提前了解学区政策',
        '可能需要购买或租赁学区房',
        '竞争可能较为激烈'
      ]
    })
  }

  if (userInput.trainingAttitude === 'intensive' || userInput.trainingAttitude === 'active') {
    tips.push({
      id: 'training-optimize',
      title: '优化培训选择',
      description: '精选高质量培训班，避免盲目跟风',
      category: 'education',
      difficulty: 'medium',
      impact: 'medium',
      potentialSaving: 3000,
      feasibilityScore: 80,
      icon: <Target className="w-5 h-5" />,
      details: [
        '根据孩子兴趣和天赋选择',
        '优先选择性价比高的机构',
        '考虑在线课程替代部分线下课程',
        '与其他家长拼团降低成本'
      ],
      considerations: [
        '需要花时间筛选优质机构',
        '在线课程效果可能有差异',
        '要平衡孩子的学习压力'
      ]
    })
  }

  // 住房相关建议
  if (userInput.housingType === 'school-district') {
    tips.push({
      id: 'housing-rent',
      title: '考虑租赁学区房',
      description: '短期租赁代替购买，降低住房成本',
      category: 'housing',
      difficulty: 'medium',
      impact: 'high',
      potentialSaving: 5000,
      feasibilityScore: 70,
      icon: <Home className="w-5 h-5" />,
      details: [
        '在关键学段租赁学区房',
        '避免长期房贷压力',
        '灵活调整居住地点',
        '节省购房首付和利息'
      ],
      considerations: [
        '租金可能逐年上涨',
        '缺乏房产增值收益',
        '搬家频率可能较高'
      ]
    })
  }

  // 收入相关建议
  if (userInput.incomeLevel === 'low' || userInput.incomeLevel === 'lower-middle') {
    tips.push({
      id: 'budget-planning',
      title: '制定详细预算',
      description: '建立家庭财务预算，合理分配各项支出',
      category: 'daily',
      difficulty: 'easy',
      impact: 'medium',
      potentialSaving: 1500,
      feasibilityScore: 90,
      icon: <DollarSign className="w-5 h-5" />,
      details: [
        '记录每月收支明细',
        '设定各类支出上限',
        '优先保证必需支出',
        '定期审查和调整预算'
      ],
      considerations: [
        '需要养成记账习惯',
        '可能需要改变消费习惯',
        '要有一定的执行力'
      ]
    })

    tips.push({
      id: 'bulk-buying',
      title: '批量采购日用品',
      description: '合理囤货，利用促销活动降低日常开支',
      category: 'daily',
      difficulty: 'easy',
      impact: 'low',
      potentialSaving: 800,
      feasibilityScore: 85,
      icon: <ShoppingCart className="w-5 h-5" />,
      details: [
        '关注商超促销活动',
        '与邻居朋友团购',
        '选择性价比高的品牌',
        '合理储存避免浪费'
      ],
      considerations: [
        '需要足够的储存空间',
        '注意商品保质期',
        '避免过度囤积'
      ]
    })
  }

  // 家庭支持相关建议
  if (userInput.familySupport === 'minimal') {
    tips.push({
      id: 'family-help',
      title: '争取家庭支持',
      description: '适当寻求长辈帮助，减轻育儿压力',
      category: 'daily',
      difficulty: 'medium',
      impact: 'medium',
      potentialSaving: 2000,
      feasibilityScore: 75,
      icon: <Heart className="w-5 h-5" />,
      details: [
        '请长辈帮忙接送孩子',
        '节假日托管减少保姆费用',
        '分享育儿经验和资源',
        '共同承担部分教育费用'
      ],
      considerations: [
        '需要协调家庭关系',
        '教育理念可能有差异',
        '要尊重长辈的时间安排'
      ]
    })
  }

  // 通用建议
  tips.push(
    {
      id: 'second-hand',
      title: '购买二手物品',
      description: '选择品质好的二手儿童用品，降低购物成本',
      category: 'daily',
      difficulty: 'easy',
      impact: 'low',
      potentialSaving: 1200,
      feasibilityScore: 80,
      icon: <TrendingDown className="w-5 h-5" />,
      details: [
        '购买二手童装和玩具',
        '选择信誉好的二手平台',
        '注意清洁和安全检查',
        '可以转卖不用的物品'
      ],
      considerations: [
        '需要花时间筛选',
        '可能存在卫生问题',
        '款式可能不够新颖'
      ]
    },
    {
      id: 'diy-activities',
      title: '自制娱乐活动',
      description: '在家组织亲子活动，减少外出娱乐支出',
      category: 'entertainment',
      difficulty: 'easy',
      impact: 'low',
      potentialSaving: 600,
      feasibilityScore: 85,
      icon: <Star className="w-5 h-5" />,
      details: [
        '在家做手工和游戏',
        '利用免费的公园和图书馆',
        '组织邻里亲子活动',
        '观看教育类免费视频'
      ],
      considerations: [
        '需要投入更多时间和精力',
        '活动丰富度可能有限',
        '要保持孩子的兴趣'
      ]
    }
  )

  return tips
}

// 类别图标和颜色映射
const CATEGORY_CONFIG = {
  education: { icon: BookOpen, color: 'blue', label: '教育' },
  housing: { icon: Home, color: 'green', label: '住房' },
  daily: { icon: ShoppingCart, color: 'purple', label: '日常' },
  healthcare: { icon: Heart, color: 'red', label: '医疗' },
  entertainment: { icon: Star, color: 'yellow', label: '娱乐' }
}

// 难度和影响程度配置
const DIFFICULTY_CONFIG = {
  easy: { label: '容易', color: 'green' },
  medium: { label: '中等', color: 'yellow' },
  hard: { label: '困难', color: 'red' }
}

const IMPACT_CONFIG = {
  low: { label: '较小', color: 'gray' },
  medium: { label: '中等', color: 'blue' },
  high: { label: '较大', color: 'green' }
}

const SavingTips: React.FC<SavingTipsProps> = ({
  userInput,
  currentCosts,
  showDetails = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'impact' | 'feasibility' | 'saving'>('impact')

  const tips = generateSavingTips(userInput)

  // 过滤和排序建议
  const filteredTips = tips
    .filter(tip => selectedCategory === 'all' || tip.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          const impactOrder = { high: 3, medium: 2, low: 1 }
          return impactOrder[b.impact] - impactOrder[a.impact]
        case 'feasibility':
          return b.feasibilityScore - a.feasibilityScore
        case 'saving':
          return b.potentialSaving - a.potentialSaving
        default:
          return 0
      }
    })

  // 计算总潜在节省
  const totalPotentialSaving = filteredTips.reduce((sum, tip) => sum + tip.potentialSaving, 0)

  return (
    <Card>
      {/* 标题和统计 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">省钱建议</h3>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600">潜在月节省</div>
          <div className="text-lg font-bold text-green-600">
            ¥{totalPotentialSaving.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 筛选和排序 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">筛选:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">全部类别</option>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">排序:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="impact">按影响程度</option>
            <option value="feasibility">按可行性</option>
            <option value="saving">按节省金额</option>
          </select>
        </div>
      </div>

      {/* 建议列表 */}
      <div className="space-y-4">
        {filteredTips.map((tip, index) => {
          const categoryConfig = CATEGORY_CONFIG[tip.category]
          const difficultyConfig = DIFFICULTY_CONFIG[tip.difficulty]
          const impactConfig = IMPACT_CONFIG[tip.impact]
          
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                {/* 图标 */}
                <div className={`p-3 rounded-lg bg-${categoryConfig.color}-100`}>
                  {tip.icon}
                </div>

                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{tip.title}</h4>
                      <p className="text-gray-600 mt-1">{tip.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ¥{tip.potentialSaving.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">月节省</div>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full bg-${categoryConfig.color}-100 text-${categoryConfig.color}-700`}>
                      {categoryConfig.label}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${difficultyConfig.color}-100 text-${difficultyConfig.color}-700`}>
                      难度: {difficultyConfig.label}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${impactConfig.color}-100 text-${impactConfig.color}-700`}>
                      影响: {impactConfig.label}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      可行性: {tip.feasibilityScore}%
                    </span>
                  </div>

                  {/* 可行性评分条 */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>可行性评分</span>
                      <span>{tip.feasibilityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          tip.feasibilityScore >= 80 ? 'bg-green-500' :
                          tip.feasibilityScore >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${tip.feasibilityScore}%` }}
                      />
                    </div>
                  </div>

                  {/* 详细信息 */}
                  {showDetails && (
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                          实施要点
                        </h5>
                        <ul className="space-y-1">
                          {tip.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 text-amber-600 mr-1" />
                          注意事项
                        </h5>
                        <ul className="space-y-1">
                          {tip.considerations.map((consideration, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-600">{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 总结 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-900 mb-2">
                省钱潜力总结
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-green-700">月度节省潜力</div>
                  <div className="text-lg font-bold text-green-800">
                    ¥{totalPotentialSaving.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-green-700">年度节省潜力</div>
                  <div className="text-lg font-bold text-green-800">
                    ¥{(totalPotentialSaving * 12).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-green-700">建议数量</div>
                  <div className="text-lg font-bold text-green-800">
                    {filteredTips.length} 条
                  </div>
                </div>
              </div>
              <p className="text-sm text-green-700 mt-2">
                通过合理实施这些建议，您可以在保证生活质量的前提下，有效降低养娃成本。
                建议优先选择可行性高、影响程度大的建议开始实施。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SavingTips
