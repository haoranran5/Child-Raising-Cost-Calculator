import {
  CityTier,
  IncomeLevel,
  HousingType,
  FamilySupport,
  EducationType,
  TrainingAttitude,
  AgeGroup,
  CostCategory,
  CityConfig,
  IncomeConfig,
  AgeGroupConfig,
  CostFactors
} from '../types'

// ==================== 基础成本配置 ====================

// 基础成本配置（月均，单位：元）
export const BASE_COSTS: Record<CostCategory, number> = {
  'basic-needs': 2000,      // 基本需求（奶粉、尿布、食物等）
  'education': 1500,        // 教育费用（学费、书本费等）
  'healthcare': 800,        // 医疗保健（疫苗、体检、医疗保险等）
  'housing': 1200,          // 住房相关（房租增加、儿童房装修等）
  'clothing': 500,          // 服装费用
  'entertainment': 600,     // 娱乐活动（玩具、游乐场等）
  'extracurricular': 1000,  // 课外培训（兴趣班、培训班等）
  'transportation': 300,    // 交通费用（接送、出行等）
  'insurance': 400,         // 保险费用（儿童保险等）
  'savings': 800           // 储蓄投资（教育基金等）
} as const

// ==================== 城市配置 ====================

// 城市等级系数
export const CITY_MULTIPLIERS: Record<CityTier, number> = {
  'tier1': 2.0,        // 一线城市（北上广深）
  'new-tier1': 1.6,    // 新一线城市
  'tier2': 1.3,        // 二线城市
  'tier3-4': 1.0       // 三四线城市
} as const

// 城市配置详情
export const CITY_CONFIGS: CityConfig[] = [
  {
    tier: 'tier1',
    label: '一线城市',
    description: '北京、上海、广州、深圳',
    multiplier: 2.0,
    examples: ['北京', '上海', '广州', '深圳']
  },
  {
    tier: 'new-tier1',
    label: '新一线城市',
    description: '成都、杭州、重庆、武汉等',
    multiplier: 1.6,
    examples: ['成都', '杭州', '重庆', '武汉', '西安', '苏州', '天津']
  },
  {
    tier: 'tier2',
    label: '二线城市',
    description: '省会城市及计划单列市',
    multiplier: 1.3,
    examples: ['南京', '青岛', '大连', '宁波', '厦门']
  },
  {
    tier: 'tier3-4',
    label: '三四线城市',
    description: '地级市及县级市',
    multiplier: 1.0,
    examples: ['其他地级市', '县级市']
  }
]

// ==================== 收入配置 ====================

// 收入档位系数
export const INCOME_MULTIPLIERS: Record<IncomeLevel, number> = {
  'low': 0.7,           // 低收入
  'lower-middle': 0.85, // 中低收入
  'middle': 1.0,        // 中等收入
  'upper-middle': 1.3,  // 中高收入
  'high': 1.8          // 高收入
} as const

// 收入档位配置
export const INCOME_CONFIGS: IncomeConfig[] = [
  {
    level: 'low',
    label: '低收入',
    range: { min: 0, max: 8000 },
    description: '月收入8000元以下'
  },
  {
    level: 'lower-middle',
    label: '中低收入',
    range: { min: 8000, max: 15000 },
    description: '月收入8000-15000元'
  },
  {
    level: 'middle',
    label: '中等收入',
    range: { min: 15000, max: 25000 },
    description: '月收入15000-25000元'
  },
  {
    level: 'upper-middle',
    label: '中高收入',
    range: { min: 25000, max: 50000 },
    description: '月收入25000-50000元'
  },
  {
    level: 'high',
    label: '高收入',
    range: { min: 50000, max: null },
    description: '月收入50000元以上'
  }
]

// ==================== 住房配置 ====================

// 住房类型系数
export const HOUSING_MULTIPLIERS: Record<HousingType, number> = {
  'rental': 1.2,        // 租房（需要额外租房成本）
  'owned': 1.0,         // 有房（基准）
  'school-district': 1.5 // 学区房（额外成本）
} as const

// ==================== 家庭支持配置 ====================

// 家庭支持系数（支持越多，成本越低）
export const FAMILY_SUPPORT_MULTIPLIERS: Record<FamilySupport, number> = {
  'none': 1.3,          // 无支持
  'minimal': 1.15,      // 最少支持
  'moderate': 1.0,      // 适度支持
  'significant': 0.85,  // 较多支持
  'full': 0.7          // 全面支持
} as const

// ==================== 教育配置 ====================

// 教育类型系数
export const EDUCATION_MULTIPLIERS: Record<EducationType, number> = {
  'public': 1.0,        // 公立教育
  'private': 2.0,       // 私立教育
  'international': 4.0  // 国际教育
} as const

// ==================== 培训态度配置 ====================

// 培训态度系数
export const TRAINING_MULTIPLIERS: Record<TrainingAttitude, number> = {
  'relaxed': 0.5,       // 佛系
  'normal': 1.0,        // 普通
  'active': 1.8,        // 积极
  'intensive': 3.0      // 鸡娃
} as const

// ==================== 年龄段配置 ====================

// 年龄段系数
export const AGE_MULTIPLIERS: Record<AgeGroup, number> = {
  'infant': 1.3,        // 0-2岁：婴儿期
  'toddler': 1.1,       // 3-5岁：幼儿期
  'preschool': 1.0,     // 6-7岁：学前期
  'primary': 1.2,       // 8-12岁：小学期
  'middle': 1.5,        // 13-15岁：初中期
  'high': 1.8          // 16-18岁：高中期
} as const

// 年龄段配置详情
export const AGE_GROUP_CONFIGS: AgeGroupConfig[] = [
  {
    group: 'infant',
    label: '婴儿期',
    ageRange: { min: 0, max: 2 },
    description: '0-2岁，需要大量基础护理',
    characteristics: ['奶粉尿布', '医疗保健', '基础护理', '早教启蒙']
  },
  {
    group: 'toddler',
    label: '幼儿期',
    ageRange: { min: 3, max: 5 },
    description: '3-5岁，开始接受学前教育',
    characteristics: ['幼儿园', '兴趣培养', '玩具游戏', '基础教育']
  },
  {
    group: 'preschool',
    label: '学前期',
    ageRange: { min: 6, max: 7 },
    description: '6-7岁，准备进入小学',
    characteristics: ['学前班', '入学准备', '基础技能', '社交能力']
  },
  {
    group: 'primary',
    label: '小学期',
    ageRange: { min: 8, max: 12 },
    description: '8-12岁，小学教育阶段',
    characteristics: ['学费', '课外辅导', '兴趣班', '学习用品']
  },
  {
    group: 'middle',
    label: '初中期',
    ageRange: { min: 13, max: 15 },
    description: '13-15岁，初中教育阶段',
    characteristics: ['学费增加', '补习班', '升学压力', '青春期需求']
  },
  {
    group: 'high',
    label: '高中期',
    ageRange: { min: 16, max: 18 },
    description: '16-18岁，高中教育阶段',
    characteristics: ['高额学费', '升学辅导', '大学准备', '生活费增加']
  }
]

// ==================== 综合配置 ====================

// 完整的费用系数配置
export const COST_FACTORS: CostFactors = {
  baseCosts: BASE_COSTS,
  cityMultipliers: CITY_MULTIPLIERS,
  incomeMultipliers: INCOME_MULTIPLIERS,
  housingMultipliers: HOUSING_MULTIPLIERS,
  familySupportMultipliers: FAMILY_SUPPORT_MULTIPLIERS,
  educationMultipliers: EDUCATION_MULTIPLIERS,
  trainingMultipliers: TRAINING_MULTIPLIERS,
  ageMultipliers: AGE_MULTIPLIERS
}

// ==================== 选项配置 ====================

// 城市选项（用于表单）
export const CITY_OPTIONS = CITY_CONFIGS.map(config => ({
  value: config.tier,
  label: config.label,
  description: config.description
}))

// 收入选项（用于表单）
export const INCOME_OPTIONS = INCOME_CONFIGS.map(config => ({
  value: config.level,
  label: config.label,
  description: config.description
}))

// 住房选项
export const HOUSING_OPTIONS = [
  { value: 'rental', label: '租房', description: '目前租房居住' },
  { value: 'owned', label: '有房', description: '已有自住房产' },
  { value: 'school-district', label: '学区房', description: '学区房或计划购买学区房' }
]

// 家庭支持选项
export const FAMILY_SUPPORT_OPTIONS = [
  { value: 'none', label: '无支持', description: '完全靠自己' },
  { value: 'minimal', label: '最少支持', description: '偶尔帮忙' },
  { value: 'moderate', label: '适度支持', description: '定期帮忙' },
  { value: 'significant', label: '较多支持', description: '经常帮忙' },
  { value: 'full', label: '全面支持', description: '全职帮忙' }
]

// 教育选项
export const EDUCATION_OPTIONS = [
  { value: 'public', label: '公立教育', description: '以公立学校为主' },
  { value: 'private', label: '私立教育', description: '私立或优质学校' },
  { value: 'international', label: '国际教育', description: '国际学校或双语教育' }
]

// 培训态度选项
export const TRAINING_OPTIONS = [
  { value: 'relaxed', label: '佛系', description: '顺其自然，不强求' },
  { value: 'normal', label: '普通', description: '适度培养兴趣' },
  { value: 'active', label: '积极', description: '重视教育投入' },
  { value: 'intensive', label: '鸡娃', description: '全力培养，不惜成本' }
]

// ==================== 图表配置 ====================

// 图表颜色配置
export const CHART_COLORS = [
  '#0ea5e9', // 基本需求 - 蓝色
  '#8b5cf6', // 教育 - 紫色
  '#10b981', // 医疗 - 绿色
  '#f59e0b', // 住房 - 橙色
  '#ef4444', // 服装 - 红色
  '#6366f1', // 娱乐 - 靛蓝色
  '#ec4899', // 课外活动 - 粉色
  '#14b8a6', // 交通 - 青色
  '#f97316', // 保险 - 橙红色
  '#84cc16', // 储蓄 - 绿黄色
] as const

// 成本类别标签
export const COST_CATEGORY_LABELS: Record<CostCategory, string> = {
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
} as const

// ==================== 向后兼容性 ====================

// 保持向后兼容的旧版本常量
export const EDUCATION_MULTIPLIERS = {
  basic: EDUCATION_MULTIPLIERS.public,
  premium: EDUCATION_MULTIPLIERS.private,
  international: EDUCATION_MULTIPLIERS.international
} as const

export const HEALTHCARE_MULTIPLIERS = {
  basic: 1.0,
  premium: 1.8
} as const

// 年龄系数（不同年龄段的成本差异）
export const AGE_MULTIPLIERS: Record<number, number> = {
  0: 1.2,   // 0-2岁：婴幼儿期，奶粉尿布等
  3: 1.0,   // 3-5岁：学前期
  6: 1.3,   // 6-11岁：小学期
  12: 1.5,  // 12-14岁：初中期
  15: 1.7,  // 15-17岁：高中期
  18: 2.0   // 18岁：大学准备期
} as const

// 教育水平系数
export const EDUCATION_MULTIPLIERS = {
  basic: 1.0,        // 公立教育为主
  premium: 1.5,      // 私立/优质教育
  international: 2.5  // 国际教育
} as const

// 医疗保障系数
export const HEALTHCARE_MULTIPLIERS = {
  basic: 1.0,    // 基础医疗保障
  premium: 1.8   // 高端医疗保险
} as const

// 城市选项
export const CITY_OPTIONS = [
  { value: 'tier1' as CityTier, label: '一线城市（北京、上海、广州、深圳）' },
  { value: 'tier2' as CityTier, label: '二线城市（省会城市、计划单列市）' },
  { value: 'tier3' as CityTier, label: '三线及以下城市' }
] as const

// 教育水平选项
export const EDUCATION_OPTIONS = [
  { value: 'basic', label: '公立教育为主' },
  { value: 'premium', label: '私立/优质教育' },
  { value: 'international', label: '国际教育' }
] as const

// 医疗保障选项
export const HEALTHCARE_OPTIONS = [
  { value: 'basic', label: '基础医疗保障' },
  { value: 'premium', label: '高端医疗保险' }
] as const

// 图表颜色配置
export const CHART_COLORS = [
  '#0ea5e9', // 基本需求 - 蓝色
  '#8b5cf6', // 教育 - 紫色
  '#10b981', // 医疗 - 绿色
  '#f59e0b', // 服装 - 橙色
  '#ef4444', // 娱乐 - 红色
  '#6366f1', // 课外活动 - 靛蓝色
] as const

// 成本类别标签
export const COST_CATEGORY_LABELS = {
  basicNeeds: '基本需求',
  education: '教育费用',
  healthcare: '医疗保健',
  clothing: '服装费用',
  entertainment: '娱乐活动',
  extracurricular: '课外活动'
} as const
