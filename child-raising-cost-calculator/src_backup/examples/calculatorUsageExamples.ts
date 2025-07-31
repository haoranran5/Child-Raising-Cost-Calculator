/**
 * 费用计算函数使用示例
 * 
 * 展示如何使用新的calculateChildCost函数进行各种场景的计算
 */

import {
  calculateChildCost,
  calculateCompleteChildCost,
  generateComparisonData,
  formatCurrency,
  formatPercentage
} from '../utils/calculator'

import { UserInput } from '../types'

// ==================== 基础使用示例 ====================

/**
 * 示例1：北京中产家庭计算5岁孩子的养育成本
 */
export function example1_BeijingMiddleClass() {
  console.log('=== 示例1：北京中产家庭养育5岁孩子 ===')
  
  const userInput: UserInput = {
    cityTier: 'tier1',           // 北京（一线城市）
    incomeLevel: 'middle',       // 中等收入（15k-25k）
    housingType: 'owned',        // 有房
    familySupport: 'moderate',   // 适度家庭支持
    educationType: 'public',     // 公立教育
    trainingAttitude: 'normal',  // 普通培训态度
    childAge: 5,                 // 5岁孩子
    customIncome: 20000          // 月收入2万
  }
  
  // 计算费用分解
  const costBreakdown = calculateChildCost(userInput)
  
  console.log(`总费用（5-18岁）: ${formatCurrency(costBreakdown.totalCost)}`)
  console.log(`年均费用: ${formatCurrency(costBreakdown.yearlyAverage)}`)
  console.log(`月均费用: ${formatCurrency(costBreakdown.monthlyAverage)}`)
  console.log(`收入占比: ${formatPercentage(costBreakdown.incomeRatio)}`)
  
  console.log('\n按年龄段分解:')
  costBreakdown.byAgeGroup.forEach(ageGroup => {
    console.log(`  ${ageGroup.ageRange.min}-${ageGroup.ageRange.max}岁: ${formatCurrency(ageGroup.totalCost)}`)
  })
  
  console.log('\n按类别分解（月均）:')
  Object.values(costBreakdown.byCategory)
    .filter(item => item.monthlyAmount > 0)
    .sort((a, b) => b.monthlyAmount - a.monthlyAmount)
    .forEach(item => {
      console.log(`  ${item.name}: ${formatCurrency(item.monthlyAmount)} (${item.percentage.toFixed(1)}%)`)
    })
  
  return costBreakdown
}

/**
 * 示例2：成都高收入家庭，私立教育+积极培训
 */
export function example2_ChengduHighIncomePrivate() {
  console.log('\n=== 示例2：成都高收入家庭，私立教育+积极培训 ===')
  
  const userInput: UserInput = {
    cityTier: 'new-tier1',       // 成都（新一线）
    incomeLevel: 'high',         // 高收入（>50k）
    housingType: 'school-district', // 学区房
    familySupport: 'minimal',    // 最少家庭支持
    educationType: 'private',    // 私立教育
    trainingAttitude: 'active',  // 积极培训
    childAge: 8,                 // 8岁孩子
    customIncome: 60000          // 月收入6万
  }
  
  const costBreakdown = calculateChildCost(userInput)
  
  console.log(`总费用（8-18岁）: ${formatCurrency(costBreakdown.totalCost)}`)
  console.log(`年均费用: ${formatCurrency(costBreakdown.yearlyAverage)}`)
  console.log(`月均费用: ${formatCurrency(costBreakdown.monthlyAverage)}`)
  console.log(`收入占比: ${formatPercentage(costBreakdown.incomeRatio)}`)
  
  // 重点关注教育和培训费用
  const education = costBreakdown.byCategory['education']
  const training = costBreakdown.byCategory['extracurricular']
  
  console.log(`\n教育投入重点:`)
  console.log(`  教育费用: ${formatCurrency(education.monthlyAmount)}/月 (${education.percentage.toFixed(1)}%)`)
  console.log(`  课外培训: ${formatCurrency(training.monthlyAmount)}/月 (${training.percentage.toFixed(1)}%)`)
  console.log(`  教育总投入: ${formatCurrency(education.monthlyAmount + training.monthlyAmount)}/月`)
  
  return costBreakdown
}

/**
 * 示例3：三线城市低收入家庭，佛系养娃
 */
export function example3_Tier3LowIncomeBuddhist() {
  console.log('\n=== 示例3：三线城市低收入家庭，佛系养娃 ===')
  
  const userInput: UserInput = {
    cityTier: 'tier3-4',         // 三四线城市
    incomeLevel: 'low',          // 低收入（<8k）
    housingType: 'rental',       // 租房
    familySupport: 'significant', // 较多家庭支持
    educationType: 'public',     // 公立教育
    trainingAttitude: 'relaxed', // 佛系培训
    childAge: 10,                // 10岁孩子
    customIncome: 6000           // 月收入6千
  }
  
  const costBreakdown = calculateChildCost(userInput)
  
  console.log(`总费用（10-18岁）: ${formatCurrency(costBreakdown.totalCost)}`)
  console.log(`年均费用: ${formatCurrency(costBreakdown.yearlyAverage)}`)
  console.log(`月均费用: ${formatCurrency(costBreakdown.monthlyAverage)}`)
  console.log(`收入占比: ${formatPercentage(costBreakdown.incomeRatio)}`)
  
  // 分析必需费用vs可选费用
  console.log(`\n费用结构分析:`)
  console.log(`  必需费用: ${formatCurrency(costBreakdown.essentialCosts)}/年`)
  console.log(`  可选费用: ${formatCurrency(costBreakdown.optionalCosts)}/年`)
  console.log(`  必需费用占比: ${((costBreakdown.essentialCosts / costBreakdown.yearlyAverage) * 100).toFixed(1)}%`)
  
  return costBreakdown
}

/**
 * 示例4：完整计算结果展示
 */
export function example4_CompleteCalculation() {
  console.log('\n=== 示例4：完整计算结果展示 ===')
  
  const userInput: UserInput = {
    cityTier: 'tier2',
    incomeLevel: 'upper-middle',
    housingType: 'owned',
    familySupport: 'moderate',
    educationType: 'private',
    trainingAttitude: 'active',
    childAge: 6,
    considerInflation: true,
    customIncome: 35000
  }
  
  // 获取完整计算结果
  const result = calculateCompleteChildCost(userInput)
  
  console.log('基础费用信息:')
  console.log(`  总费用: ${formatCurrency(result.costBreakdown.totalCost)}`)
  console.log(`  年均费用: ${formatCurrency(result.costBreakdown.yearlyAverage)}`)
  console.log(`  月均费用: ${formatCurrency(result.costBreakdown.monthlyAverage)}`)
  
  console.log('\n对比分析:')
  const comparison = result.comparisonData
  console.log(`  vs 全国平均: ${comparison.analysis.vsNational.isHigher ? '+' : ''}${formatCurrency(comparison.analysis.vsNational.amount)} (${comparison.analysis.vsNational.percentage.toFixed(1)}%)`)
  console.log(`  vs 城市平均: ${comparison.analysis.vsCity.isHigher ? '+' : ''}${formatCurrency(comparison.analysis.vsCity.amount)} (${comparison.analysis.vsCity.percentage.toFixed(1)}%)`)
  console.log(`  费用水平: ${comparison.ranking.levelDescription}`)
  console.log(`  主要影响因素: ${comparison.analysis.mainFactors.join('、')}`)
  
  console.log('\n年度预测（前5年）:')
  result.yearlyProjections.slice(0, 5).forEach(projection => {
    console.log(`  ${projection.year}年（${projection.childAge}岁）: ${formatCurrency(projection.totalCost)}`)
  })
  
  console.log('\n图表数据点数:')
  console.log(`  年龄趋势图: ${result.chartData.ageTrend.length}个数据点`)
  console.log(`  类别分布图: ${result.chartData.categoryBreakdown.length}个类别`)
  console.log(`  年度预测图: ${result.chartData.yearlyForecast.length}个年度`)
  
  return result
}

/**
 * 示例5：多场景对比分析
 */
export function example5_ScenarioComparison() {
  console.log('\n=== 示例5：多场景对比分析 ===')
  
  const baseInput: UserInput = {
    cityTier: 'tier1',
    incomeLevel: 'middle',
    housingType: 'owned',
    familySupport: 'moderate',
    educationType: 'public',
    trainingAttitude: 'normal',
    childAge: 8,
    customIncome: 20000
  }
  
  // 场景1：基础场景
  const scenario1 = calculateChildCost(baseInput)
  
  // 场景2：私立教育
  const scenario2 = calculateChildCost({
    ...baseInput,
    educationType: 'private'
  })
  
  // 场景3：国际教育
  const scenario3 = calculateChildCost({
    ...baseInput,
    educationType: 'international'
  })
  
  // 场景4：鸡娃模式
  const scenario4 = calculateChildCost({
    ...baseInput,
    trainingAttitude: 'intensive'
  })
  
  console.log('不同场景年均费用对比:')
  console.log(`  公立教育: ${formatCurrency(scenario1.yearlyAverage)}`)
  console.log(`  私立教育: ${formatCurrency(scenario2.yearlyAverage)} (+${formatCurrency(scenario2.yearlyAverage - scenario1.yearlyAverage)})`)
  console.log(`  国际教育: ${formatCurrency(scenario3.yearlyAverage)} (+${formatCurrency(scenario3.yearlyAverage - scenario1.yearlyAverage)})`)
  console.log(`  鸡娃模式: ${formatCurrency(scenario4.yearlyAverage)} (+${formatCurrency(scenario4.yearlyAverage - scenario1.yearlyAverage)})`)
  
  console.log('\n教育费用占比对比:')
  const getEducationRatio = (breakdown: any) => {
    const education = breakdown.byCategory['education'].monthlyAmount
    const training = breakdown.byCategory['extracurricular'].monthlyAmount
    return ((education + training) / breakdown.monthlyAverage) * 100
  }
  
  console.log(`  公立教育: ${getEducationRatio(scenario1).toFixed(1)}%`)
  console.log(`  私立教育: ${getEducationRatio(scenario2).toFixed(1)}%`)
  console.log(`  国际教育: ${getEducationRatio(scenario3).toFixed(1)}%`)
  console.log(`  鸡娃模式: ${getEducationRatio(scenario4).toFixed(1)}%`)
  
  return {
    public: scenario1,
    private: scenario2,
    international: scenario3,
    intensive: scenario4
  }
}

// ==================== 运行所有示例 ====================

export function runAllCalculatorExamples() {
  console.log('养娃成本计算函数使用示例\n')
  
  const results = {
    example1: example1_BeijingMiddleClass(),
    example2: example2_ChengduHighIncomePrivate(),
    example3: example3_Tier3LowIncomeBuddhist(),
    example4: example4_CompleteCalculation(),
    example5: example5_ScenarioComparison()
  }
  
  console.log('\n=== 总结 ===')
  console.log('所有示例计算完成，展示了不同场景下的养娃成本计算结果。')
  console.log('新的计算函数支持：')
  console.log('- 多维度费用分析（城市、收入、教育、培训等）')
  console.log('- 详细的年龄段费用分解')
  console.log('- 必需费用vs可选费用分析')
  console.log('- 与平均水平的对比分析')
  console.log('- 年度预测和通胀调整')
  console.log('- 丰富的图表数据生成')
  
  return results
}

// 如果直接运行此文件，执行所有示例
if (typeof require !== 'undefined' && require.main === module) {
  runAllCalculatorExamples()
}
