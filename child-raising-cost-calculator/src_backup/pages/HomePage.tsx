import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  AnimatedPage,
  AnimatedCard,
  AnimatedButton,
  AnimatedNumber,
  InViewAnimation,
  AnimatedList,
  AnimatedListItem,
} from '../components/animations/AnimatedComponents'
import {
  Calculator,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  BarChart3,
  PieChart,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react'
import { Card } from '../components/ui'
import { cn } from '../utils/cn'
import {
  buttonVariants,
  buttonSizes,
  cardVariants,
  container,
  grid,
  flex,
  responsive
} from '../utils/styles'

interface HomePageProps {
  /** 开始计算回调（可选，优先使用路由导航） */
  onStartCalculation?: () => void
  /** 查看示例回调 */
  onViewExample?: () => void
}

const HomePage: React.FC<HomePageProps> = ({
  onStartCalculation,
  onViewExample
}) => {
  const navigate = useNavigate()

  // 处理开始计算
  const handleStartCalculation = () => {
    if (onStartCalculation) {
      onStartCalculation()
    } else {
      navigate('/calculator')
    }
  }
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

  // 特色功能
  const features = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: '科学计算',
      description: '基于大数据和统计模型，提供准确的成本预估',
      color: 'blue'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: '详细分析',
      description: '多维度费用分解，清晰了解每一笔支出',
      color: 'green'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: '个性化建议',
      description: '根据您的情况提供专属的省钱建议',
      color: 'purple'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '趋势预测',
      description: '预测未来各年龄段的费用变化趋势',
      color: 'orange'
    }
  ]

  // 用户评价
  const testimonials = [
    {
      name: '张女士',
      role: '二胎妈妈',
      content: '这个工具帮我合理规划了家庭预算，现在对养娃成本心里有数了。',
      rating: 5
    },
    {
      name: '李先生',
      role: '准爸爸',
      content: '计算结果很详细，让我提前做好了财务准备，推荐给所有准父母。',
      rating: 5
    },
    {
      name: '王女士',
      role: '职场妈妈',
      content: '省钱建议很实用，已经按照建议调整了教育投入，效果不错。',
      rating: 5
    }
  ]

  return (
    <AnimatedPage className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-warning-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        <div className={cn(container({ padding: true }), 'py-20 sm:py-24 lg:py-32')}>
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className={cn(flex({ justify: 'center' }), 'mb-8')}
            >
              <div className={cn(
                flex({ align: 'center', gap: 2 }),
                'bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium'
              )}>
                <Heart className="w-4 h-4" />
                <span>科学育儿，理性规划</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className={cn(
                responsive({
                  base: 'text-4xl',
                  sm: 'text-5xl',
                  lg: 'text-6xl'
                }),
                'font-bold text-foreground mb-6'
              )}
            >
              养娃成本
              <span className="text-gradient-primary">
                计算器
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              基于大数据分析，为您提供科学、准确的养娃成本预估。
              帮助年轻父母做好财务规划，让育儿之路更从容。
            </motion.p>

            <motion.div
              variants={itemVariants}
              className={cn(
                flex({
                  direction: 'col',
                  align: 'center',
                  justify: 'center',
                  gap: 4
                }),
                'sm:flex-row mb-12'
              )}
            >
              <AnimatedButton
                onClick={handleStartCalculation}
                className={cn(
                  buttonVariants.primary,
                  buttonSizes.xl,
                  flex({ align: 'center', gap: 2 })
                )}
              >
                开始计算
                <ArrowRight className="w-5 h-5" />
              </AnimatedButton>

              {onViewExample && (
                <AnimatedButton
                  onClick={onViewExample}
                  className={cn(
                    buttonVariants.outline,
                    buttonSizes.xl
                  )}
                >
                  查看示例
                </AnimatedButton>
              )}
            </motion.div>

            {/* 统计数据 */}
            <InViewAnimation
              animation="slideUp"
              className={cn(grid({ cols: 1, gap: 8, responsive: { sm: 3 } }), 'max-w-2xl mx-auto')}
            >
              <div className="text-center">
                <AnimatedNumber
                  value={100000}
                  className="text-3xl font-bold text-primary-600"
                  suffix="+"
                  formatter={(val) => (val / 10000).toFixed(0) + '万'}
                />
                <div className="text-muted-foreground">用户使用</div>
              </div>
              <div className="text-center">
                <AnimatedNumber
                  value={95}
                  className="text-3xl font-bold text-success-600"
                  suffix="%"
                />
                <div className="text-muted-foreground">准确率</div>
              </div>
              <div className="text-center">
                <AnimatedNumber
                  value={4.9}
                  className="text-3xl font-bold text-warning-600"
                  formatter={(val) => val.toFixed(1)}
                />
                <div className="text-muted-foreground">用户评分</div>
              </div>
            </InViewAnimation>
          </div>
        </div>
      </motion.section>

      {/* 特色功能 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-background"
      >
        <div className={container({ padding: true })}>
          <div className="text-center mb-16">
            <h2 className={cn(
              responsive({
                base: 'text-3xl',
                sm: 'text-4xl'
              }),
              'font-bold text-foreground mb-4'
            )}>
              为什么选择我们？
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              专业的算法模型，全面的数据分析，为您提供最准确的养娃成本预估
            </p>
          </div>

          <AnimatedList className={grid({
            cols: 1,
            gap: 8,
            responsive: { md: 2, lg: 4 }
          })}>
            {features.map((feature, index) => (
              <AnimatedListItem key={feature.title} index={index}>
                <AnimatedCard className={cn(
                  cardVariants.default,
                  'text-center h-full p-6'
                )}>
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-4 rounded-full',
                    `bg-${feature.color === 'blue' ? 'primary' : feature.color === 'green' ? 'success' : feature.color === 'purple' ? 'secondary' : 'warning'}-100`,
                    flex({ align: 'center', justify: 'center' })
                  )}>
                    <div className={`text-${feature.color === 'blue' ? 'primary' : feature.color === 'green' ? 'success' : feature.color === 'purple' ? 'secondary' : 'warning'}-600`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </AnimatedCard>
              </AnimatedListItem>
            ))}
          </AnimatedList>
        </div>
      </motion.section>

      {/* 计算流程 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              简单三步，获得专业分析
            </h2>
            <p className="text-xl text-gray-600">
              只需几分钟，即可获得详细的养娃成本分析报告
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '填写基本信息',
                description: '选择城市、收入水平、住房情况等基本信息',
                icon: <Users className="w-8 h-8" />
              },
              {
                step: '02',
                title: '设置教育偏好',
                description: '选择教育类型和培训态度，个性化您的需求',
                icon: <PieChart className="w-8 h-8" />
              },
              {
                step: '03',
                title: '获得详细报告',
                description: '查看费用分解、对比分析和个性化建议',
                icon: <BarChart3 className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </Card>
                
                {/* 连接线 */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 用户评价 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              用户真实反馈
            </h2>
            <p className="text-xl text-gray-600">
              看看其他父母是怎么说的
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            准备好开始计算了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            只需几分钟，就能获得专业的养娃成本分析报告
          </p>
          <AnimatedButton
            onClick={handleStartCalculation}
            className={cn(
              buttonVariants.secondary,
              buttonSizes.lg,
              'px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-50',
              flex({ align: 'center', gap: 2 })
            )}
          >
            立即开始计算
            <ArrowRight className="w-5 h-5" />
          </AnimatedButton>
        </div>
      </motion.section>
    </AnimatedPage>
  )
}

export default HomePage
