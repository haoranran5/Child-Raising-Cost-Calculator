/**
 * 成本标准数据验证测试
 * 
 * 验证基础数据的完整性和合理性
 */

import {
  COST_STANDARDS,
  AGE_GROUP_BASE_COSTS,
  CITY_COST_MULTIPLIERS,
  INCOME_IMPACT_MULTIPLIERS,
  validateCostStandards,
  getAgeGroup,
  getBaseCostsForAge,
  calculateAdjustedCost
} from '../data/costStandards'

import {
  CityTier,
  IncomeLevel,
  AgeGroup,
  CostCategory
} from '../types'

// ==================== 数据完整性验证 ====================

/**
 * 验证所有必需的数据都存在
 */
export function validateDataCompleteness(): boolean {
  console.log('=== 数据完整性验证 ===')
  
  let isValid = true
  
  // 验证城市系数
  const requiredCityTiers: CityTier[] = ['tier1', 'new-tier1', 'tier2', 'tier3-4']
  for (const tier of requiredCityTiers) {
    if (!(tier in CITY_COST_MULTIPLIERS)) {
      console.error(`缺少城市系数: ${tier}`)
      isValid = false
    }
  }
  
  // 验证收入系数
  const requiredIncomelevels: IncomeLevel[] = ['low', 'lower-middle', 'middle', 'upper-middle', 'high']
  for (const level of requiredIncomelevels) {
    if (!(level in INCOME_IMPACT_MULTIPLIERS)) {
      console.error(`缺少收入系数: ${level}`)
      isValid = false
    }
  }
  
  // 验证年龄段数据
  const requiredAgeGroups: AgeGroup[] = ['infant', 'toddler', 'primary', 'middle', 'high']
  for (const ageGroup of requiredAgeGroups) {
    if (!(ageGroup in AGE_GROUP_BASE_COSTS)) {
      console.error(`缺少年龄段数据: ${ageGroup}`)
      isValid = false
    }
  }
  
  // 验证费用类别
  const requiredCategories: CostCategory[] = [
    'basic-needs', 'education', 'healthcare', 'housing', 'clothing',
    'entertainment', 'extracurricular', 'transportation', 'insurance', 'savings'
  ]
  
  for (const ageGroup of requiredAgeGroups) {
    const costs = AGE_GROUP_BASE_COSTS[ageGroup].costs
    for (const category of requiredCategories) {
      if (!(category in costs)) {
        console.error(`年龄段 ${ageGroup} 缺少费用类别: ${category}`)
        isValid = false
      }
    }
  }
  
  console.log(`数据完整性验证: ${isValid ? '通过' : '失败'}`)
  return isValid
}

/**
 * 验证数据的合理性
 */
export function validateDataReasonableness(): boolean {
  console.log('\n=== 数据合理性验证 ===')
  
  let isValid = true
  
  // 验证城市系数递减
  const cityMultipliers = [
    CITY_COST_MULTIPLIERS['tier1'],
    CITY_COST_MULTIPLIERS['new-tier1'],
    CITY_COST_MULTIPLIERS['tier2'],
    CITY_COST_MULTIPLIERS['tier3-4']
  ]
  
  for (let i = 1; i < cityMultipliers.length; i++) {
    if (cityMultipliers[i] >= cityMultipliers[i-1]) {
      console.error(`城市系数应该递减: ${cityMultipliers[i-1]} -> ${cityMultipliers[i]}`)
      isValid = false
    }
  }
  
  // 验证收入系数递增
  const incomeMultipliers = [
    INCOME_IMPACT_MULTIPLIERS['low'].basic,
    INCOME_IMPACT_MULTIPLIERS['lower-middle'].basic,
    INCOME_IMPACT_MULTIPLIERS['middle'].basic,
    INCOME_IMPACT_MULTIPLIERS['upper-middle'].basic,
    INCOME_IMPACT_MULTIPLIERS['high'].basic
  ]
  
  for (let i = 1; i < incomeMultipliers.length; i++) {
    if (incomeMultipliers[i] <= incomeMultipliers[i-1]) {
      console.error(`收入系数应该递增: ${incomeMultipliers[i-1]} -> ${incomeMultipliers[i]}`)
      isValid = false
    }
  }
  
  // 验证费用总和与声明的总额一致
  Object.entries(AGE_GROUP_BASE_COSTS).forEach(([ageGroup, data]) => {
    const calculatedTotal = Object.values(data.costs).reduce((sum, cost) => sum + cost, 0)
    const declaredTotal = data.totalMonthly
    
    if (Math.abs(calculatedTotal - declaredTotal) > 1) {
      console.error(`年龄段 ${ageGroup} 费用总和不一致: 计算值 ${calculatedTotal}, 声明值 ${declaredTotal}`)
      isValid = false
    }
  })
  
  console.log(`数据合理性验证: ${isValid ? '通过' : '失败'}`)
  return isValid
}

/**
 * 验证年龄映射函数
 */
export function validateAgeMappingFunction(): boolean {
  console.log('\n=== 年龄映射函数验证 ===')
  
  let isValid = true
  
  const testCases = [
    { age: 0, expected: 'infant' },
    { age: 1, expected: 'infant' },
    { age: 2, expected: 'infant' },
    { age: 3, expected: 'toddler' },
    { age: 5, expected: 'toddler' },
    { age: 6, expected: 'primary' },
    { age: 11, expected: 'primary' },
    { age: 12, expected: 'middle' },
    { age: 14, expected: 'middle' },
    { age: 15, expected: 'high' },
    { age: 18, expected: 'high' }
  ]
  
  for (const testCase of testCases) {
    try {
      const result = getAgeGroup(testCase.age)
      if (result !== testCase.expected) {
        console.error(`年龄 ${testCase.age} 映射错误: 期望 ${testCase.expected}, 实际 ${result}`)
        isValid = false
      }
    } catch (error) {
      console.error(`年龄 ${testCase.age} 映射异常: ${error}`)
      isValid = false
    }
  }
  
  // 测试边界情况
  try {
    getAgeGroup(-1)
    console.error('负数年龄应该抛出异常')
    isValid = false
  } catch (error) {
    // 预期的异常
  }
  
  try {
    getAgeGroup(19)
    console.error('超过18岁应该抛出异常')
    isValid = false
  } catch (error) {
    // 预期的异常
  }
  
  console.log(`年龄映射函数验证: ${isValid ? '通过' : '失败'}`)
  return isValid
}

/**
 * 验证成本计算函数
 */
export function validateCostCalculationFunction(): boolean {
  console.log('\n=== 成本计算函数验证 ===')
  
  let isValid = true
  
  // 测试基础计算
  const baseCost = 1000
  const tier3MiddleResult = calculateAdjustedCost(baseCost, 'tier3-4', 'middle', 'basic-needs')
  
  if (tier3MiddleResult !== baseCost) {
    console.error(`三四线城市中等收入基础费用应该等于基础成本: ${tier3MiddleResult} !== ${baseCost}`)
    isValid = false
  }
  
  // 测试城市系数影响
  const tier1Result = calculateAdjustedCost(baseCost, 'tier1', 'middle', 'basic-needs')
  const expectedTier1 = baseCost * CITY_COST_MULTIPLIERS['tier1'] * INCOME_IMPACT_MULTIPLIERS['middle'].basic
  
  if (Math.abs(tier1Result - expectedTier1) > 0.01) {
    console.error(`一线城市计算错误: ${tier1Result} !== ${expectedTier1}`)
    isValid = false
  }
  
  // 测试教育费用计算
  const educationResult = calculateAdjustedCost(baseCost, 'tier1', 'high', 'education')
  const expectedEducation = baseCost * CITY_COST_MULTIPLIERS['tier1'] * INCOME_IMPACT_MULTIPLIERS['high'].education
  
  if (Math.abs(educationResult - expectedEducation) > 0.01) {
    console.error(`教育费用计算错误: ${educationResult} !== ${expectedEducation}`)
    isValid = false
  }
  
  console.log(`成本计算函数验证: ${isValid ? '通过' : '失败'}`)
  return isValid
}

/**
 * 验证数据范围合理性
 */
export function validateDataRanges(): boolean {
  console.log('\n=== 数据范围验证 ===')
  
  let isValid = true
  
  // 验证城市系数范围
  Object.entries(CITY_COST_MULTIPLIERS).forEach(([tier, multiplier]) => {
    if (multiplier < 0.5 || multiplier > 5.0) {
      console.error(`城市系数 ${tier} 超出合理范围: ${multiplier}`)
      isValid = false
    }
  })
  
  // 验证收入系数范围
  Object.entries(INCOME_IMPACT_MULTIPLIERS).forEach(([level, multipliers]) => {
    if (multipliers.basic < 0.3 || multipliers.basic > 3.0) {
      console.error(`收入基础系数 ${level} 超出合理范围: ${multipliers.basic}`)
      isValid = false
    }
    if (multipliers.education < 0.3 || multipliers.education > 5.0) {
      console.error(`收入教育系数 ${level} 超出合理范围: ${multipliers.education}`)
      isValid = false
    }
  })
  
  // 验证基础费用范围
  Object.entries(AGE_GROUP_BASE_COSTS).forEach(([ageGroup, data]) => {
    if (data.totalMonthly < 1000 || data.totalMonthly > 20000) {
      console.error(`年龄段 ${ageGroup} 总费用超出合理范围: ${data.totalMonthly}`)
      isValid = false
    }
    
    Object.entries(data.costs).forEach(([category, cost]) => {
      if (cost < 0 || cost > 10000) {
        console.error(`年龄段 ${ageGroup} 类别 ${category} 费用超出合理范围: ${cost}`)
        isValid = false
      }
    })
  })
  
  console.log(`数据范围验证: ${isValid ? '通过' : '失败'}`)
  return isValid
}

/**
 * 运行所有验证测试
 */
export function runAllValidations(): boolean {
  console.log('开始运行成本标准数据验证...\n')
  
  const results = [
    validateDataCompleteness(),
    validateDataReasonableness(),
    validateAgeMappingFunction(),
    validateCostCalculationFunction(),
    validateDataRanges(),
    validateCostStandards()
  ]
  
  const allPassed = results.every(result => result)
  
  console.log(`\n=== 验证总结 ===`)
  console.log(`总体结果: ${allPassed ? '✅ 所有验证通过' : '❌ 存在验证失败'}`)
  console.log(`通过率: ${results.filter(r => r).length}/${results.length}`)
  
  return allPassed
}

// 如果直接运行此文件，执行所有验证
if (typeof require !== 'undefined' && require.main === module) {
  runAllValidations()
}
