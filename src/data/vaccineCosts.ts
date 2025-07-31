/**
 * 中国儿童疫苗接种费用配置
 * 基于国家免疫规划和实际市场价格
 */

export interface VaccineInfo {
  name: string
  category: 'free' | 'paid' | 'optional'
  ageMonths: number[]
  price: number
  description: string
  necessity: 'required' | 'recommended' | 'optional'
}

/**
 * 国家免疫规划疫苗（免费）
 */
export const FREE_VACCINES: VaccineInfo[] = [
  {
    name: '乙肝疫苗',
    category: 'free',
    ageMonths: [0, 1, 6],
    price: 0,
    description: '预防乙型肝炎，国家免疫规划疫苗',
    necessity: 'required'
  },
  {
    name: '卡介苗',
    category: 'free',
    ageMonths: [0],
    price: 0,
    description: '预防结核病，出生时接种',
    necessity: 'required'
  },
  {
    name: '脊髓灰质炎疫苗',
    category: 'free',
    ageMonths: [2, 3, 4, 4],
    price: 0,
    description: '预防小儿麻痹症，口服疫苗',
    necessity: 'required'
  },
  {
    name: '百白破疫苗',
    category: 'free',
    ageMonths: [3, 4, 5, 18],
    price: 0,
    description: '预防百日咳、白喉、破伤风',
    necessity: 'required'
  },
  {
    name: '麻疹疫苗',
    category: 'free',
    ageMonths: [8],
    price: 0,
    description: '预防麻疹，国家免疫规划疫苗',
    necessity: 'required'
  },
  {
    name: '麻腮风疫苗',
    category: 'free',
    ageMonths: [18],
    price: 0,
    description: '预防麻疹、腮腺炎、风疹',
    necessity: 'required'
  },
  {
    name: '乙脑疫苗',
    category: 'free',
    ageMonths: [8, 24],
    price: 0,
    description: '预防流行性乙型脑炎',
    necessity: 'required'
  },
  {
    name: '甲肝疫苗',
    category: 'free',
    ageMonths: [18],
    price: 0,
    description: '预防甲型肝炎，国家免疫规划疫苗',
    necessity: 'required'
  },
  {
    name: 'A群流脑疫苗',
    category: 'free',
    ageMonths: [6, 9],
    price: 0,
    description: '预防A群脑膜炎球菌感染',
    necessity: 'required'
  },
  {
    name: 'A+C群流脑疫苗',
    category: 'free',
    ageMonths: [3, 6],
    price: 0,
    description: '预防A群和C群脑膜炎球菌感染',
    necessity: 'required'
  }
]

/**
 * 自费疫苗（推荐接种）
 */
export const PAID_VACCINES: VaccineInfo[] = [
  {
    name: '五联疫苗',
    category: 'paid',
    ageMonths: [2, 3, 4, 18],
    price: 650,
    description: '预防白喉、破伤风、百日咳、脊髓灰质炎、b型流感嗜血杆菌感染',
    necessity: 'recommended'
  },
  {
    name: '六联疫苗',
    category: 'paid',
    ageMonths: [2, 3, 4, 18],
    price: 750,
    description: '在五联基础上增加乙肝疫苗',
    necessity: 'recommended'
  },
  {
    name: '轮状病毒疫苗',
    category: 'paid',
    ageMonths: [2, 4],
    price: 300,
    description: '预防轮状病毒引起的腹泻',
    necessity: 'recommended'
  },
  {
    name: '水痘疫苗',
    category: 'paid',
    ageMonths: [12],
    price: 350,
    description: '预防水痘，推荐1岁后接种',
    necessity: 'recommended'
  },
  {
    name: '手足口病疫苗',
    category: 'paid',
    ageMonths: [6, 7],
    price: 200,
    description: '预防手足口病，EV71型',
    necessity: 'recommended'
  },
  {
    name: '流感疫苗',
    category: 'paid',
    ageMonths: [6, 7, 8, 9, 10, 11, 12, 18, 24, 30, 36],
    price: 150,
    description: '预防流行性感冒，每年接种',
    necessity: 'recommended'
  },
  {
    name: '肺炎球菌疫苗',
    category: 'paid',
    ageMonths: [2, 4, 6, 12],
    price: 800,
    description: '预防肺炎球菌感染，13价疫苗',
    necessity: 'recommended'
  },
  {
    name: 'Hib疫苗',
    category: 'paid',
    ageMonths: [2, 3, 4, 18],
    price: 120,
    description: '预防b型流感嗜血杆菌感染',
    necessity: 'recommended'
  }
]

/**
 * 可选疫苗（根据经济情况选择）
 */
export const OPTIONAL_VACCINES: VaccineInfo[] = [
  {
    name: 'HPV疫苗',
    category: 'optional',
    ageMonths: [156, 168, 180], // 13-15岁
    price: 1300,
    description: '预防人乳头瘤病毒，9价疫苗',
    necessity: 'optional'
  },
  {
    name: '带状疱疹疫苗',
    category: 'optional',
    ageMonths: [600], // 50岁
    price: 1600,
    description: '预防带状疱疹，成人疫苗',
    necessity: 'optional'
  },
  {
    name: '狂犬病疫苗',
    category: 'optional',
    ageMonths: [0], // 暴露后接种
    price: 300,
    description: '预防狂犬病，暴露后接种',
    necessity: 'optional'
  }
]

/**
 * 按年龄段计算疫苗费用
 */
export function calculateVaccineCosts(ageMonths: number, includeOptional: boolean = false): {
  freeVaccines: VaccineInfo[]
  paidVaccines: VaccineInfo[]
  optionalVaccines: VaccineInfo[]
  totalCost: number
  breakdown: {
    free: number
    paid: number
    optional: number
  }
} {
  const freeVaccines = FREE_VACCINES.filter(v => v.ageMonths.includes(ageMonths))
  const paidVaccines = PAID_VACCINES.filter(v => v.ageMonths.includes(ageMonths))
  const optionalVaccines = includeOptional ? OPTIONAL_VACCINES.filter(v => v.ageMonths.includes(ageMonths)) : []

  const totalCost = paidVaccines.reduce((sum, v) => sum + v.price, 0) + 
                   optionalVaccines.reduce((sum, v) => sum + v.price, 0)

  return {
    freeVaccines,
    paidVaccines,
    optionalVaccines,
    totalCost,
    breakdown: {
      free: 0,
      paid: paidVaccines.reduce((sum, v) => sum + v.price, 0),
      optional: optionalVaccines.reduce((sum, v) => sum + v.price, 0)
    }
  }
}

/**
 * 计算0-18岁总疫苗费用
 */
export function calculateTotalVaccineCosts(includeOptional: boolean = false): {
  totalCost: number
  annualBreakdown: Record<number, number>
  vaccineSchedule: Record<number, VaccineInfo[]>
} {
  let totalCost = 0
  const annualBreakdown: Record<number, number> = {}
  const vaccineSchedule: Record<number, VaccineInfo[]> = {}

  // 计算0-18岁每个月的疫苗费用
  for (let month = 0; month <= 216; month++) {
    const monthCosts = calculateVaccineCosts(month, includeOptional)
    const year = Math.floor(month / 12)
    
    if (monthCosts.totalCost > 0) {
      if (!annualBreakdown[year]) {
        annualBreakdown[year] = 0
        vaccineSchedule[year] = []
      }
      annualBreakdown[year] += monthCosts.totalCost
      vaccineSchedule[year].push(...monthCosts.paidVaccines, ...monthCosts.optionalVaccines)
    }
    
    totalCost += monthCosts.totalCost
  }

  return {
    totalCost,
    annualBreakdown,
    vaccineSchedule
  }
}

/**
 * 获取疫苗建议
 */
export function getVaccineRecommendations(ageMonths: number, familyIncome: 'low' | 'medium' | 'high'): string[] {
  const recommendations: string[] = []
  const costs = calculateVaccineCosts(ageMonths, familyIncome === 'high')

  // 基础建议
  recommendations.push('国家免疫规划疫苗全部免费，必须按时接种。')

  if (costs.paidVaccines.length > 0) {
    recommendations.push(`本月需要接种${costs.paidVaccines.length}种自费疫苗，费用约${costs.totalCost}元。`)
  }

  // 根据收入水平给出建议
  if (familyIncome === 'low') {
    recommendations.push('建议优先接种五联疫苗、水痘疫苗等核心自费疫苗，其他可根据经济情况选择。')
  } else if (familyIncome === 'medium') {
    recommendations.push('建议接种推荐的自费疫苗，包括五联、水痘、肺炎球菌等疫苗。')
  } else {
    recommendations.push('经济条件允许，建议接种所有推荐疫苗，包括HPV疫苗等可选疫苗。')
  }

  return recommendations
} 