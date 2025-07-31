import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Calculator, DollarSign } from 'lucide-react'
import { Button, Input, Select, Card } from '../ui'

// 直接在这里定义类型，避免导入问题
interface CalculatorFormData {
  monthlyIncome: number
  childAge: number
  location: 'tier1' | 'tier2' | 'tier3'
  educationLevel?: 'public' | 'private'
  healthcareLevel?: 'basic' | 'premium'
  extracurricular?: boolean
}

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormData) => void
  loading?: boolean
}

const CalculatorForm: FC<CalculatorFormProps> = ({ onSubmit, loading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CalculatorFormData>()

  const cityOptions = [
    { value: 'tier1', label: '一线城市（北京、上海、广州、深圳）' },
    { value: 'tier2', label: '二线城市（省会城市、计划单列市）' },
    { value: 'tier3', label: '三线及以下城市' }
  ]

  const educationOptions = [
    { value: 'basic', label: '公立教育为主' },
    { value: 'premium', label: '私立/优质教育' },
    { value: 'international', label: '国际教育' }
  ]

  const healthcareOptions = [
    { value: 'basic', label: '基础医疗保障' },
    { value: 'premium', label: '高端医疗保险' }
  ]

  return (
    <Card>
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-primary-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">基本信息</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="家庭月收入 (元)"
          type="number"
          placeholder="请输入家庭月收入"
          error={errors.monthlyIncome?.message}
          leftIcon={<DollarSign />}
          {...register('monthlyIncome', { 
            required: '请输入家庭月收入',
            min: { value: 1000, message: '月收入不能少于1000元' }
          })}
        />

        <Input
          label="孩子年龄"
          type="number"
          placeholder="请输入孩子年龄"
          error={errors.childAge?.message}
          {...register('childAge', { 
            required: '请输入孩子年龄',
            min: { value: 0, message: '年龄不能小于0' },
            max: { value: 18, message: '年龄不能大于18' }
          })}
        />

        <Select
          label="所在城市类型"
          placeholder="请选择城市类型"
          options={cityOptions}
          error={errors.location?.message}
          {...register('location', { required: '请选择所在城市类型' })}
        />

        <Select
          label="教育水平偏好"
          placeholder="请选择教育水平"
          options={educationOptions}
          helperText="选择您希望为孩子提供的教育水平"
          {...register('educationLevel')}
        />

        <Select
          label="医疗保障水平"
          placeholder="请选择医疗保障水平"
          options={healthcareOptions}
          helperText="选择您希望为孩子提供的医疗保障水平"
          {...register('healthcareLevel')}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="extracurricular"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            {...register('extracurricular')}
          />
          <label htmlFor="extracurricular" className="ml-2 block text-sm text-gray-700">
            包含课外活动费用（如兴趣班、培训班等）
          </label>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            计算养娃成本
          </Button>
        </motion.div>
      </form>
    </Card>
  )
}

export default CalculatorForm
