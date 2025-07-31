import { CalculationResult, CalculatorFormData } from '../types'
import { formatCurrency } from './calculator'

// 导出为JSON格式
export const exportToJSON = (data: CalculationResult, formData: CalculatorFormData): string => {
  const exportData = {
    timestamp: new Date().toISOString(),
    formData,
    result: data,
    metadata: {
      version: '1.0.0',
      generator: '养娃成本计算器'
    }
  }
  
  return JSON.stringify(exportData, null, 2)
}

// 导出为CSV格式
export const exportToCSV = (data: CalculationResult): string => {
  const headers = ['类别', '月均成本(元)', '年度成本(元)']
  const rows = [
    ['基本需求', data.breakdown.basicNeeds, data.breakdown.basicNeeds * 12],
    ['教育费用', data.breakdown.education, data.breakdown.education * 12],
    ['医疗保健', data.breakdown.healthcare, data.breakdown.healthcare * 12],
    ['服装费用', data.breakdown.clothing, data.breakdown.clothing * 12],
    ['娱乐活动', data.breakdown.entertainment, data.breakdown.entertainment * 12],
    ['课外活动', data.breakdown.extracurricular, data.breakdown.extracurricular * 12],
    ['总计', data.monthlyCost, data.yearlyTotal]
  ]

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  return csvContent
}

// 生成报告文本
export const generateReport = (data: CalculationResult, formData: CalculatorFormData): string => {
  const cityLabels = {
    tier1: '一线城市',
    tier2: '二线城市',
    tier3: '三线及以下城市'
  }

  const educationLabels = {
    basic: '公立教育为主',
    premium: '私立/优质教育',
    international: '国际教育'
  }

  const healthcareLabels = {
    basic: '基础医疗保障',
    premium: '高端医疗保险'
  }

  return `
养娃成本计算报告
================

基本信息：
- 家庭月收入：${formatCurrency(formData.monthlyIncome)}
- 孩子年龄：${formData.childAge}岁
- 所在城市：${cityLabels[formData.location]}
- 教育水平：${formData.educationLevel ? educationLabels[formData.educationLevel] : '未选择'}
- 医疗保障：${formData.healthcareLevel ? healthcareLabels[formData.healthcareLevel] : '未选择'}
- 课外活动：${formData.extracurricular ? '包含' : '不包含'}

成本分析：
- 月均总成本：${formatCurrency(data.monthlyCost)}
- 年度总成本：${formatCurrency(data.yearlyTotal)}
- 占家庭收入比例：${((data.monthlyCost / formData.monthlyIncome) * 100).toFixed(1)}%

成本构成：
- 基本需求：${formatCurrency(data.breakdown.basicNeeds)} (${((data.breakdown.basicNeeds / data.monthlyCost) * 100).toFixed(1)}%)
- 教育费用：${formatCurrency(data.breakdown.education)} (${((data.breakdown.education / data.monthlyCost) * 100).toFixed(1)}%)
- 医疗保健：${formatCurrency(data.breakdown.healthcare)} (${((data.breakdown.healthcare / data.monthlyCost) * 100).toFixed(1)}%)
- 服装费用：${formatCurrency(data.breakdown.clothing)} (${((data.breakdown.clothing / data.monthlyCost) * 100).toFixed(1)}%)
- 娱乐活动：${formatCurrency(data.breakdown.entertainment)} (${((data.breakdown.entertainment / data.monthlyCost) * 100).toFixed(1)}%)
- 课外活动：${formatCurrency(data.breakdown.extracurricular)} (${((data.breakdown.extracurricular / data.monthlyCost) * 100).toFixed(1)}%)

生成时间：${new Date().toLocaleString('zh-CN')}
  `.trim()
}

// 下载文件
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

// 导出功能的主要接口
export const exportCalculationResult = {
  toJSON: (data: CalculationResult, formData: CalculatorFormData) => {
    const content = exportToJSON(data, formData)
    downloadFile(content, `养娃成本计算-${new Date().toISOString().split('T')[0]}.json`, 'application/json')
  },
  
  toCSV: (data: CalculationResult) => {
    const content = exportToCSV(data)
    downloadFile(content, `养娃成本计算-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
  },
  
  toReport: (data: CalculationResult, formData: CalculatorFormData) => {
    const content = generateReport(data, formData)
    downloadFile(content, `养娃成本报告-${new Date().toISOString().split('T')[0]}.txt`, 'text/plain')
  }
}
