/**
 * 养娃成本基础数据配置
 * 
 * 基于2024年中国养育成本调研数据
 * 数据来源：国家统计局、育儿成本调研报告、各地教育部门统计
 */

import { 
  CityTier, 
  IncomeLevel, 
  AgeGroup, 
  CostCategory,
  HousingType,
  FamilySupport,
  EducationType,
  TrainingAttitude
} from '../types'

// ==================== 城市系数配置 ====================

/**
 * 城市等级费用系数
 * 基于各城市平均消费水平和教育成本差异
 */
export const CITY_COST_MULTIPLIERS: Record<CityTier, number> = {
  'tier1': 2.2,        // 一线城市：北上广深
  'new-tier1': 1.8,    // 新一线：成都、杭州、重庆、武汉等
  'tier2': 1.4,        // 二线城市：省会城市
  'tier3-4': 1.0       // 三四线城市：基准
} as const

/**
 * 城市等级详细信息
 */
export const CITY_DETAILS = {
  'tier1': {
    label: '一线城市',
    examples: ['北京', '上海', '广州', '深圳'],
    avgIncome: 12000,
    housingCostRatio: 0.4,
    educationCostRatio: 0.25
  },
  'new-tier1': {
    label: '新一线城市', 
    examples: ['成都', '杭州', '重庆', '武汉', '西安', '苏州'],
    avgIncome: 8500,
    housingCostRatio: 0.3,
    educationCostRatio: 0.2
  },
  'tier2': {
    label: '二线城市',
    examples: ['南京', '青岛', '大连', '宁波', '厦门'],
    avgIncome: 6500,
    housingCostRatio: 0.25,
    educationCostRatio: 0.18
  },
  'tier3-4': {
    label: '三四线城市',
    examples: ['其他地级市', '县级市'],
    avgIncome: 4500,
    housingCostRatio: 0.2,
    educationCostRatio: 0.15
  }
} as const

// ==================== 收入影响系数 ====================

/**
 * 收入水平对消费的影响系数
 * 高收入家庭在教育和生活品质上投入更多
 */
export const INCOME_IMPACT_MULTIPLIERS: Record<IncomeLevel, {
  basic: number      // 基础生活费用系数
  education: number  // 教育费用系数
  quality: number    // 生活品质系数
}> = {
  'low': {           // 月收入 < 8k
    basic: 0.7,
    education: 0.6,
    quality: 0.5
  },
  'lower-middle': {  // 月收入 8k-15k
    basic: 0.85,
    education: 0.8,
    quality: 0.7
  },
  'middle': {        // 月收入 15k-25k (基准)
    basic: 1.0,
    education: 1.0,
    quality: 1.0
  },
  'upper-middle': {  // 月收入 25k-50k
    basic: 1.2,
    education: 1.5,
    quality: 1.6
  },
  'high': {          // 月收入 > 50k
    basic: 1.4,
    education: 2.2,
    quality: 2.5
  }
} as const

// ==================== 其他影响因素系数 ====================

/**
 * 住房类型影响系数
 */
export const HOUSING_IMPACT_MULTIPLIERS: Record<HousingType, number> = {
  'rental': 1.15,        // 租房：需要考虑租金上涨和搬家成本
  'owned': 1.0,          // 有房：基准
  'school-district': 1.3 // 学区房：额外的房贷或租金成本
} as const

/**
 * 家庭支持影响系数（支持越多，成本越低）
 */
export const FAMILY_SUPPORT_MULTIPLIERS: Record<FamilySupport, number> = {
  'none': 1.4,          // 无支持：需要请保姆或托管
  'minimal': 1.2,       // 最少支持：偶尔帮忙
  'moderate': 1.0,      // 适度支持：基准
  'significant': 0.8,   // 较多支持：经常帮忙
  'full': 0.6          // 全面支持：全职帮忙
} as const

/**
 * 教育类型影响系数
 */
export const EDUCATION_TYPE_MULTIPLIERS: Record<EducationType, number> = {
  'public': 1.0,        // 公立教育：基准
  'private': 2.5,       // 私立教育
  'international': 5.0  // 国际教育
} as const

/**
 * 培训态度影响系数
 */
export const TRAINING_ATTITUDE_MULTIPLIERS: Record<TrainingAttitude, number> = {
  'relaxed': 0.3,       // 佛系：很少报班
  'normal': 1.0,        // 普通：基准
  'active': 2.0,        // 积极：较多投入
  'intensive': 4.0      // 鸡娃：大量投入
} as const

// ==================== 基础费用标准 ====================

/**
 * 年龄段基础费用标准（月均，单位：元）
 * 基于三四线城市中等收入家庭的平均支出
 */
export const AGE_GROUP_BASE_COSTS = {
  // 0-3岁：婴幼儿期
  'infant': {
    ageRange: { min: 0, max: 3 },
    label: '婴幼儿期 (0-3岁)',
    costs: {
      'basic-needs': 1800,      // 奶粉、尿布、辅食、日用品
      'healthcare': 600,        // 疫苗、体检、医疗保险、常见病治疗
      'housing': 400,           // 住房分摊（儿童房装修、安全设施）
      'clothing': 300,          // 婴幼儿服装、鞋帽
      'education': 800,         // 早教、托育费用
      'entertainment': 200,     // 玩具、图书
      'extracurricular': 0,     // 此阶段无培训
      'transportation': 150,    // 出行、就医交通
      'insurance': 200,         // 儿童保险
      'savings': 300           // 教育储蓄
    },
    totalMonthly: 4750,
    description: '需要大量基础护理，托育成本较高'
  },

  // 3-6岁：学前期
  'toddler': {
    ageRange: { min: 3, max: 6 },
    label: '学前期 (3-6岁)',
    costs: {
      'basic-needs': 1200,      // 食物、日用品（减少奶粉等）
      'healthcare': 400,        // 体检、医疗保险、常见病
      'housing': 300,           // 住房分摊
      'clothing': 250,          // 儿童服装
      'education': 1500,        // 幼儿园费用（公立基准）
      'entertainment': 300,     // 玩具、游乐场、图书
      'extracurricular': 600,   // 兴趣班启蒙（美术、音乐等）
      'transportation': 200,    // 接送、出行
      'insurance': 200,         // 儿童保险
      'savings': 400           // 教育储蓄
    },
    totalMonthly: 5350,
    description: '幼儿园阶段，开始兴趣培养'
  },

  // 6-12岁：小学期
  'primary': {
    ageRange: { min: 6, max: 12 },
    label: '小学期 (6-12岁)',
    costs: {
      'basic-needs': 1000,      // 食物、日用品
      'healthcare': 300,        // 体检、医疗、近视防控
      'housing': 350,           // 住房分摊（学习空间）
      'clothing': 200,          // 校服、运动装备
      'education': 800,         // 学费、书本费、学习用品
      'entertainment': 250,     // 课外读物、娱乐活动
      'extracurricular': 1200,  // 学科辅导、兴趣班
      'transportation': 150,    // 上学交通
      'insurance': 200,         // 学平险等
      'savings': 500           // 教育储蓄增加
    },
    totalMonthly: 4950,
    description: '学习压力增加，培训费用上升'
  },

  // 12-15岁：初中期
  'middle': {
    ageRange: { min: 12, max: 15 },
    label: '初中期 (12-15岁)',
    costs: {
      'basic-needs': 1200,      // 食物增加、营养补充
      'healthcare': 350,        // 青春期健康、心理咨询
      'housing': 400,           // 独立学习空间需求
      'clothing': 300,          // 校服、运动装备、日常服装
      'education': 1000,        // 学费、教材、学习设备
      'entertainment': 200,     // 娱乐活动减少
      'extracurricular': 2000,  // 学科辅导、升学培训
      'transportation': 200,    // 上学、培训交通
      'insurance': 200,         // 保险
      'savings': 600           // 高中准备金
    },
    totalMonthly: 6450,
    description: '升学压力大，辅导费用激增'
  },

  // 15-18岁：高中期
  'high': {
    ageRange: { min: 15, max: 18 },
    label: '高中期 (15-18岁)',
    costs: {
      'basic-needs': 1500,      // 食物、营养品、生活费
      'healthcare': 300,        // 体检、心理健康
      'housing': 500,           // 住房、可能的住宿费
      'clothing': 250,          // 校服、日常服装
      'education': 1200,        // 学费、教材、设备
      'entertainment': 150,     // 娱乐活动最少
      'extracurricular': 2500,  // 高考辅导、艺考培训
      'transportation': 250,    // 上学、培训、考试交通
      'insurance': 200,         // 保险
      'savings': 800           // 大学准备金
    },
    totalMonthly: 7650,
    description: '高考冲刺，教育投入最高'
  }
} as const

// ==================== 特殊费用配置 ====================

/**
 * 一次性大额支出（年度，单位：元）
 */
export const ONE_TIME_COSTS = {
  'infant': {
    // 0-3岁一次性支出
    babyGear: 8000,        // 婴儿车、安全座椅、婴儿床等
    decoration: 5000,      // 儿童房装修
    emergencyFund: 3000    // 医疗应急基金
  },
  'toddler': {
    // 3-6岁一次性支出
    kindergartenFee: 2000, // 幼儿园入园费
    equipment: 1500,       // 学习桌椅、玩具
    activities: 2000       // 旅游、体验活动
  },
  'primary': {
    // 6-12岁一次性支出
    schoolSupplies: 2000,  // 学习设备、书桌等
    extracurricular: 3000, // 兴趣班器材、比赛费用
    travel: 5000          // 研学旅行、夏令营
  },
  'middle': {
    // 12-15岁一次性支出
    technology: 5000,      // 电脑、平板等学习设备
    tutoring: 8000,        // 暑期集训、一对一辅导
    preparation: 3000      // 中考相关费用
  },
  'high': {
    // 15-18岁一次性支出
    equipment: 6000,       // 高端学习设备
    examination: 5000,     // 高考、艺考、留学考试费用
    preparation: 10000     // 大学准备、留学准备
  }
} as const

/**
 * 地区特色费用调整
 * 某些地区特有的费用项目
 */
export const REGIONAL_ADJUSTMENTS = {
  'tier1': {
    // 一线城市特殊费用
    schoolDistrictPremium: 0.3,  // 学区房溢价
    competitionIntensity: 0.4,   // 竞争激烈程度
    serviceQuality: 0.2          // 服务质量溢价
  },
  'new-tier1': {
    schoolDistrictPremium: 0.2,
    competitionIntensity: 0.3,
    serviceQuality: 0.15
  },
  'tier2': {
    schoolDistrictPremium: 0.1,
    competitionIntensity: 0.2,
    serviceQuality: 0.1
  },
  'tier3-4': {
    schoolDistrictPremium: 0,
    competitionIntensity: 0,
    serviceQuality: 0
  }
} as const

// ==================== 通胀和增长率 ====================

/**
 * 年度增长率配置
 */
export const GROWTH_RATES = {
  inflation: 0.03,           // 通胀率 3%
  educationInflation: 0.05,  // 教育费用增长率 5%
  incomeGrowth: 0.06,        // 收入增长率 6%
  housingGrowth: 0.04        // 住房成本增长率 4%
} as const

/**
 * 费用类别年度增长率
 */
export const CATEGORY_GROWTH_RATES: Record<CostCategory, number> = {
  'basic-needs': 0.03,      // 基本需求：跟随通胀
  'education': 0.05,        // 教育：高于通胀
  'healthcare': 0.04,       // 医疗：略高于通胀
  'housing': 0.04,          // 住房：房价相关
  'clothing': 0.02,         // 服装：低于通胀
  'entertainment': 0.03,    // 娱乐：跟随通胀
  'extracurricular': 0.06,  // 培训：最高增长
  'transportation': 0.03,   // 交通：跟随通胀
  'insurance': 0.04,        // 保险：略高于通胀
  'savings': 0.02          // 储蓄：保守增长
} as const

// ==================== 数据验证和工具函数 ====================

/**
 * 获取年龄对应的年龄段
 */
export function getAgeGroup(age: number): AgeGroup {
  if (age >= 0 && age < 3) return 'infant'
  if (age >= 3 && age < 6) return 'toddler'
  if (age >= 6 && age < 12) return 'primary'
  if (age >= 12 && age < 15) return 'middle'
  if (age >= 15 && age <= 18) return 'high'
  throw new Error(`Invalid age: ${age}. Age must be between 0 and 18.`)
}

/**
 * 获取年龄段的基础费用
 */
export function getBaseCostsForAge(age: number) {
  const ageGroup = getAgeGroup(age)
  return AGE_GROUP_BASE_COSTS[ageGroup]
}

/**
 * 计算调整后的费用
 */
export function calculateAdjustedCost(
  baseCost: number,
  cityTier: CityTier,
  incomeLevel: IncomeLevel,
  category: CostCategory
): number {
  const cityMultiplier = CITY_COST_MULTIPLIERS[cityTier]
  const incomeMultiplier = INCOME_IMPACT_MULTIPLIERS[incomeLevel]

  // 根据费用类别选择合适的收入系数
  let incomeAdjustment: number
  if (category === 'education' || category === 'extracurricular') {
    incomeAdjustment = incomeMultiplier.education
  } else if (category === 'entertainment' || category === 'clothing') {
    incomeAdjustment = incomeMultiplier.quality
  } else {
    incomeAdjustment = incomeMultiplier.basic
  }

  return baseCost * cityMultiplier * incomeAdjustment
}

/**
 * 数据完整性验证
 */
export function validateCostStandards(): boolean {
  // 验证所有年龄段都有完整的费用配置
  const requiredAgeGroups: AgeGroup[] = ['infant', 'toddler', 'primary', 'middle', 'high']
  const requiredCategories: CostCategory[] = [
    'basic-needs', 'education', 'healthcare', 'housing', 'clothing',
    'entertainment', 'extracurricular', 'transportation', 'insurance', 'savings'
  ]

  for (const ageGroup of requiredAgeGroups) {
    const costs = AGE_GROUP_BASE_COSTS[ageGroup].costs
    for (const category of requiredCategories) {
      if (!(category in costs)) {
        console.error(`Missing cost category ${category} for age group ${ageGroup}`)
        return false
      }
    }
  }

  return true
}

// 导出汇总配置
export const COST_STANDARDS = {
  cityMultipliers: CITY_COST_MULTIPLIERS,
  incomeMultipliers: INCOME_IMPACT_MULTIPLIERS,
  housingMultipliers: HOUSING_IMPACT_MULTIPLIERS,
  familySupportMultipliers: FAMILY_SUPPORT_MULTIPLIERS,
  educationMultipliers: EDUCATION_TYPE_MULTIPLIERS,
  trainingMultipliers: TRAINING_ATTITUDE_MULTIPLIERS,
  baseCosts: AGE_GROUP_BASE_COSTS,
  oneTimeCosts: ONE_TIME_COSTS,
  growthRates: GROWTH_RATES,
  categoryGrowthRates: CATEGORY_GROWTH_RATES
} as const
