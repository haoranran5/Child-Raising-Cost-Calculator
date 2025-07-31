import { useState } from 'react'
import { 
  Button, 
  Card, 
  OptionCard, 
  ProgressSteps 
} from '../components/ui'
import { 
  Download, 
  Heart, 
  Star, 
  Home, 
  School, 
  DollarSign,
  Users,
  GraduationCap,
  Target
} from 'lucide-react'

const ComponentShowcase = () => {
  const [selectedOption, setSelectedOption] = useState<string>('option1')
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([0])

  const steps = [
    {
      id: 'basic-info',
      title: '基本信息',
      description: '填写家庭基本情况'
    },
    {
      id: 'preferences',
      title: '偏好设置',
      description: '选择教育和生活偏好'
    },
    {
      id: 'calculation',
      title: '成本计算',
      description: '查看详细费用分析'
    },
    {
      id: 'results',
      title: '结果报告',
      description: '获取完整报告',
      optional: true
    }
  ]

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    // 模拟完成前面的步骤
    const newCompleted = Array.from({ length: stepIndex }, (_, i) => i)
    setCompletedSteps(newCompleted)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      setCompletedSteps([...completedSteps, currentStep])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            UI组件展示
          </h1>
          <p className="text-gray-600">
            展示项目中使用的基础UI组件
          </p>
        </div>

        {/* Button组件展示 */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Button 按钮组件</h2>
          
          <div className="space-y-6">
            {/* 不同变体 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">变体样式</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* 不同尺寸 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">尺寸</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* 带图标 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">图标按钮</h3>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Download />}>下载报告</Button>
                <Button rightIcon={<Heart />} variant="secondary">收藏</Button>
                <Button leftIcon={<Star />} rightIcon={<Download />}>
                  评价并下载
                </Button>
              </div>
            </div>

            {/* 状态 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">状态</h3>
              <div className="flex flex-wrap gap-3">
                <Button loading>加载中...</Button>
                <Button disabled>禁用状态</Button>
                <Button fullWidth>全宽按钮</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Card组件展示 */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Card 卡片组件</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default" padding="sm">
              <h3 className="font-medium">默认卡片</h3>
              <p className="text-sm text-gray-600 mt-1">基础样式卡片</p>
            </Card>
            
            <Card variant="elevated" padding="md">
              <h3 className="font-medium">高阴影卡片</h3>
              <p className="text-sm text-gray-600 mt-1">更明显的阴影效果</p>
            </Card>
            
            <Card variant="outlined" padding="md">
              <h3 className="font-medium">边框卡片</h3>
              <p className="text-sm text-gray-600 mt-1">突出的边框样式</p>
            </Card>
            
            <Card variant="ghost" padding="md" hoverable>
              <h3 className="font-medium">幽灵卡片</h3>
              <p className="text-sm text-gray-600 mt-1">悬停查看效果</p>
            </Card>
          </div>
        </Card>

        {/* OptionCard组件展示 */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">OptionCard 选项卡片</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <OptionCard
              title="一线城市"
              description="北京、上海、广州、深圳等"
              icon={<Home />}
              selected={selectedOption === 'option1'}
              onClick={() => setSelectedOption('option1')}
              extra={<span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">高成本</span>}
            />
            
            <OptionCard
              title="公立教育"
              description="以公立学校为主的教育选择"
              icon={<School />}
              selected={selectedOption === 'option2'}
              onClick={() => setSelectedOption('option2')}
              extra={<span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">经济</span>}
            />
            
            <OptionCard
              title="中等收入"
              description="月收入15,000-25,000元"
              icon={<DollarSign />}
              selected={selectedOption === 'option3'}
              onClick={() => setSelectedOption('option3')}
            />
            
            <OptionCard
              title="适度支持"
              description="家庭偶尔提供帮助"
              icon={<Users />}
              selected={selectedOption === 'option4'}
              onClick={() => setSelectedOption('option4')}
            />
            
            <OptionCard
              title="国际教育"
              description="国际学校或双语教育"
              icon={<GraduationCap />}
              selected={selectedOption === 'option5'}
              onClick={() => setSelectedOption('option5')}
              extra={<span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">高端</span>}
            />
            
            <OptionCard
              title="积极培训"
              description="重视各类培训和兴趣班"
              icon={<Target />}
              disabled
              extra={<span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">暂不可用</span>}
            />
          </div>
        </Card>

        {/* ProgressSteps组件展示 */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">ProgressSteps 进度步骤</h2>
          
          <div className="space-y-8">
            {/* 水平布局 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">水平布局</h3>
              <ProgressSteps
                steps={steps}
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
                orientation="horizontal"
              />
              
              <div className="mt-4 flex gap-2">
                <Button 
                  size="sm" 
                  onClick={nextStep}
                  disabled={currentStep >= steps.length - 1}
                >
                  下一步
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => {
                    setCurrentStep(0)
                    setCompletedSteps([])
                  }}
                >
                  重置
                </Button>
              </div>
            </div>

            {/* 垂直布局 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">垂直布局</h3>
              <div className="max-w-md">
                <ProgressSteps
                  steps={steps}
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onStepClick={handleStepClick}
                  orientation="vertical"
                  showDescription={true}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* 组合使用示例 */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">组合使用示例</h2>
          
          <div className="space-y-4">
            <ProgressSteps
              steps={[
                { id: '1', title: '选择城市', description: '选择您所在的城市类型' },
                { id: '2', title: '填写信息', description: '填写家庭基本信息' },
                { id: '3', title: '查看结果', description: '获取详细的成本分析' }
              ]}
              currentStep={1}
              completedSteps={[0]}
              orientation="horizontal"
            />
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <OptionCard
                title="基础配置"
                description="适合大多数家庭的标准配置"
                icon={<Home />}
                selected={true}
              />
              <OptionCard
                title="高端配置"
                description="追求更好教育和生活品质"
                icon={<Star />}
              />
              <OptionCard
                title="经济配置"
                description="注重性价比的经济选择"
                icon={<DollarSign />}
              />
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="secondary">上一步</Button>
              <Button>继续</Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}

export default ComponentShowcase
