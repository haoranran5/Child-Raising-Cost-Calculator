'use client'

import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Shield, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: Calculator,
    title: '精准计算',
    description: '基于真实数据和科学算法，提供准确的养娃成本估算'
  },
  {
    icon: TrendingUp,
    title: '趋势分析',
    description: '分析不同年龄段的费用变化，帮助长期财务规划'
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '所有计算在本地进行，保护您的隐私和数据安全'
  }
]

const stats = [
  { label: '用户信赖', value: '10万+', suffix: '' },
  { label: '计算准确率', value: '95', suffix: '%' },
  { label: '覆盖城市', value: '300', suffix: '+' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">养娃成本计算器</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/calculator">
              <Button variant="outline">开始计算</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary/10 rounded-full">
                <Calculator className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              科学计算
              <span className="text-primary"> 养娃成本</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              基于真实数据和科学算法，为您提供准确的养育成本估算，
              帮助家庭做出明智的财务规划决策
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/calculator">
                <Button size="lg" className="w-full sm:w-auto">
                  立即开始计算
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  查看计算示例
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              专业、准确、安全的养娃成本计算工具
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              开始您的财务规划之旅
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              只需几分钟，获得专业的养娃成本分析报告
            </p>
            <Link href="/calculator">
              <Button size="lg" variant="secondary">
                免费开始计算
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-semibold">养娃成本计算器</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 养娃成本计算器. 保留所有权利.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
