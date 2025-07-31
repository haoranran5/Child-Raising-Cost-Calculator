/**
 * 养娃成本计算示例
 * 
 * 展示如何使用基础数据配置进行成本计算
 */

import {
  COST_STANDARDS,
  getAgeGroup,
  getBaseCostsForAge,
  calculateAdjustedCost,
  AGE_GROUP_BASE_COSTS,
  CITY_COST_MULTIPLIERS,
  INCOME_IMPACT_MULTIPLIERS
} from '../data/costStandards'

import {
  UserInput,
  CostBreakdown,
  AgeGroupCost,
  CostItem,
  CostCategory
} from '../types'

// ==================== 基础计算示例 ====================

/**
 * 示例1：北京中产家庭养育5岁孩子的月均成本
 */
export function example1_BeijingMiddleClass() {
  const userInput: UserInput = {
    cityTier: 'tier1',           // 北京（一线城市）
    incomeLevel: 'middle',       // 中等收入
    housingType: 'owned',        // 有房
    familySupport: 'moderate',   // 适度支持
    educationType: 'public',     // 公立教育
    trainingAttitude: 'normal',  // 普通培训态度
    childAge: 5
  }

  const ageGroup = getAgeGroup(userInput.childAge) // 'toddler'
  const baseCosts = getBaseCostsForAge(userInput.childAge)
  
  console.log('=== 北京中产家庭养育5岁孩子成本 ===')
  console.log(`年龄段: ${baseCosts.label}`)
  console.log(`基础月均成本: ${baseCosts.totalMonthly}元`)
  
  // 应用城市系数
  const cityMultiplier = CITY_COST_MULTIPLIERS[userInput.cityTier] // 2.2
  const adjustedTotal = baseCosts.totalMonthly * cityMultiplier
  
  console.log(`城市系数: ${cityMultiplier}`)
  console.log(`调整后月均成本: ${adjustedTotal}元`)
  console.log(`年度总成本: ${adjustedTotal * 12}元`)
  
  return {
    baseCost: baseCosts.totalMonthly,
    adjustedCost: adjustedTotal,
    yearlyTotal: adjustedTotal * 12
  }
}

/**
 * 示例2：成都高收入家庭养育12岁孩子（私立教育+积极培训）
 */
export function example2_ChengduHighIncome() {
  const userInput: UserInput = {
    cityTier: 'new-tier1',       // 成都（新一线）
    incomeLevel: 'high',         // 高收入
    housingType: 'school-district', // 学区房
    familySupport: 'minimal',    // 最少支持
    educationType: 'private',    // 私立教育
    trainingAttitude: 'active',  // 积极培训
    childAge: 12
  }

  const baseCosts = getBaseCostsForAge(userInput.childAge)
  
  console.log('\n=== 成都高收入家庭养育12岁孩子成本 ===')
  console.log(`年龄段: ${baseCosts.label}`)
  
  // 计算各类费用的调整后成本
  const cityMultiplier = CITY_COST_MULTIPLIERS[userInput.cityTier] // 1.8
  const incomeMultipliers = INCOME_IMPACT_MULTIPLIERS[userInput.incomeLevel] // high
  const educationMultiplier = COST_STANDARDS.educationMultipliers[userInput.educationType] // 2.5
  const trainingMultiplier = COST_STANDARDS.trainingMultipliers[userInput.trainingAttitude] // 2.0
  const housingMultiplier = COST_STANDARDS.housingMultipliers[userInput.housingType] // 1.3
  const familyMultiplier = COST_STANDARDS.familySupportMultipliers[userInput.familySupport] // 1.2
  
  let totalAdjustedCost = 0
  
  Object.entries(baseCosts.costs).forEach(([category, baseCost]) => {
    let adjustedCost = baseCost * cityMultiplier
    
    // 根据费用类别应用不同的收入系数
    if (category === 'education') {
      adjustedCost *= incomeMultipliers.education * educationMultiplier
    } else if (category === 'extracurricular') {
      adjustedCost *= incomeMultipliers.education * trainingMultiplier
    } else if (category === 'entertainment' || category === 'clothing') {
      adjustedCost *= incomeMultipliers.quality
    } else {
      adjustedCost *= incomeMultipliers.basic
    }
    
    // 应用住房和家庭支持系数
    if (category === 'housing') {
      adjustedCost *= housingMultiplier
    }
    adjustedCost *= familyMultiplier
    
    totalAdjustedCost += adjustedCost
    
    console.log(`${category}: ${baseCost}元 -> ${Math.round(adjustedCost)}元`)
  })
  
  console.log(`总月均成本: ${Math.round(totalAdjustedCost)}元`)
  console.log(`年度总成本: ${Math.round(totalAdjustedCost * 12)}元`)
  
  return {
    baseCost: baseCosts.totalMonthly,
    adjustedCost: Math.round(totalAdjustedCost),
    yearlyTotal: Math.round(totalAdjustedCost * 12)
  }
}

/**
 * 示例3：三线城市低收入家庭养育8岁孩子（公立教育+佛系培训）
 */
export function example3_Tier3LowIncome() {
  const userInput: UserInput = {
    cityTier: 'tier3-4',         // 三四线城市
    incomeLevel: 'low',          // 低收入
    housingType: 'rental',       // 租房
    familySupport: 'significant', // 较多支持
    educationType: 'public',     // 公立教育
    trainingAttitude: 'relaxed', // 佛系培训
    childAge: 8
  }

  const baseCosts = getBaseCostsForAge(userInput.childAge)
  
  console.log('\n=== 三线城市低收入家庭养育8岁孩子成本 ===')
  console.log(`年龄段: ${baseCosts.label}`)
  
  const cityMultiplier = CITY_COST_MULTIPLIERS[userInput.cityTier] // 1.0
  const incomeMultipliers = INCOME_IMPACT_MULTIPLIERS[userInput.incomeLevel] // low
  const trainingMultiplier = COST_STANDARDS.trainingMultipliers[userInput.trainingAttitude] // 0.3
  const housingMultiplier = COST_STANDARDS.housingMultipliers[userInput.housingType] // 1.15
  const familyMultiplier = COST_STANDARDS.familySupportMultipliers[userInput.familySupport] // 0.8
  
  let totalAdjustedCost = 0
  
  Object.entries(baseCosts.costs).forEach(([category, baseCost]) => {
    let adjustedCost = baseCost * cityMultiplier
    
    if (category === 'education') {
      adjustedCost *= incomeMultipliers.education
    } else if (category === 'extracurricular') {
      adjustedCost *= incomeMultipliers.education * trainingMultiplier
    } else if (category === 'entertainment' || category === 'clothing') {
      adjustedCost *= incomeMultipliers.quality
    } else {
      adjustedCost *= incomeMultipliers.basic
    }
    
    if (category === 'housing') {
      adjustedCost *= housingMultiplier
    }
    adjustedCost *= familyMultiplier
    
    totalAdjustedCost += adjustedCost
  })
  
  console.log(`基础月均成本: ${baseCosts.totalMonthly}元`)
  console.log(`调整后月均成本: ${Math.round(totalAdjustedCost)}元`)
  console.log(`年度总成本: ${Math.round(totalAdjustedCost * 12)}元`)
  
  return {
    baseCost: baseCosts.totalMonthly,
    adjustedCost: Math.round(totalAdjustedCost),
    yearlyTotal: Math.round(totalAdjustedCost * 12)
  }
}

/**
 * 示例4：完整的成本分解计算
 */
export function example4_CompleteCostBreakdown(userInput: UserInput): CostBreakdown {
  const ageGroup = getAgeGroup(userInput.childAge)
  const baseCosts = AGE_GROUP_BASE_COSTS[ageGroup]
  
  // 计算调整后的各项费用
  const adjustedCosts: Record<CostCategory, number> = {} as any
  let totalAdjustedCost = 0
  
  Object.entries(baseCosts.costs).forEach(([category, baseCost]) => {
    const adjustedCost = calculateAdjustedCost(
      baseCost,
      userInput.cityTier,
      userInput.incomeLevel,
      category as CostCategory
    )
    
    adjustedCosts[category as CostCategory] = adjustedCost
    totalAdjustedCost += adjustedCost
  })
  
  // 构建费用项目
  const costItems: Record<CostCategory, CostItem> = {} as any
  Object.entries(adjustedCosts).forEach(([category, amount]) => {
    costItems[category as CostCategory] = {
      category: category as CostCategory,
      name: getCategoryName(category as CostCategory),
      monthlyAmount: amount,
      yearlyAmount: amount * 12,
      isEssential: isEssentialCategory(category as CostCategory),
      percentage: (amount / totalAdjustedCost) * 100
    }
  })
  
  // 计算必需和可选费用
  const essentialCosts = Object.values(costItems)
    .filter(item => item.isEssential)
    .reduce((sum, item) => sum + item.monthlyAmount, 0)
  
  const optionalCosts = totalAdjustedCost - essentialCosts
  
  return {
    totalCost: totalAdjustedCost * 12 * (18 - userInput.childAge), // 到18岁的总成本
    yearlyAverage: totalAdjustedCost * 12,
    monthlyAverage: totalAdjustedCost,
    byAgeGroup: [], // 简化示例，实际应包含所有年龄段
    byCategory: costItems,
    essentialCosts: essentialCosts * 12,
    optionalCosts: optionalCosts * 12,
    incomeRatio: 0 // 需要收入数据计算
  }
}

// ==================== 辅助函数 ====================

function getCategoryName(category: CostCategory): string {
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

function isEssentialCategory(category: CostCategory): boolean {
  const essentialCategories: CostCategory[] = [
    'basic-needs', 'education', 'healthcare', 'housing', 'clothing'
  ]
  return essentialCategories.includes(category)
}

// ==================== 运行示例 ====================

export function runAllExamples() {
  console.log('养娃成本计算示例\n')
  
  const result1 = example1_BeijingMiddleClass()
  const result2 = example2_ChengduHighIncome()
  const result3 = example3_Tier3LowIncome()
  
  console.log('\n=== 对比总结 ===')
  console.log(`北京中产(5岁): ${result1.yearlyTotal}元/年`)
  console.log(`成都高收入(12岁): ${result2.yearlyTotal}元/年`)
  console.log(`三线低收入(8岁): ${result3.yearlyTotal}元/年`)
  
  return {
    beijing: result1,
    chengdu: result2,
    tier3: result3
  }
}

// 如果直接运行此文件，执行示例
if (typeof require !== 'undefined' && require.main === module) {
  runAllExamples()
}
