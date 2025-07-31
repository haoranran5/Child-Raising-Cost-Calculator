import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Target, 
  BookOpen,
  Globe,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { UserInput } from '../../types'
import { OptionCard, Card } from '../ui'

// 教育类型选项
const EDUCATION_OPTIONS = [
  {
    value: 'public' as const,
    title: '公立教育',
    description: '以公立学校为主的教育路径',
    icon: <BookOpen className="w-5 h-5" />,
    details: [
      '学费相对较低',
      '师资力量稳定',
      '升学压力适中',
      '课外活动相对较少'
    ],
    costRange: '2,000-5,000元/月',
    advantages: ['成本较低', '教学质量稳定', '同伴环境多样'],
    considerations: ['竞争激烈', '个性化关注有限'],
    multiplier: '1.0x',
    color: 'blue'
  },
  {
    value: 'private' as const,
    title: '私立教育',
    description: '选择私立学校的教育路径',
    icon: <Award className="w-5 h-5" />,
    details: [
      '小班化教学',
      '师资力量较强',
      '课程设置灵活',
      '课外活动丰富'
    ],
    costRange: '8,000-20,000元/月',
    advantages: ['个性化教育', '师生比例好', '设施完善'],
    considerations: ['费用较高', '同伴圈子相对固定'],
    multiplier: '2.5x',
    color: 'purple'
  },
  {
    value: 'international' as const,
    title: '国际教育',
    description: '国际学校或双语教育路径',
    icon: <Globe className="w-5 h-5" />,
    details: [
      '双语或全英文教学',
      '国际化课程体系',
      '外教师资',
      '海外升学导向'
    ],
    costRange: '15,000-50,000元/月',
    advantages: ['国际视野', '语言优势', '海外升学便利'],
    considerations: ['费用很高', '文化适应', '升学路径特殊'],
    multiplier: '4.0x',
    color: 'green'
  }
]

// 培训态度选项
const TRAINING_OPTIONS = [
  {
    value: 'relaxed' as const,
    title: '佛系培养',
    description: '顺其自然，快乐成长为主',
    icon: <Clock className="w-5 h-5" />,
    details: [
      '重视孩子的快乐',
      '培训班较少',
      '压力相对较小',
      '成本控制较好'
    ],
    weeklyHours: '0-3小时',
    monthlyBudget: '500-1,500元',
    multiplier: '0.5x',
    color: 'green'
  },
  {
    value: 'normal' as const,
    title: '适度培养',
    description: '平衡发展，适度投入',
    icon: <Target className="w-5 h-5" />,
    details: [
      '1-2个兴趣班',
      '注重全面发展',
      '适度竞争',
      '成本适中'
    ],
    weeklyHours: '3-6小时',
    monthlyBudget: '1,500-3,000元',
    multiplier: '1.0x',
    color: 'blue'
  },
  {
    value: 'active' as const,
    title: '积极培养',
    description: '多元发展，积极投入',
    icon: <TrendingUp className="w-5 h-5" />,
    details: [
      '3-4个培训班',
      '技能全面发展',
      '竞争意识较强',
      '投入较大'
    ],
    weeklyHours: '6-10小时',
    monthlyBudget: '3,000-6,000元',
    multiplier: '2.0x',
    color: 'orange'
  },
  {
    value: 'intensive' as const,
    title: '鸡娃模式',
    description: '高强度培养，全力投入',
    icon: <Award className="w-5 h-5" />,
    details: [
      '5+个培训班',
      '高强度训练',
      '竞争激烈',
      '投入很大'
    ],
    weeklyHours: '10+小时',
    monthlyBudget: '6,000+元',
    multiplier: '3.5x',
    color: 'red'
  }
]

const EducationChoice: React.FC = () => {
  const { watch, setValue } = useFormContext<UserInput>()
  
  const educationType = watch('educationType')
  const trainingAttitude = watch('trainingAttitude')

  const handleEducationSelect = (education: UserInput['educationType']) => {
    setValue('educationType', education, { shouldValidate: true })
  }

  const handleTrainingSelect = (training: UserInput['trainingAttitude']) => {
    setValue('trainingAttitude', training, { shouldValidate: true })
  }

  // 计算总体费用影响
  const calculateTotalImpact = () => {
    const eduOption = EDUCATION_OPTIONS.find(opt => opt.value === educationType)
    const trainOption = TRAINING_OPTIONS.find(opt => opt.value === trainingAttitude)
    
    if (!eduOption || !trainOption) return null

    const eduMultiplier = parseFloat(eduOption.multiplier.replace('x', ''))
    const trainMultiplier = parseFloat(trainOption.multiplier.replace('x', ''))
    
    return {
      education: eduOption,
      training: trainOption,
      totalMultiplier: eduMultiplier * trainMultiplier
    }
  }

  const totalImpact = calculateTotalImpact()

  return (
    <div className="space-y-8">
      {/* 教育类型选择 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">教育类型选择</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {EDUCATION_OPTIONS.map((option, index) => (
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
                selected={educationType === option.value}
                onClick={() => handleEducationSelect(option.value)}
                className="h-full"
                extra={
                  <span className={`text-xs px-2 py-1 rounded ${
                    option.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    option.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {option.multiplier}
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* 选中教育类型的详细信息 */}
        {educationType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {(() => {
              const selectedOption = EDUCATION_OPTIONS.find(opt => opt.value === educationType)
              if (!selectedOption) return null

              return (
                <Card variant="ghost" padding="md">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        费用范围: {selectedOption.costRange}
                      </h4>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-green-700">优势:</h5>
                        {selectedOption.advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-sm text-gray-600">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">特点:</h4>
                      <div className="space-y-2">
                        {selectedOption.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            <span className="text-sm text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-amber-700">考虑因素:</h5>
                        <div className="mt-1 space-y-1">
                          {selectedOption.considerations.map((consideration, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <AlertTriangle className="w-3 h-3 text-amber-500" />
                              <span className="text-sm text-gray-600">{consideration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })()}
          </motion.div>
        )}
      </div>

      {/* 培训态度选择 */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">培训态度</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRAINING_OPTIONS.map((option, index) => (
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
                selected={trainingAttitude === option.value}
                onClick={() => handleTrainingSelect(option.value)}
                className="h-full"
                extra={
                  <span className={`text-xs px-2 py-1 rounded ${
                    option.color === 'green' ? 'bg-green-100 text-green-600' :
                    option.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    option.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {option.multiplier}
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* 选中培训态度的详细信息 */}
        {trainingAttitude && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {(() => {
              const selectedOption = TRAINING_OPTIONS.find(opt => opt.value === trainingAttitude)
              if (!selectedOption) return null

              return (
                <Card variant="ghost" padding="md">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">时间投入</h4>
                      <p className="text-sm text-gray-600">{selectedOption.weeklyHours}/周</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">预算范围</h4>
                      <p className="text-sm text-gray-600">{selectedOption.monthlyBudget}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">特点</h4>
                      <div className="space-y-1">
                        {selectedOption.details.slice(0, 2).map((detail, idx) => (
                          <div key={idx} className="text-sm text-gray-600">• {detail}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })()}
          </motion.div>
        )}
      </div>

      {/* 总体费用影响预览 */}
      {totalImpact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                教育投入预览
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">教育类型影响</div>
                  <div className="text-base font-medium text-blue-700">
                    {totalImpact.education.title} ({totalImpact.education.multiplier})
                  </div>
                  <div className="text-sm text-gray-500">
                    {totalImpact.education.costRange}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">培训态度影响</div>
                  <div className="text-base font-medium text-purple-700">
                    {totalImpact.training.title} ({totalImpact.training.multiplier})
                  </div>
                  <div className="text-sm text-gray-500">
                    {totalImpact.training.monthlyBudget}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    综合教育成本系数:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {totalImpact.totalMultiplier.toFixed(1)}x
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  相比基础公立教育 + 适度培养的成本倍数
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 提示信息 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-1">
              选择建议
            </h4>
            <p className="text-sm text-amber-700">
              教育选择应该结合家庭经济状况、孩子特点和未来规划。
              过度的培训可能给孩子带来压力，适度的投入往往更有效果。
              建议根据孩子的兴趣和天赋来选择培训方向。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationChoice
