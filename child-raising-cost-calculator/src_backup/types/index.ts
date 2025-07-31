/**
 * 养娃成本计算器 - 类型定义文件
 * 简化版本，确保所有类型都能正确导出和使用
 */

// ==================== 基础类型定义 ====================

/** 城市等级 */
export type CityTier = 'tier1' | 'tier2' | 'tier3'

/** 教育类型 */
export type EducationType = 'public' | 'private' | 'international'

/** 医疗水平 */
export type HealthcareLevel = 'basic' | 'premium'

/** 家庭月收入档位 */
export type IncomeLevel = 'low' | 'middle' | 'high'

/** 住房情况 */
export type HousingType = 'rental' | 'owned'

/** 家庭支持程度 */
export type FamilySupport = 'none' | 'moderate' | 'significant'

/** 培训态度 */
export type TrainingAttitude = 'relaxed' | 'normal' | 'active'

// ==================== 表单数据类型 ====================

/** 计算器表单数据 - 主要的表单接口 */
export interface CalculatorFormData {
  /** 家庭月收入 */
  monthlyIncome: number
  /** 孩子年龄 */
  childAge: number
  /** 城市等级 */
  location: CityTier
  /** 教育类型 */
  educationLevel?: EducationType
  /** 医疗水平 */
  healthcareLevel?: HealthcareLevel
  /** 是否参加课外活动 */
  extracurricular?: boolean
}

/** 用户输入数据 */
export interface UserInput {
  /** 城市等级 */
  cityTier: CityTier
  /** 家庭月收入档位 */
  incomeLevel: IncomeLevel
  /** 住房情况 */
  housingType: HousingType
  /** 家庭支持程度 */
  familySupport: FamilySupport
  /** 教育选择 */
  educationType: EducationType
  /** 培训态度 */
  trainingAttitude: TrainingAttitude
  /** 孩子当前年龄 */
  childAge: number
  /** 计划生育孩子数量 */
  plannedChildren?: number
  /** 是否考虑通胀 */
  considerInflation?: boolean
  /** 自定义月收入 */
  customIncome?: number
}

// ==================== 计算结果类型 ====================

/** 费用分解 */
export interface CostBreakdown {
  /** 基础生活费 */
  basicLiving: number
  /** 教育费用 */
  education: number
  /** 医疗费用 */
  healthcare: number
  /** 课外活动费用 */
  extracurricular: number
  /** 其他费用 */
  others: number
}

/** 计算结果 */
export interface CalculationResult {
  /** 年度总费用 */
  totalAnnualCost: number
  /** 月度平均费用 */
  monthlyAverageCost: number
  /** 费用分解 */
  breakdown: CostBreakdown
  /** 建议 */
  recommendations: string[]
  /** 用户输入 */
  userInput: UserInput
  /** 计算时间戳 */
  timestamp: string
}

// ==================== 对比数据类型 ====================

/** 对比数据 */
export interface ComparisonData {
  /** 用户费用 */
  userCost: number
  /** 全国平均 */
  nationalAverage: number
  /** 城市平均 */
  cityAverage: number
  /** 差异百分比 */
  differencePercentage: number
}

// ==================== UI组件类型 ====================

/** 选择器选项 */
export interface SelectOption<T = string> {
  value: T
  label: string
  description?: string
  disabled?: boolean
}

/** 表单验证错误 */
export interface ValidationError {
  field: string
  message: string
  code?: string
}

/** 表单状态 */
export interface FormState {
  isValid: boolean
  isSubmitting: boolean
  errors: ValidationError[]
  touched: Record<string, boolean>
}

// ==================== 导出数据类型 ====================

/** 导出数据格式 */
export interface ExportData {
  /** 用户输入 */
  userInput: UserInput
  /** 计算结果 */
  result: CalculationResult
  /** 导出时间 */
  exportTime: string
  /** 版本 */
  version: string
}

// ==================== API响应类型 ====================

/** API响应基础类型 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}

// ==================== 统计数据类型 ====================

/** 统计数据 */
export interface StatisticsData {
  /** 总计算次数 */
  totalCalculations: number
  /** 平均费用统计 */
  averageCosts: Record<CityTier, number>
  /** 更新时间 */
  lastUpdated: string
}

// ==================== 应用配置类型 ====================

/** 应用配置 */
export interface AppConfig {
  /** 应用版本 */
  version: string
  /** 计算引擎版本 */
  calculatorVersion: string
  /** 数据更新时间 */
  dataVersion: string
  /** 支持的功能 */
  features: {
    comparison: boolean
    export: boolean
    multipleChildren: boolean
    inflationAdjustment: boolean
  }
}

// ==================== 工具类型 ====================

/** 深度可选类型 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** 键值对类型 */
export type KeyValuePair<K extends string | number | symbol = string, V = any> = {
  key: K
  value: V
}

// ==================== 错误处理类型 ====================

/** 错误代码 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/** 计算状态 */
export enum CalculationStatus {
  IDLE = 'IDLE',
  CALCULATING = 'CALCULATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
