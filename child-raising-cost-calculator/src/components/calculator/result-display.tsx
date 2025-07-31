'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Calendar,
  Lightbulb,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculationResult } from '@/types'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { getCostPercentages } from '@/lib/calculator'

interface ResultDisplayProps {
  result: CalculationResult
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const percentages = getCostPercentages(result.breakdown)
  
  const costItems = [
    {
      label: '基础生活费',
      amount: result.breakdown.basicLiving,
      percentage: percentages.basicLiving,
      color: 'bg-blue-500',
      description: '日常生活必需品、食物、服装等'
    },
    {
      label: '教育费用',
      amount: result.breakdown.education,
      percentage: percentages.education,
      color: 'bg-green-500',
      description: '学费、教材、学习用品等'
    },
    {
      label: '医疗费用',
      amount: result.breakdown.healthcare,
      percentage: percentages.healthcare,
      color: 'bg-red-500',
      description: '医疗保险、体检、治疗费用等'
    },
    {
      label: '课外活动',
      amount: result.breakdown.extracurricular,
      percentage: percentages.extracurricular,
      color: 'bg-purple-500',
      description: '兴趣班、培训班、体育活动等'
    },
    {
      label: '其他费用',
      amount: result.breakdown.others,
      percentage: percentages.others,
      color: 'bg-orange-500',
      description: '交通、娱乐、意外支出等'
    },
  ]

  const handleExport = () => {
    // 导出功能实现
    console.log('导出报告')
  }

  const handleShare = () => {
    // 分享功能实现
    console.log('分享结果')
  }

  return (
    <div className="space-y-6">
      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-6 h-6 mr-2" />
                年度总费用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {formatCurrency(result.totalAnnualCost)}
              </div>
              <div className="text-primary-foreground/80">
                预估养育一年的总成本
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                月度平均费用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-foreground">
                {formatCurrency(result.monthlyAverageCost)}
              </div>
              <div className="text-muted-foreground">
                平均每月需要的费用
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 费用分解 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-primary" />
              费用分解
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(item.amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.percentage}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 专业建议 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-primary" />
              专业建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button onClick={handleExport} variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          导出报告
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          分享结果
        </Button>
      </motion.div>

      {/* 计算详情 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary" />
              计算详情
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">输入参数</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>家庭月收入: {formatCurrency(result.userInput.monthlyIncome)}</div>
                  <div>孩子年龄: {result.userInput.childAge}岁</div>
                  <div>所在地区: {
                    result.userInput.location === 'tier1' ? '一线城市' :
                    result.userInput.location === 'tier2' ? '二线城市' : '三线及以下城市'
                  }</div>
                  <div>教育类型: {
                    result.userInput.educationLevel === 'public' ? '公立教育' :
                    result.userInput.educationLevel === 'private' ? '私立教育' : '国际教育'
                  }</div>
                  <div>医疗水平: {
                    result.userInput.healthcareLevel === 'basic' ? '基础医疗' : '高端医疗'
                  }</div>
                  <div>课外活动: {result.userInput.extracurricular ? '是' : '否'}</div>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">计算信息</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>计算时间: {new Date(result.timestamp).toLocaleString('zh-CN')}</div>
                  <div>数据版本: v1.0</div>
                  <div>计算方法: 基于统计数据和市场调研</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
