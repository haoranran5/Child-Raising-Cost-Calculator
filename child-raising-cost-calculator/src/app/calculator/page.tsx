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
                      <p>计算结果基于当前市场价格和统计数据</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>包含教育、医疗、生活等主要费用类别</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>结果仅供参考，实际费用可能因个人情况而异</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">费用构成</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">基础生活费</span>
                      <span className="text-sm font-medium">30-40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">教育费用</span>
                      <span className="text-sm font-medium">25-35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">医疗保健</span>
                      <span className="text-sm font-medium">10-15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">课外活动</span>
                      <span className="text-sm font-medium">10-20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">其他费用</span>
                      <span className="text-sm font-medium">5-10%</span>
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
