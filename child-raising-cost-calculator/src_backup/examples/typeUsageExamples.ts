/**
 * TypeScript 类型使用示例
 * 
 * 本文件展示了如何使用项目中定义的各种类型
 */

import {
  UserInput,
  CostBreakdown,
  ComparisonData,
  CalculationResult,
  CityTier,
  IncomeLevel,
  HousingType,
  FamilySupport,
  EducationType,
  TrainingAttitude,
  AgeGroup,
  CostCategory,
  CalculatorFormData,
  SelectOption,
  ValidationError,
  ExportData
} from '../types'

// ==================== 用户输入示例 ====================

// 基本用户输入
const basicUserInput: UserInput = {
  cityTier: 'tier1',
  incomeLevel: 'middle',
  housingType: 'owned',
  familySupport: 'moderate',
  educationType: 'public',
  trainingAttitude: 'normal',
  childAge: 5
}

// 完整用户输入（包含可选字段）
const completeUserInput: UserInput = {
  cityTier: 'new-tier1',
  incomeLevel: 'upper-middle',
  housingType: 'school-district',
  familySupport: 'significant',
  educationType: 'private',
  trainingAttitude: 'active',
  childAge: 8,
  plannedChildren: 2,
  considerInflation: true,
  customIncome: 35000
}

// 向后兼容的表单数据
const legacyFormData: CalculatorFormData = {
  ...basicUserInput,
  monthlyIncome: 20000,
  location: 'tier1',
  educationLevel: 'public',
  healthcareLevel: 'basic',
  extracurricular: true
}

// ==================== 费用分解示例 ====================

const costBreakdownExample: CostBreakdown = {
  totalCost: 324000,
  yearlyAverage: 18000,
  monthlyAverage: 1500,
  byAgeGroup: [
    {
      ageGroup: 'infant',
      ageRange: { min: 0, max: 2 },
      totalCost: 54000,
      yearlyAverage: 18000,
      monthlyAverage: 1500,
      items: [
        {
          category: 'basic-needs',
          name: '基本需求',
          monthlyAmount: 800,
          yearlyAmount: 9600,
          description: '奶粉、尿布、食物等',
          isEssential: true,
          percentage: 53.3
        }
      ]
    }
  ],
  byCategory: {
    'basic-needs': {
      category: 'basic-needs',
      name: '基本需求',
      monthlyAmount: 800,
      yearlyAmount: 9600,
      isEssential: true,
      percentage: 53.3
    },
    'education': {
      category: 'education',
      name: '教育费用',
      monthlyAmount: 300,
      yearlyAmount: 3600,
      isEssential: true,
      percentage: 20.0
    },
    'healthcare': {
      category: 'healthcare',
      name: '医疗保健',
      monthlyAmount: 200,
      yearlyAmount: 2400,
      isEssential: true,
      percentage: 13.3
    },
    'housing': {
      category: 'housing',
      name: '住房相关',
      monthlyAmount: 100,
      yearlyAmount: 1200,
      isEssential: false,
      percentage: 6.7
    },
    'clothing': {
      category: 'clothing',
      name: '服装费用',
      monthlyAmount: 50,
      yearlyAmount: 600,
      isEssential: true,
      percentage: 3.3
    },
    'entertainment': {
      category: 'entertainment',
      name: '娱乐活动',
      monthlyAmount: 30,
      yearlyAmount: 360,
      isEssential: false,
      percentage: 2.0
    },
    'extracurricular': {
      category: 'extracurricular',
      name: '课外培训',
      monthlyAmount: 20,
      yearlyAmount: 240,
      isEssential: false,
      percentage: 1.3
    },
    'transportation': {
      category: 'transportation',
      name: '交通费用',
      monthlyAmount: 0,
      yearlyAmount: 0,
      isEssential: false,
      percentage: 0
    },
    'insurance': {
      category: 'insurance',
      name: '保险费用',
      monthlyAmount: 0,
      yearlyAmount: 0,
      isEssential: false,
      percentage: 0
    },
    'savings': {
      category: 'savings',
      name: '储蓄投资',
      monthlyAmount: 0,
      yearlyAmount: 0,
      isEssential: false,
      percentage: 0
    }
  },
  essentialCosts: 16200,
  optionalCosts: 1800,
  incomeRatio: 0.075
}

// ==================== 对比数据示例 ====================

const comparisonDataExample: ComparisonData = {
  userCost: 18000,
  averages: {
    national: 15000,
    city: 22000,
    sameIncomeLevel: 17000,
    sameEducationType: 16000
  },
  analysis: {
    vsNational: {
      amount: 3000,
      percentage: 20,
      isHigher: true
    },
    vsCity: {
      amount: -4000,
      percentage: -18.2,
      isHigher: false
    },
    vsIncomeLevel: {
      amount: 1000,
      percentage: 5.9,
      isHigher: true
    },
    mainFactors: ['城市等级', '教育选择', '培训态度']
  },
  ranking: {
    nationalPercentile: 75,
    cityPercentile: 45,
    levelDescription: '中等偏上'
  }
}

// ==================== 完整计算结果示例 ====================

const calculationResultExample: CalculationResult = {
  userInput: completeUserInput,
  costBreakdown: costBreakdownExample,
  yearlyProjections: [
    {
      year: 2024,
      childAge: 8,
      ageGroup: 'primary',
      totalCost: 18000,
      cumulativeCost: 18000,
      inflationAdjustedCost: 18000,
      breakdown: {
        'basic-needs': 9600,
        'education': 3600,
        'healthcare': 2400,
        'housing': 1200,
        'clothing': 600,
        'entertainment': 360,
        'extracurricular': 240,
        'transportation': 0,
        'insurance': 0,
        'savings': 0
      }
    }
  ],
  comparisonData: comparisonDataExample,
  chartData: {
    ageTrend: [
      { age: 0, cost: 1500, ageGroup: 'infant' },
      { age: 3, cost: 1200, ageGroup: 'toddler' },
      { age: 6, cost: 1400, ageGroup: 'primary' }
    ],
    categoryBreakdown: [
      { age: 8, cost: 800, category: 'basic-needs', label: '基本需求' },
      { age: 8, cost: 300, category: 'education', label: '教育费用' }
    ],
    yearlyForecast: [
      { age: 8, cost: 18000, label: '2024年' },
      { age: 9, cost: 19000, label: '2025年' }
    ]
  },
  timestamp: '2024-01-01T00:00:00Z',
  version: '1.0.0'
}

// ==================== 表单选项示例 ====================

const cityOptions: SelectOption<CityTier>[] = [
  { value: 'tier1', label: '一线城市', description: '北上广深' },
  { value: 'new-tier1', label: '新一线城市', description: '成都、杭州等' },
  { value: 'tier2', label: '二线城市', description: '省会城市' },
  { value: 'tier3-4', label: '三四线城市', description: '地级市及县级市' }
]

const incomeOptions: SelectOption<IncomeLevel>[] = [
  { value: 'low', label: '低收入', description: '月收入8000元以下' },
  { value: 'lower-middle', label: '中低收入', description: '月收入8000-15000元' },
  { value: 'middle', label: '中等收入', description: '月收入15000-25000元' },
  { value: 'upper-middle', label: '中高收入', description: '月收入25000-50000元' },
  { value: 'high', label: '高收入', description: '月收入50000元以上' }
]

// ==================== 验证错误示例 ====================

const validationErrors: ValidationError[] = [
  {
    field: 'childAge',
    message: '孩子年龄必须在0-18岁之间',
    code: 'INVALID_AGE_RANGE'
  },
  {
    field: 'monthlyIncome',
    message: '月收入不能为空',
    code: 'REQUIRED_FIELD'
  }
]

// ==================== 导出数据示例 ====================

const exportDataExample: ExportData = {
  userInput: completeUserInput,
  result: calculationResultExample,
  exportTime: '2024-01-01T12:00:00Z',
  version: '1.0.0',
  metadata: {
    appVersion: '1.0.0',
    userAgent: 'Mozilla/5.0...',
    locale: 'zh-CN'
  }
}

// ==================== 类型守卫示例 ====================

function isCityTier(value: string): value is CityTier {
  return ['tier1', 'new-tier1', 'tier2', 'tier3-4'].includes(value)
}

function isValidAgeGroup(age: number): AgeGroup {
  if (age <= 2) return 'infant'
  if (age <= 5) return 'toddler'
  if (age <= 7) return 'preschool'
  if (age <= 12) return 'primary'
  if (age <= 15) return 'middle'
  return 'high'
}

// ==================== 工具函数示例 ====================

function getCostCategoryLabel(category: CostCategory): string {
  const labels: Record<CostCategory, string> = {
    'basic-needs': '基本需求',
    'education': '教育费用',
    'healthcare': '医疗保健',
    'housing': '住房相关',
    'clothing': '服装费用',
    'entertainment': '娱乐活动',
    'extracurricular': '课外培训',
    'transportation': '交通费用',
    'insurance': '保险费用',
    'savings': '储蓄投资'
  }
  return labels[category]
}

function validateUserInput(input: Partial<UserInput>): ValidationError[] {
  const errors: ValidationError[] = []
  
  if (!input.childAge || input.childAge < 0 || input.childAge > 18) {
    errors.push({
      field: 'childAge',
      message: '孩子年龄必须在0-18岁之间',
      code: 'INVALID_AGE_RANGE'
    })
  }
  
  if (!input.cityTier) {
    errors.push({
      field: 'cityTier',
      message: '请选择城市等级',
      code: 'REQUIRED_FIELD'
    })
  }
  
  return errors
}

// 导出示例数据供其他文件使用
export {
  basicUserInput,
  completeUserInput,
  legacyFormData,
  costBreakdownExample,
  comparisonDataExample,
  calculationResultExample,
  cityOptions,
  incomeOptions,
  validationErrors,
  exportDataExample,
  isCityTier,
  isValidAgeGroup,
  getCostCategoryLabel,
  validateUserInput
}
