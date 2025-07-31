'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CalculatorForm } from '@/components/calculator/calculator-form'
import { ResultDisplay } from '@/components/calculator/result-display'
import { CalculatorFormData, CalculationResult } from '@/types'
import { calculateChildRaisingCost } from '@/lib/calculator'
import toast from 'react-hot-toast'

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async (data: CalculatorFormData) => {
    setIsCalculating(true)
    
    try {
      // 模拟计算延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const calculationResult = calculateChildRaisingCost(data)
      setResult(calculationResult)
      
      toast.success('计算完成！')
    } catch (error) {
      console.error('计算错误:', error)
      toast.error('计算过程中出现错误，请重试')
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">养娃成本计算器</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {!result ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 表单区域 */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      养娃成本计算
                    </h1>
                    <p className="text-muted-foreground">
                      请填写以下信息，我们将为您计算养育孩子的预估成本
                    </p>
                  </div>
                  
                  <CalculatorForm 
                    onSubmit={handleCalculate}
                    loading={isCalculating}
                  />
                </Card>
              </div>

              {/* 侧边栏信息 */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">计算说明</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>计算结果基于中国实际国情和统计数据</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>医疗费用已考虑医保报销和免费疫苗政策</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>教育费用根据年龄段实际需求计算</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>结果仅供参考，实际费用因地区和个人情况而异</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">年龄段特点</h3>
                  <div className="space-y-4 text-sm">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <div className="font-medium text-blue-700">0-1岁 (婴儿期)</div>
                      <div className="text-muted-foreground">奶粉、尿布是主要支出，国家疫苗免费，无教育费用</div>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <div className="font-medium text-green-700">2-3岁 (幼儿期)</div>
                      <div className="text-muted-foreground">开始有早教需求，医疗费用主要是感冒发烧等</div>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <div className="font-medium text-yellow-700">4-6岁 (学前期)</div>
                      <div className="text-muted-foreground">幼儿园费用开始，兴趣启蒙增加</div>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <div className="font-medium text-purple-700">7-12岁 (小学期)</div>
                      <div className="text-muted-foreground">教育费用稳定，课外培训逐渐增加</div>
                    </div>
                    <div className="border-l-4 border-red-500 pl-3">
                      <div className="font-medium text-red-700">13-18岁 (中学期)</div>
                      <div className="text-muted-foreground">教育投入达到峰值，补习费用大幅增加</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                  计算结果
                </h1>
                <Button onClick={handleReset} variant="outline">
                  重新计算
                </Button>
              </div>
              
              <ResultDisplay result={result} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
