import {
  UserInput,
  CalculatorFormData,
  CalculationResult,
  CostBreakdown,
  AgeGroupCost,
  CostItem,
  YearlyProjection,
  ComparisonData,
  ChartDataPoint,
  CityTier,
  AgeGroup,
  CostCategory
} from '../types'

import {
  COST_STANDARDS,
  AGE_GROUP_BASE_COSTS,
  CITY_COST_MULTIPLIERS,
  INCOME_IMPACT_MULTIPLIERS,
  HOUSING_IMPACT_MULTIPLIERS,
  FAMILY_SUPPORT_MULTIPLIERS,
  EDUCATION_TYPE_MULTIPLIERS,
  TRAINING_ATTITUDE_MULTIPLIERS,
  getAgeGroup,
  getBaseCostsForAge,
  calculateAdjustedCost,
  GROWTH_RATES,
  CATEGORY_GROWTH_RATES
} from '../data/costStandards'

/**
 * 核心费用计算函数
 *
 * @param userInput - 用户输入的基本信息
 * @returns 详细的费用分析结果
 */
export function calculateChildCost(userInput: UserInput): CostBreakdown {
  // 1. 根据城市等级和收入水平确定基础系数
  const cityMultiplier = CITY_COST_MULTIPLIERS[userInput.cityTier]
  const incomeMultipliers = INCOME_IMPACT_MULTIPLIERS[userInput.incomeLevel]
  const housingMultiplier = HOUSING_IMPACT_MULTIPLIERS[userInput.housingType]
  const familySupportMultiplier = FAMILY_SUPPORT_MULTIPLIERS[userInput.familySupport]
  const educationMultiplier = EDUCATION_TYPE_MULTIPLIERS[userInput.educationType]
  const trainingMultiplier = TRAINING_ATTITUDE_MULTIPLIERS[userInput.trainingAttitude]

  // 2. 遍历各个年龄段，计算每个阶段的费用
  const ageGroupCosts: AgeGroupCost[] = []
  let totalCostAllAges = 0
  let totalMonthsAllAges = 0

  // 计算从当前年龄到18岁的所有年龄段费用
  const currentAgeGroup = getAgeGroup(userInput.childAge)
  const ageGroups: AgeGroup[] = ['infant', 'toddler', 'primary', 'middle', 'high']

  // 找到当前年龄段的索引
  const currentAgeGroupIndex = ageGroups.indexOf(currentAgeGroup)

  // 从当前年龄段开始计算
  for (let i = currentAgeGroupIndex; i < ageGroups.length; i++) {
    const ageGroup = ageGroups[i]
    const ageGroupData = AGE_GROUP_BASE_COSTS[ageGroup]

    // 计算该年龄段的实际年龄范围
    let startAge = ageGroupData.ageRange.min
    let endAge = ageGroupData.ageRange.max

    // 如果是当前年龄段，从当前年龄开始
    if (i === currentAgeGroupIndex) {
      startAge = userInput.childAge
    }

    // 如果是最后一个年龄段，到18岁结束
    if (ageGroup === 'high') {
      endAge = 18
    }

    // 计算该年龄段的月数
    const monthsInAgeGroup = Math.max(0, (endAge - startAge + 1) * 12)

    if (monthsInAgeGroup > 0) {
      // 3. 根据用户的教育选择和培训态度调整费用
      const adjustedCosts = calculateAgeGroupCosts(
        ageGroupData,
        cityMultiplier,
        incomeMultipliers,
        housingMultiplier,
        familySupportMultiplier,
        educationMultiplier,
        trainingMultiplier
      )

      // 计算该年龄段的总费用
      const ageGroupTotalMonthly = Object.values(adjustedCosts).reduce((sum, cost) => sum + cost, 0)
      const ageGroupTotalCost = ageGroupTotalMonthly * monthsInAgeGroup

      // 构建费用项目列表
      const costItems: CostItem[] = Object.entries(adjustedCosts).map(([category, monthlyAmount]) => ({
        category: category as CostCategory,
        name: getCategoryDisplayName(category as CostCategory),
        monthlyAmount,
        yearlyAmount: monthlyAmount * 12,
        description: getCategoryDescription(category as CostCategory),
        isEssential: isEssentialCategory(category as CostCategory),
        percentage: (monthlyAmount / ageGroupTotalMonthly) * 100
      }))

      ageGroupCosts.push({
        ageGroup,
        ageRange: { min: startAge, max: endAge },
        totalCost: ageGroupTotalCost,
        yearlyAverage: ageGroupTotalMonthly * 12,
        monthlyAverage: ageGroupTotalMonthly,
        items: costItems
      })

      totalCostAllAges += ageGroupTotalCost
      totalMonthsAllAges += monthsInAgeGroup
    }
  }

  // 4. 生成分类费用统计
  const categoryTotals = calculateCategoryTotals(ageGroupCosts)

  // 5. 计算必需费用和可选费用
  const { essentialCosts, optionalCosts } = calculateEssentialOptionalCosts(categoryTotals)

  // 6. 计算收入占比（如果提供了自定义收入）
  const monthlyIncome = userInput.customIncome || getEstimatedIncome(userInput.incomeLevel)
  const monthlyAverage = totalMonthsAllAges > 0 ? totalCostAllAges / totalMonthsAllAges : 0
  const incomeRatio = monthlyIncome > 0 ? (monthlyAverage / monthlyIncome) : 0

  return {
    totalCost: totalCostAllAges,
    yearlyAverage: monthlyAverage * 12,
    monthlyAverage,
    byAgeGroup: ageGroupCosts,
    byCategory: categoryTotals,
    essentialCosts,
    optionalCosts,
    incomeRatio
  }
}

/**
 * 计算单个年龄段的调整后费用
 *
 * @param ageGroupData - 年龄段基础数据
 * @param cityMultiplier - 城市系数
 * @param incomeMultipliers - 收入系数
 * @param housingMultiplier - 住房系数
 * @param familySupportMultiplier - 家庭支持系数
 * @param educationMultiplier - 教育类型系数
 * @param trainingMultiplier - 培训态度系数
 * @returns 调整后的各类费用
 */
function calculateAgeGroupCosts(
  ageGroupData: typeof AGE_GROUP_BASE_COSTS[AgeGroup],
  cityMultiplier: number,
  incomeMultipliers: typeof INCOME_IMPACT_MULTIPLIERS[keyof typeof INCOME_IMPACT_MULTIPLIERS],
  housingMultiplier: number,
  familySupportMultiplier: number,
  educationMultiplier: number,
  trainingMultiplier: number
): Record<CostCategory, number> {
  const adjustedCosts: Record<CostCategory, number> = {} as any

  Object.entries(ageGroupData.costs).forEach(([category, baseCost]) => {
    const costCategory = category as CostCategory
    let adjustedCost = baseCost * cityMultiplier

    // 根据费用类别应用不同的收入系数
    switch (costCategory) {
      case 'education':
        adjustedCost *= incomeMultipliers.education * educationMultiplier
        break
      case 'extracurricular':
        adjustedCost *= incomeMultipliers.education * trainingMultiplier
        break
      case 'entertainment':
      case 'clothing':
        adjustedCost *= incomeMultipliers.quality
        break
      case 'housing':
        adjustedCost *= incomeMultipliers.basic * housingMultiplier
        break
      default:
        adjustedCost *= incomeMultipliers.basic
        break
    }

    // 应用家庭支持系数（影响所有费用）
    adjustedCost *= familySupportMultiplier

    adjustedCosts[costCategory] = Math.round(adjustedCost)
  })

  return adjustedCosts
}

/**
 * 计算各类别的总费用
 *
 * @param ageGroupCosts - 各年龄段费用数据
 * @returns 按类别汇总的费用
 */
function calculateCategoryTotals(ageGroupCosts: AgeGroupCost[]): Record<CostCategory, CostItem> {
  const categoryTotals: Record<CostCategory, CostItem> = {} as any

  // 初始化所有类别
  const allCategories: CostCategory[] = [
    'basic-needs', 'education', 'healthcare', 'housing', 'clothing',
    'entertainment', 'extracurricular', 'transportation', 'insurance', 'savings'
  ]

  allCategories.forEach(category => {
    categoryTotals[category] = {
      category,
      name: getCategoryDisplayName(category),
      monthlyAmount: 0,
      yearlyAmount: 0,
      description: getCategoryDescription(category),
      isEssential: isEssentialCategory(category),
      percentage: 0
    }
  })

  // 汇总各年龄段的费用
  let totalMonthlyAmount = 0
  ageGroupCosts.forEach(ageGroupCost => {
    ageGroupCost.items.forEach(item => {
      categoryTotals[item.category].monthlyAmount += item.monthlyAmount
      categoryTotals[item.category].yearlyAmount += item.yearlyAmount
      totalMonthlyAmount += item.monthlyAmount
    })
  })

  // 计算百分比
  Object.values(categoryTotals).forEach(item => {
    item.percentage = totalMonthlyAmount > 0 ? (item.monthlyAmount / totalMonthlyAmount) * 100 : 0
  })

  return categoryTotals
}

/**
 * 计算必需费用和可选费用
 *
 * @param categoryTotals - 按类别汇总的费用
 * @returns 必需费用和可选费用总额
 */
function calculateEssentialOptionalCosts(
  categoryTotals: Record<CostCategory, CostItem>
): { essentialCosts: number; optionalCosts: number } {
  let essentialCosts = 0
  let optionalCosts = 0

  Object.values(categoryTotals).forEach(item => {
    if (item.isEssential) {
      essentialCosts += item.yearlyAmount
    } else {
      optionalCosts += item.yearlyAmount
    }
  })

  return { essentialCosts, optionalCosts }
}

/**
 * 获取费用类别的显示名称
 *
 * @param category - 费用类别
 * @returns 显示名称
 */
function getCategoryDisplayName(category: CostCategory): string {
  const names: Record<CostCategory, string> = {
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
  return names[category]
}

/**
 * 获取费用类别的描述
 *
 * @param category - 费用类别
 * @returns 类别描述
 */
function getCategoryDescription(category: CostCategory): string {
  const descriptions: Record<CostCategory, string> = {
    'basic-needs': '食物、日用品、基础护理等生活必需品',
    'education': '学费、书本费、学习用品等教育相关费用',
    'healthcare': '医疗保险、体检、疫苗、治疗等健康费用',
    'housing': '住房分摊、儿童房装修、学区房等住房相关费用',
    'clothing': '服装、鞋帽、校服等穿着费用',
    'entertainment': '玩具、游乐场、旅游等娱乐休闲费用',
    'extracurricular': '兴趣班、培训班、补习等课外教育费用',
    'transportation': '上学接送、出行等交通费用',
    'insurance': '儿童保险、学平险等保险费用',
    'savings': '教育基金、储蓄投资等理财费用'
  }
  return descriptions[category]
}

/**
 * 判断费用类别是否为必需费用
 *
 * @param category - 费用类别
 * @returns 是否为必需费用
 */
function isEssentialCategory(category: CostCategory): boolean {
  const essentialCategories: CostCategory[] = [
    'basic-needs', 'education', 'healthcare', 'housing', 'clothing'
  ]
  return essentialCategories.includes(category)
}

/**
 * 根据收入水平估算月收入
 *
 * @param incomeLevel - 收入水平
 * @returns 估算的月收入
 */
function getEstimatedIncome(incomeLevel: UserInput['incomeLevel']): number {
  const incomeEstimates = {
    'low': 6000,
    'lower-middle': 11500,
    'middle': 20000,
    'upper-middle': 37500,
    'high': 75000
  }
  return incomeEstimates[incomeLevel]
}

/**
 * 生成年龄趋势图表数据
 *
 * @param userInput - 用户输入
 * @param costBreakdown - 费用分解数据
 * @returns 图表数据点数组
 */
export function generateAgeTrendChartData(
  userInput: UserInput,
  costBreakdown: CostBreakdown
): ChartDataPoint[] {
  const chartData: ChartDataPoint[] = []

  // 为每个年龄段生成数据点
  costBreakdown.byAgeGroup.forEach(ageGroupCost => {
    const midAge = Math.floor((ageGroupCost.ageRange.min + ageGroupCost.ageRange.max) / 2)
    chartData.push({
      age: midAge,
      cost: ageGroupCost.monthlyAverage,
      ageGroup: ageGroupCost.ageGroup,
      label: `${ageGroupCost.ageRange.min}-${ageGroupCost.ageRange.max}岁`
    })
  })

  return chartData.sort((a, b) => a.age - b.age)
}

/**
 * 生成类别分布图表数据
 *
 * @param costBreakdown - 费用分解数据
 * @returns 图表数据点数组
 */
export function generateCategoryChartData(costBreakdown: CostBreakdown): ChartDataPoint[] {
  return Object.values(costBreakdown.byCategory)
    .filter(item => item.monthlyAmount > 0)
    .map(item => ({
      age: 0, // 类别图表不需要年龄
      cost: item.monthlyAmount,
      category: item.category,
      label: item.name,
      metadata: {
        percentage: item.percentage,
        isEssential: item.isEssential,
        description: item.description
      }
    }))
    .sort((a, b) => b.cost - a.cost)
}

/**
 * 生成年度预测数据
 *
 * @param userInput - 用户输入
 * @param costBreakdown - 费用分解数据
 * @returns 年度预测数组
 */
export function generateYearlyProjections(
  userInput: UserInput,
  costBreakdown: CostBreakdown
): YearlyProjection[] {
  const projections: YearlyProjection[] = []
  let cumulativeCost = 0
  const currentYear = new Date().getFullYear()

  // 为每个年龄段生成年度预测
  costBreakdown.byAgeGroup.forEach((ageGroupCost, index) => {
    const yearsInAgeGroup = ageGroupCost.ageRange.max - ageGroupCost.ageRange.min + 1

    for (let yearOffset = 0; yearOffset < yearsInAgeGroup; yearOffset++) {
      const childAge = ageGroupCost.ageRange.min + yearOffset
      const year = currentYear + (childAge - userInput.childAge)

      // 计算该年的费用（考虑通胀）
      const inflationRate = userInput.considerInflation ? GROWTH_RATES.inflation : 0
      const yearsFromNow = year - currentYear
      const inflationMultiplier = Math.pow(1 + inflationRate, yearsFromNow)

      const yearlyTotal = ageGroupCost.yearlyAverage * inflationMultiplier
      cumulativeCost += yearlyTotal

      // 生成费用分解
      const breakdown: Record<CostCategory, number> = {} as any
      ageGroupCost.items.forEach(item => {
        breakdown[item.category] = item.yearlyAmount * inflationMultiplier
      })

      projections.push({
        year,
        childAge,
        ageGroup: ageGroupCost.ageGroup,
        totalCost: Math.round(yearlyTotal),
        cumulativeCost: Math.round(cumulativeCost),
        inflationAdjustedCost: userInput.considerInflation ? Math.round(yearlyTotal) : undefined,
        breakdown
      })
    }
  })

  return projections
}

/**
 * 生成对比数据
 *
 * @param userInput - 用户输入
 * @param userCost - 用户的年均费用
 * @returns 对比数据
 */
export function generateComparisonData(
  userInput: UserInput,
  userCost: number
): ComparisonData {
  // 模拟全国和城市平均数据（实际应用中应从数据库获取）
  const nationalAverage = 50000 // 全国平均年度养娃成本
  const cityAverages = {
    'tier1': 80000,
    'new-tier1': 65000,
    'tier2': 55000,
    'tier3-4': 40000
  }

  const incomeAverages = {
    'low': 35000,
    'lower-middle': 45000,
    'middle': 55000,
    'upper-middle': 75000,
    'high': 120000
  }

  const educationAverages = {
    'public': 45000,
    'private': 85000,
    'international': 150000
  }

  const cityAverage = cityAverages[userInput.cityTier]
  const sameIncomeLevel = incomeAverages[userInput.incomeLevel]
  const sameEducationType = educationAverages[userInput.educationType]

  // 计算差异
  const vsNational = {
    amount: userCost - nationalAverage,
    percentage: ((userCost - nationalAverage) / nationalAverage) * 100,
    isHigher: userCost > nationalAverage
  }

  const vsCity = {
    amount: userCost - cityAverage,
    percentage: ((userCost - cityAverage) / cityAverage) * 100,
    isHigher: userCost > cityAverage
  }

  const vsIncomeLevel = {
    amount: userCost - sameIncomeLevel,
    percentage: ((userCost - sameIncomeLevel) / sameIncomeLevel) * 100,
    isHigher: userCost > sameIncomeLevel
  }

  // 分析主要差异因素
  const mainFactors: string[] = []
  if (Math.abs(vsCity.percentage) > 20) {
    mainFactors.push('城市等级')
  }
  if (userInput.educationType !== 'public') {
    mainFactors.push('教育选择')
  }
  if (userInput.trainingAttitude === 'active' || userInput.trainingAttitude === 'intensive') {
    mainFactors.push('培训态度')
  }
  if (userInput.housingType === 'school-district') {
    mainFactors.push('学区房')
  }

  // 计算排名百分位
  const nationalPercentile = userCost > nationalAverage ?
    Math.min(95, 50 + (vsNational.percentage / 2)) :
    Math.max(5, 50 + (vsNational.percentage / 2))

  const cityPercentile = userCost > cityAverage ?
    Math.min(95, 50 + (vsCity.percentage / 2)) :
    Math.max(5, 50 + (vsCity.percentage / 2))

  // 费用水平描述
  let levelDescription = '中等水平'
  if (nationalPercentile >= 80) {
    levelDescription = '较高水平'
  } else if (nationalPercentile >= 90) {
    levelDescription = '高水平'
  } else if (nationalPercentile <= 20) {
    levelDescription = '较低水平'
  } else if (nationalPercentile <= 10) {
    levelDescription = '低水平'
  }

  return {
    userCost,
    averages: {
      national: nationalAverage,
      city: cityAverage,
      sameIncomeLevel,
      sameEducationType
    },
    analysis: {
      vsNational,
      vsCity,
      vsIncomeLevel,
      mainFactors
    },
    ranking: {
      nationalPercentile: Math.round(nationalPercentile),
      cityPercentile: Math.round(cityPercentile),
      levelDescription
    }
  }
}

/**
 * 完整的养娃成本计算函数
 *
 * @param userInput - 用户输入的基本信息
 * @returns 完整的计算结果
 */
export function calculateCompleteChildCost(userInput: UserInput): CalculationResult {
  // 1. 计算费用分解
  const costBreakdown = calculateChildCost(userInput)

  // 2. 生成年度预测
  const yearlyProjections = generateYearlyProjections(userInput, costBreakdown)

  // 3. 生成对比数据
  const comparisonData = generateComparisonData(userInput, costBreakdown.yearlyAverage)

  // 4. 生成图表数据
  const chartData = {
    ageTrend: generateAgeTrendChartData(userInput, costBreakdown),
    categoryBreakdown: generateCategoryChartData(costBreakdown),
    yearlyForecast: yearlyProjections.map(projection => ({
      age: projection.childAge,
      cost: projection.totalCost,
      label: `${projection.year}年`,
      metadata: { year: projection.year, ageGroup: projection.ageGroup }
    }))
  }

  return {
    userInput,
    costBreakdown,
    yearlyProjections,
    comparisonData,
    chartData,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
}

// ==================== 向后兼容函数 ====================

/**
 * 向后兼容的计算函数（支持旧的CalculatorFormData类型）
 *
 * @param formData - 旧版本的表单数据
 * @returns 计算结果
 */
export function calculateChildRaisingCost(formData: CalculatorFormData): CalculationResult {
  // 将旧的CalculatorFormData转换为新的UserInput
  const userInput: UserInput = {
    cityTier: formData.location,
    incomeLevel: 'middle', // 默认中等收入
    housingType: 'owned', // 默认有房
    familySupport: 'moderate', // 默认适度支持
    educationType: formData.educationLevel || 'public',
    trainingAttitude: formData.extracurricular ? 'normal' : 'relaxed',
    childAge: formData.childAge,
    customIncome: formData.monthlyIncome
  }

  return calculateCompleteChildCost(userInput)
}

// ==================== 工具函数 ====================

/**
 * 格式化货币显示
 *
 * @param amount - 金额
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * 计算收入占比
 *
 * @param childCost - 养娃成本
 * @param monthlyIncome - 月收入
 * @returns 收入占比百分比
 */
export function calculateIncomeRatio(childCost: number, monthlyIncome: number): number {
  return Math.round((childCost / monthlyIncome) * 100)
}

/**
 * 格式化百分比
 *
 * @param ratio - 比例（0-1之间的数值）
 * @returns 格式化后的百分比字符串
 */
export function formatPercentage(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`
}

/**
 * 计算年化增长率
 *
 * @param initialValue - 初始值
 * @param finalValue - 最终值
 * @param years - 年数
 * @returns 年化增长率
 */
export function calculateAnnualGrowthRate(
  initialValue: number,
  finalValue: number,
  years: number
): number {
  return Math.pow(finalValue / initialValue, 1 / years) - 1
}
