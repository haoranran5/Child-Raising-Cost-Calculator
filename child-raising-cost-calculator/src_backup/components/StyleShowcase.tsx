import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Star, 
  Zap, 
  Shield, 
  Sparkles,
  Palette,
  Layout,
  Type,
  MousePointer
} from 'lucide-react'
import { 
  cn, 
  buttonVariants, 
  buttonSizes, 
  cardVariants, 
  inputVariants,
  badgeVariants,
  responsive,
  container,
  grid,
  flex,
  transition,
  animate,
  darkMode
} from '../utils/styles'

const StyleShowcase: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light')
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'outline'>('primary')

  return (
    <div className={cn(
      'min-h-screen bg-background text-foreground',
      selectedTheme === 'dark' && 'dark'
    )}>
      {/* 头部 */}
      <div className={container({ padding: true })}>
        <div className="py-12 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            样式系统展示
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            现代化的设计系统，包含完整的组件样式、动画效果和响应式布局
          </motion.p>
          
          {/* 主题切换 */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setSelectedTheme('light')}
              className={cn(
                buttonVariants.outline,
                buttonSizes.md,
                selectedTheme === 'light' && buttonVariants.primary,
                transition(['all'], '200ms')
              )}
            >
              ☀️ 浅色模式
            </button>
            <button
              onClick={() => setSelectedTheme('dark')}
              className={cn(
                buttonVariants.outline,
                buttonSizes.md,
                selectedTheme === 'dark' && buttonVariants.primary,
                transition(['all'], '200ms')
              )}
            >
              🌙 深色模式
            </button>
          </div>
        </div>
      </div>

      {/* 颜色系统 */}
      <section className={container({ padding: true })}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={flex({ align: 'center', gap: 3, justify: 'center' })}>
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">颜色系统</h2>
          </div>
          
          <div className={grid({ cols: 1, gap: 8, responsive: { md: 2, lg: 4 } })}>
            {/* 主色调 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">主色调</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="flex items-center gap-3">
                    <div 
                      className={`w-8 h-8 rounded-md bg-primary-${shade}`}
                    />
                    <span className="text-sm font-mono">primary-{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 语义化颜色 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">语义化颜色</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-success" />
                  <span className="text-sm">Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-warning" />
                  <span className="text-sm">Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-error" />
                  <span className="text-sm">Error</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-info" />
                  <span className="text-sm">Info</span>
                </div>
              </div>
            </div>

            {/* 中性色 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">中性色</h3>
              <div className="space-y-2">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="flex items-center gap-3">
                    <div 
                      className={`w-8 h-8 rounded-md bg-gray-${shade}`}
                    />
                    <span className="text-sm font-mono">gray-{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 渐变效果 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">渐变效果</h3>
              <div className="space-y-3">
                <div className="h-12 rounded-lg bg-gradient-to-r from-primary-400 to-primary-600" />
                <div className="h-12 rounded-lg bg-gradient-to-r from-success-400 to-info-500" />
                <div className="h-12 rounded-lg bg-gradient-to-r from-warning-400 to-error-500" />
                <div className="h-12 rounded-lg bg-gradient-radial from-primary-400 to-primary-700" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 按钮系统 */}
      <section className={container({ padding: true })}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={flex({ align: 'center', gap: 3, justify: 'center' })}>
            <MousePointer className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">按钮系统</h2>
          </div>
          
          <div className={cardVariants.elevated + ' p-8'}>
            {/* 变体选择器 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">选择变体</h3>
              <div className={flex({ gap: 2, wrap: true })}>
                {(['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant as any)}
                    className={cn(
                      buttonVariants[variant],
                      buttonSizes.sm,
                      transition(['all'], '200ms')
                    )}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* 尺寸展示 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">尺寸变体</h3>
              <div className={flex({ gap: 4, wrap: true, align: 'center' })}>
                {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                  <button
                    key={size}
                    className={cn(
                      buttonVariants[selectedVariant],
                      buttonSizes[size],
                      transition(['all'], '200ms')
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 状态展示 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">按钮状态</h3>
              <div className={flex({ gap: 4, wrap: true })}>
                <button className={cn(buttonVariants.primary, buttonSizes.md)}>
                  正常状态
                </button>
                <button className={cn(buttonVariants.primary, buttonSizes.md, 'hover:scale-105')}>
                  悬停效果
                </button>
                <button className={cn(buttonVariants.primary, buttonSizes.md)} disabled>
                  禁用状态
                </button>
                <button className={cn(buttonVariants.primary, buttonSizes.md, animate('pulse'))}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  加载中
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 卡片系统 */}
      <section className={container({ padding: true })}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={flex({ align: 'center', gap: 3, justify: 'center' })}>
            <Layout className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">卡片系统</h2>
          </div>
          
          <div className={grid({ cols: 1, gap: 6, responsive: { md: 2, lg: 3 } })}>
            {/* 默认卡片 */}
            <div className={cn(cardVariants.default, 'p-6')}>
              <div className={flex({ align: 'center', gap: 3 })}>
                <Heart className="w-5 h-5 text-error" />
                <h3 className="text-lg font-semibold">默认卡片</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                这是一个默认样式的卡片，具有基础的阴影和边框效果。
              </p>
            </div>

            {/* 提升卡片 */}
            <div className={cn(cardVariants.elevated, 'p-6')}>
              <div className={flex({ align: 'center', gap: 3 })}>
                <Star className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">提升卡片</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                这是一个提升样式的卡片，具有更明显的阴影效果。
              </p>
            </div>

            {/* 轮廓卡片 */}
            <div className={cn(cardVariants.outlined, 'p-6')}>
              <div className={flex({ align: 'center', gap: 3 })}>
                <Shield className="w-5 h-5 text-success" />
                <h3 className="text-lg font-semibold">轮廓卡片</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                这是一个轮廓样式的卡片，具有明显的边框效果。
              </p>
            </div>

            {/* 玻璃态卡片 */}
            <div className={cn(cardVariants.glass, 'p-6')}>
              <div className={flex({ align: 'center', gap: 3 })}>
                <Zap className="w-5 h-5 text-info" />
                <h3 className="text-lg font-semibold">玻璃态卡片</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                这是一个玻璃态样式的卡片，具有模糊背景效果。
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 输入框和徽章 */}
      <section className={container({ padding: true })}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={flex({ align: 'center', gap: 3, justify: 'center' })}>
            <Type className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">表单组件</h2>
          </div>
          
          <div className={grid({ cols: 1, gap: 8, responsive: { lg: 2 } })}>
            {/* 输入框 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">输入框变体</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">默认输入框</label>
                  <input 
                    type="text" 
                    placeholder="请输入内容..." 
                    className={inputVariants.default}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">错误状态</label>
                  <input 
                    type="text" 
                    placeholder="输入有误..." 
                    className={inputVariants.error}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">成功状态</label>
                  <input 
                    type="text" 
                    placeholder="输入正确..." 
                    className={inputVariants.success}
                  />
                </div>
              </div>
            </div>

            {/* 徽章 */}
            <div className={cardVariants.default + ' p-6'}>
              <h3 className="text-lg font-semibold mb-4">徽章变体</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">状态徽章</p>
                  <div className={flex({ gap: 2, wrap: true })}>
                    <span className={badgeVariants.default}>默认</span>
                    <span className={badgeVariants.secondary}>次要</span>
                    <span className={badgeVariants.destructive}>危险</span>
                    <span className={badgeVariants.outline}>轮廓</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">带图标徽章</p>
                  <div className={flex({ gap: 2, wrap: true })}>
                    <span className={cn(badgeVariants.default, flex({ align: 'center', gap: 1 }))}>
                      <Star className="w-3 h-3" />
                      推荐
                    </span>
                    <span className={cn(badgeVariants.secondary, flex({ align: 'center', gap: 1 }))}>
                      <Zap className="w-3 h-3" />
                      热门
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 动画展示 */}
      <section className={container({ padding: true })}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">动画效果</h2>
          
          <div className={grid({ cols: 1, gap: 6, responsive: { md: 2, lg: 4 } })}>
            <div className={cn(cardVariants.default, 'p-6 text-center', animate('bounce-in'))}>
              <h3 className="font-semibold">弹入动画</h3>
              <p className="text-sm text-muted-foreground mt-2">bounce-in</p>
            </div>
            
            <div className={cn(cardVariants.default, 'p-6 text-center', animate('fade-in'))}>
              <h3 className="font-semibold">淡入动画</h3>
              <p className="text-sm text-muted-foreground mt-2">fade-in</p>
            </div>
            
            <div className={cn(cardVariants.default, 'p-6 text-center', animate('slide-up'))}>
              <h3 className="font-semibold">滑入动画</h3>
              <p className="text-sm text-muted-foreground mt-2">slide-up</p>
            </div>
            
            <div className={cn(cardVariants.default, 'p-6 text-center', animate('float'))}>
              <h3 className="font-semibold">浮动动画</h3>
              <p className="text-sm text-muted-foreground mt-2">float</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 底部 */}
      <footer className={container({ padding: true })}>
        <div className="py-12 text-center border-t border-border">
          <p className="text-muted-foreground">
            现代化样式系统 - 为养娃成本计算器量身定制
          </p>
        </div>
      </footer>
    </div>
  )
}

export default StyleShowcase
