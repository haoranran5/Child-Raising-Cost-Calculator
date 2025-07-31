import { CalculatorFormData } from '../types'

// 表单验证规则
export const validationRules = {
  monthlyIncome: {
    required: '请输入家庭月收入',
    min: { value: 1000, message: '月收入不能少于1000元' },
    max: { value: 1000000, message: '月收入不能超过100万元' }
  },
  childAge: {
    required: '请输入孩子年龄',
    min: { value: 0, message: '年龄不能小于0岁' },
    max: { value: 18, message: '年龄不能大于18岁' }
  },
  location: {
    required: '请选择所在城市类型'
  }
}

// 验证月收入
export const validateMonthlyIncome = (income: number): string | null => {
  if (!income || income <= 0) {
    return '请输入有效的月收入'
  }
  if (income < 1000) {
    return '月收入不能少于1000元'
  }
  if (income > 1000000) {
    return '月收入不能超过100万元'
  }
  return null
}

// 验证孩子年龄
export const validateChildAge = (age: number): string | null => {
  if (age === undefined || age === null) {
    return '请输入孩子年龄'
  }
  if (age < 0) {
    return '年龄不能小于0岁'
  }
  if (age > 18) {
    return '年龄不能大于18岁'
  }
  if (!Number.isInteger(age)) {
    return '年龄必须是整数'
  }
  return null
}

// 验证城市类型
export const validateLocation = (location: string): string | null => {
  if (!location) {
    return '请选择所在城市类型'
  }
  const validLocations = ['tier1', 'tier2', 'tier3']
  if (!validLocations.includes(location)) {
    return '请选择有效的城市类型'
  }
  return null
}

// 验证整个表单
export const validateFormData = (data: CalculatorFormData): Record<string, string> => {
  const errors: Record<string, string> = {}

  const incomeError = validateMonthlyIncome(data.monthlyIncome)
  if (incomeError) errors.monthlyIncome = incomeError

  const ageError = validateChildAge(data.childAge)
  if (ageError) errors.childAge = ageError

  const locationError = validateLocation(data.location)
  if (locationError) errors.location = locationError

  return errors
}

// 检查表单是否有效
export const isFormValid = (data: CalculatorFormData): boolean => {
  const errors = validateFormData(data)
  return Object.keys(errors).length === 0
}

// 格式化错误消息
export const formatValidationErrors = (errors: Record<string, string>): string => {
  return Object.values(errors).join('; ')
}
