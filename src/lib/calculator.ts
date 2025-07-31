import { CalculatorFormData, CalculationResult, CostBreakdown } from '@/types'
import { calculateVaccineCosts, getVaccineRecommendations } from '@/data/vaccineCosts'

/**
 * 城市等级费用系数
 */
const CITY_TIER_MULTIPLIERS = {
  tier1: 1.5,  // 一线城市
  tier2: 1.2,  // 二线城市
  tier3: 1.0,  // 三线及以下城市
}

/**
 * 教育类型费用系数
 */
const EDUCATION_MULTIPLIERS = {
  public: 1.0,        // 公立教育
  private: 2.5,       // 私立教育
  international: 4.0, // 国际教育
}

/**
 * 医疗水平费用系数
 */
const HEALTHCARE_MULTIPLIERS = {
  basic: 1.0,    // 基础医疗
  premium: 2.0,  // 高端医疗
}

/**
 * 不同年龄段的基础年度费用（三线城市，基础医疗）
 */
const BASE_ANNUAL_COSTS_BY_AGE = {
  '0-1': {
    basicLiving: 18000,     // 婴儿期生活费较高（奶粉、尿布等）
    education: 0,           // 无正式教育费用
    healthcare: 800,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 0,     // 无课外活动
    others: 3000,           // 婴儿用品等
  },
  '2-3': {
    basicLiving: 16000,     // 生活费略降
    education: 2000,        // 早教、启蒙教育
    healthcare: 600,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 1000,  // 简单的亲子活动
    others: 3500,           // 玩具、图书等
  },
  '4-6': {
    basicLiving: 15000,     // 学前期生活费
    education: 6000,        // 幼儿园费用
    healthcare: 500,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 3000,  // 兴趣启蒙
    others: 4000,           // 学习用品等
  },
  '7-12': {
    basicLiving: 16000,     // 小学期生活费
    education: 8000,        // 小学教育费用
    healthcare: 400,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 5000,  // 课外培训增加
    others: 4500,           // 学习用品、文具等
  },
  '13-15': {
    basicLiving: 18000,     // 青春期生活费增加
    education: 12000,       // 初中教育费用
    healthcare: 600,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 8000,  // 补习班、兴趣班
    others: 5000,           // 电子产品、服装等
  },
  '16-18': {
    basicLiving: 20000,     // 高中期生活费最高
    education: 15000,       // 高中教育费用
    healthcare: 500,        // 基础医疗费用（体检、常见病治疗），疫苗费用单独计算
    extracurricular: 12000, // 高考补习、特长培训
    others: 6000,           // 各种费用增加
  },
}

/**
 * 根据年龄获取年龄段
 */
function getAgeGroup(age: number): keyof typeof BASE_ANNUAL_COSTS_BY_AGE {
  if (age <= 1) return '0-1'
  if (age <= 3) return '2-3'
  if (age <= 6) return '4-6'
  if (age <= 12) return '7-12'
  if (age <= 15) return '13-15'
  return '16-18'
}

/**
 * 计算费用分解
 */
function calculateCostBreakdown(data: CalculatorFormData): CostBreakdown {
  const cityMultiplier = CITY_TIER_MULTIPLIERS[data.location]
  const educationMultiplier = EDUCATION_MULTIPLIERS[data.educationLevel || 'public']
  const healthcareMultiplier = HEALTHCARE_MULTIPLIERS[data.healthcareLevel || 'basic']
  const ageGroup = getAgeGroup(data.childAge)
  const baseCosts = BASE_ANNUAL_COSTS_BY_AGE[ageGroup]

  // 基础生活费（受城市等级影响）
  const basicLiving = baseCosts.basicLiving * cityMultiplier

  // 教育费用（受城市等级、教育类型影响，0-1岁无教育费用）
  let education = baseCosts.education * cityMultiplier
  if (data.childAge > 1 && baseCosts.education > 0) {
    education = education * educationMultiplier
  }

  // 计算疫苗费用
  const ageMonths = data.childAge * 12
  const includeOptionalVaccines = data.monthlyIncome >= 30000 // 月收入3万以上考虑可选疫苗
  const vaccineCosts = calculateVaccineCosts(ageMonths, includeOptionalVaccines)
  
  // 基础医疗费用（体检、常见病治疗等）
  const baseHealthcare = baseCosts.healthcare * cityMultiplier * healthcareMultiplier
  
  // 医疗费用 = 基础医疗费用 + 疫苗费用
  const healthcare = baseHealthcare + vaccineCosts.totalCost

  // 课外活动费用（可选，受城市等级影响，0-1岁基本无课外活动）
  let extracurricular = 0
  if (data.extracurricular && baseCosts.extracurricular > 0) {
    extracurricular = baseCosts.extracurricular * cityMultiplier
    // 年龄越大，课外活动选择越多，费用可能更高
    if (data.childAge >= 7) {
      extracurricular = extracurricular * 1.2
    }
  }

  // 其他费用（受城市等级影响）
  const others = baseCosts.others * cityMultiplier

  return {
    basicLiving: Math.round(basicLiving),
    education: Math.round(education),
    healthcare: Math.round(healthcare),
    vaccineCosts: {
      free: 0,
      paid: vaccineCosts.breakdown.paid,
      optional: vaccineCosts.breakdown.optional,
      total: vaccineCosts.totalCost
    },
    extracurricular: Math.round(extracurricular),
    others: Math.round(others),
  }
}

/**
 * 生成建议
 */
function generateRecommendations(data: CalculatorFormData, breakdown: CostBreakdown): string[] {
  const recommendations: string[] = []
  const totalCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)
  const monthlyIncome = data.monthlyIncome
  const annualIncome = monthlyIncome * 12
  const costRatio = totalCost / annualIncome

  // 基于费用占收入比例的建议
  if (costRatio > 0.5) {
    recommendations.push('养娃成本占家庭收入比例较高，建议适当调整教育和生活标准，或考虑增加收入来源。')
  } else if (costRatio > 0.3) {
    recommendations.push('养娃成本在合理范围内，建议做好长期财务规划，为孩子的未来教育储备资金。')
  } else {
    recommendations.push('您的经济条件较为宽裕，可以考虑为孩子提供更好的教育和生活条件。')
  }

  // 基于城市等级的建议
  if (data.location === 'tier1') {
    recommendations.push('一线城市生活成本较高，建议重点关注教育资源的性价比，合理规划住房和交通支出。')
  } else if (data.location === 'tier2') {
    recommendations.push('二线城市具有较好的教育资源和相对合理的生活成本，建议平衡教育投入和生活质量。')
  } else {
    recommendations.push('三线城市生活成本相对较低，可以考虑增加教育投入，为孩子提供更多学习机会。')
  }

  // 基于教育选择的建议
  if (data.educationLevel === 'international') {
    recommendations.push('国际教育费用较高，建议提前做好长期财务规划，同时关注教育质量和孩子的适应性。')
  } else if (data.educationLevel === 'private') {
    recommendations.push('私立教育可以提供更好的教育环境，建议综合考虑教育质量、费用和家庭经济状况。')
  } else {
    recommendations.push('公立教育性价比较高，可以将节省的费用用于课外培训和兴趣发展。')
  }

  // 基于课外活动的建议
  if (data.extracurricular) {
    recommendations.push('课外活动有助于孩子全面发展，建议选择适合孩子兴趣和天赋的项目，避免过度投入。')
  } else {
    recommendations.push('适当的课外活动可以丰富孩子的学习体验，建议根据孩子的兴趣适度参与。')
  }

  // 基于年龄的建议
  const ageGroup = getAgeGroup(data.childAge)
  if (ageGroup === '0-1') {
    recommendations.push('婴儿期重点关注营养和健康，奶粉、尿布是主要支出。国家免疫疫苗免费，自费疫苗可根据经济情况选择。建议选择品质可靠的婴儿用品，不必过度追求高端品牌。')
  } else if (ageGroup === '2-3') {
    recommendations.push('幼儿期开始有简单的早教需求，可以选择一些启蒙读物和益智玩具。医疗费用主要是感冒发烧等常见病，有医保报销大部分费用。')
  } else if (ageGroup === '4-6') {
    recommendations.push('学前期需要考虑幼儿园费用，这是教育支出的开始。建议选择性价比合适的幼儿园，重点关注教育质量。医疗费用较低，主要做好预防保健。')
  } else if (ageGroup === '7-12') {
    recommendations.push('小学期间教育费用相对稳定，课外培训开始增加。这个年龄段身体健康，医疗费用最低。建议根据孩子兴趣选择1-2项特长培养，避免过度报班。')
  } else if (ageGroup === '13-15') {
    recommendations.push('初中期间学习任务加重，补习费用可能大幅增加。青春期可能有一些健康问题需要关注。建议合理规划教育投入，关注孩子的学习效率和身心健康。')
  } else {
    recommendations.push('高中期间面临升学压力，教育投入达到峰值。医疗费用相对稳定，主要关注心理健康。建议重点投入有效的学习资源，同时为大学费用做好储备。')
  }

  // 疫苗相关建议
  const familyIncome = data.monthlyIncome < 15000 ? 'low' : data.monthlyIncome < 30000 ? 'medium' : 'high'
  const vaccineRecommendations = getVaccineRecommendations(ageMonths, familyIncome)
  recommendations.push(...vaccineRecommendations)

  // 医疗费用相关建议
  if (data.healthcareLevel === 'premium') {
    recommendations.push('选择高端医疗服务可以获得更好的就医体验，但基础医疗已能满足大部分需求。建议根据家庭经济状况合理选择。')
  } else {
    recommendations.push('基础医疗配合国家医保政策已能很好地保障孩子健康，重点做好预防保健和健康生活习惯培养。')
  }

  return recommendations
}

/**
 * 主要计算函数
 */
export function calculateChildRaisingCost(data: CalculatorFormData): CalculationResult {
  // 计算费用分解
  const breakdown = calculateCostBreakdown(data)
  
  // 计算总费用
  const totalAnnualCost = breakdown.basicLiving + breakdown.education + breakdown.healthcare + 
                         breakdown.vaccineCosts.total + breakdown.extracurricular + breakdown.others
  const monthlyAverageCost = Math.round(totalAnnualCost / 12)
  
  // 生成建议
  const recommendations = generateRecommendations(data, breakdown)
  
  return {
    totalAnnualCost,
    monthlyAverageCost,
    breakdown,
    recommendations,
    userInput: data,
    timestamp: new Date().toISOString(),
  }
}

/**
 * 获取费用占比
 */
export function getCostPercentages(breakdown: CostBreakdown): Record<keyof CostBreakdown, number> {
  const total = breakdown.basicLiving + breakdown.education + breakdown.healthcare + 
                breakdown.vaccineCosts.total + breakdown.extracurricular + breakdown.others
  
  return {
    basicLiving: Math.round((breakdown.basicLiving / total) * 100),
    education: Math.round((breakdown.education / total) * 100),
    healthcare: Math.round((breakdown.healthcare / total) * 100),
    vaccineCosts: Math.round((breakdown.vaccineCosts.total / total) * 100),
    extracurricular: Math.round((breakdown.extracurricular / total) * 100),
    others: Math.round((breakdown.others / total) * 100),
  }
}

/**
 * 获取全国平均费用（用于对比）
 */
export function getNationalAverageCost(childAge: number): number {
  const ageGroup = getAgeGroup(childAge)
  const baseCosts = BASE_ANNUAL_COSTS_BY_AGE[ageGroup]
  const baseCost = Object.values(baseCosts).reduce((sum, cost) => sum + cost, 0)

  // 全国平均使用二线城市标准
  return Math.round(baseCost * CITY_TIER_MULTIPLIERS.tier2)
}
