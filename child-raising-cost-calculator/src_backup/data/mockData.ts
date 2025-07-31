import { CalculationResult, CalculatorFormData } from '../types'

// 模拟计算结果数据
export const mockCalculationResult: CalculationResult = {
  monthlyCost: 4500,
  yearlyTotal: 54000,
  breakdown: {
    basicNeeds: 2000,
    education: 1500,
    healthcare: 400,
    clothing: 300,
    entertainment: 200,
    extracurricular: 100
  },
  chartData: [
    { age: 0, cost: 4200 },
    { age: 1, cost: 4300 },
    { age: 2, cost: 4400 },
    { age: 3, cost: 4000 },
    { age: 4, cost: 4100 },
    { age: 5, cost: 4200 },
    { age: 6, cost: 5200 },
    { age: 7, cost: 5300 },
    { age: 8, cost: 5400 },
    { age: 9, cost: 5500 },
    { age: 10, cost: 5600 },
    { age: 11, cost: 5700 },
    { age: 12, cost: 6750 },
    { age: 13, cost: 6850 },
    { age: 14, cost: 6950 },
    { age: 15, cost: 7650 },
    { age: 16, cost: 7750 },
    { age: 17, cost: 7850 },
    { age: 18, cost: 9000 }
  ],
  projections: [
    { year: 2024, totalCost: 54000, cumulativeCost: 54000 },
    { year: 2025, totalCost: 56700, cumulativeCost: 110700 },
    { year: 2026, totalCost: 59535, cumulativeCost: 170235 },
    { year: 2027, totalCost: 48000, cumulativeCost: 218235 },
    { year: 2028, totalCost: 50400, cumulativeCost: 268635 }
  ]
}

// 模拟表单数据
export const mockFormData: CalculatorFormData = {
  monthlyIncome: 15000,
  childAge: 3,
  location: 'tier2',
  educationLevel: 'basic',
  healthcareLevel: 'basic',
  extracurricular: false
}

// 不同场景的模拟数据
export const scenarioData = {
  // 一线城市高收入家庭
  tier1HighIncome: {
    formData: {
      monthlyIncome: 30000,
      childAge: 5,
      location: 'tier1' as const,
      educationLevel: 'premium' as const,
      healthcareLevel: 'premium' as const,
      extracurricular: true
    },
    result: {
      monthlyCost: 8500,
      yearlyTotal: 102000,
      breakdown: {
        basicNeeds: 3600,
        education: 2700,
        healthcare: 1440,
        clothing: 900,
        entertainment: 1080,
        extracurricular: 1800
      }
    }
  },
  
  // 三线城市中等收入家庭
  tier3MiddleIncome: {
    formData: {
      monthlyIncome: 8000,
      childAge: 8,
      location: 'tier3' as const,
      educationLevel: 'basic' as const,
      healthcareLevel: 'basic' as const,
      extracurricular: false
    },
    result: {
      monthlyCost: 3900,
      yearlyTotal: 46800,
      breakdown: {
        basicNeeds: 2600,
        education: 1950,
        healthcare: 800,
        clothing: 650,
        entertainment: 600,
        extracurricular: 0
      }
    }
  },
  
  // 二线城市国际教育家庭
  tier2International: {
    formData: {
      monthlyIncome: 25000,
      childAge: 12,
      location: 'tier2' as const,
      educationLevel: 'international' as const,
      healthcareLevel: 'premium' as const,
      extracurricular: true
    },
    result: {
      monthlyCost: 12500,
      yearlyTotal: 150000,
      breakdown: {
        basicNeeds: 3900,
        education: 4875,
        healthcare: 1872,
        clothing: 975,
        entertainment: 1170,
        extracurricular: 1950
      }
    }
  }
}
