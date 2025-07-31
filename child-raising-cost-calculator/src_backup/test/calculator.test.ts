/**
 * 计算器逻辑测试
 */

import { describe, it, expect } from 'vitest'
import { calculateCompleteChildCost } from '../utils/calculator'
import { createMockUserInput } from './utils'

describe('Calculator Logic', () => {
  describe('calculateCompleteChildCost', () => {
    it('should calculate basic cost correctly', () => {
      const input = createMockUserInput({
        city: '北京',
        monthlyIncome: 20000,
        familySize: 3,
      })
      
      const result = calculateCompleteChildCost(input)
      
      expect(result).toBeDefined()
      expect(result.totalCost).toBeGreaterThan(0)
      expect(result.breakdown).toBeDefined()
      expect(result.breakdown.basic).toBeGreaterThan(0)
    })
    
    it('should calculate higher costs for tier 1 cities', () => {
      const beijingInput = createMockUserInput({ city: '北京' })
      const smallCityInput = createMockUserInput({ city: '其他城市' })
      
      const beijingResult = calculateCompleteChildCost(beijingInput)
      const smallCityResult = calculateCompleteChildCost(smallCityInput)
      
      expect(beijingResult.totalCost).toBeGreaterThan(smallCityResult.totalCost)
    })
    
    it('should calculate higher costs for private education', () => {
      const publicInput = createMockUserInput({ educationLevel: 'public' })
      const privateInput = createMockUserInput({ educationLevel: 'private' })
      
      const publicResult = calculateCompleteChildCost(publicInput)
      const privateResult = calculateCompleteChildCost(privateInput)
      
      expect(privateResult.breakdown.education).toBeGreaterThan(publicResult.breakdown.education)
    })
    
    it('should include insurance savings when applicable', () => {
      const withInsurance = createMockUserInput({ hasInsurance: true })
      const withoutInsurance = createMockUserInput({ hasInsurance: false })
      
      const withInsuranceResult = calculateCompleteChildCost(withInsurance)
      const withoutInsuranceResult = calculateCompleteChildCost(withoutInsurance)
      
      expect(withInsuranceResult.breakdown.healthcare).toBeLessThan(
        withoutInsuranceResult.breakdown.healthcare
      )
    })
    
    it('should return age group breakdown', () => {
      const input = createMockUserInput()
      const result = calculateCompleteChildCost(input)
      
      expect(result.ageGroups).toBeDefined()
      expect(result.ageGroups).toHaveLength(4)
      
      const totalFromAgeGroups = result.ageGroups.reduce(
        (sum, group) => sum + group.cost, 0
      )
      
      expect(totalFromAgeGroups).toBeCloseTo(result.totalCost, -3) // 允许小误差
    })
    
    it('should handle edge cases', () => {
      const edgeInput = createMockUserInput({
        monthlyIncome: 0,
        familySize: 1,
      })
      
      const result = calculateCompleteChildCost(edgeInput)
      
      expect(result.totalCost).toBeGreaterThan(0)
      expect(result.breakdown.basic).toBeGreaterThan(0)
    })
    
    it('should be consistent with same inputs', () => {
      const input = createMockUserInput()
      
      const result1 = calculateCompleteChildCost(input)
      const result2 = calculateCompleteChildCost(input)
      
      expect(result1.totalCost).toBe(result2.totalCost)
      expect(result1.breakdown).toEqual(result2.breakdown)
    })
  })
  
  describe('Cost Breakdown Validation', () => {
    it('should have all required breakdown categories', () => {
      const input = createMockUserInput()
      const result = calculateCompleteChildCost(input)
      
      expect(result.breakdown).toHaveProperty('basic')
      expect(result.breakdown).toHaveProperty('education')
      expect(result.breakdown).toHaveProperty('healthcare')
      expect(result.breakdown).toHaveProperty('entertainment')
    })
    
    it('should have breakdown sum equal to total cost', () => {
      const input = createMockUserInput()
      const result = calculateCompleteChildCost(input)
      
      const breakdownSum = Object.values(result.breakdown).reduce(
        (sum, cost) => sum + cost, 0
      )
      
      expect(breakdownSum).toBeCloseTo(result.totalCost, -2)
    })
    
    it('should have reasonable cost proportions', () => {
      const input = createMockUserInput()
      const result = calculateCompleteChildCost(input)
      
      // 基础生活费用应该是最大的部分
      expect(result.breakdown.basic).toBeGreaterThan(result.breakdown.entertainment)
      
      // 教育费用应该是重要部分
      expect(result.breakdown.education).toBeGreaterThan(0)
      
      // 医疗费用应该合理
      expect(result.breakdown.healthcare).toBeGreaterThan(0)
      expect(result.breakdown.healthcare).toBeLessThan(result.breakdown.basic)
    })
  })
  
  describe('Performance Tests', () => {
    it('should calculate results quickly', () => {
      const input = createMockUserInput()
      
      const start = performance.now()
      calculateCompleteChildCost(input)
      const end = performance.now()
      
      const duration = end - start
      expect(duration).toBeLessThan(100) // 应该在100ms内完成
    })
    
    it('should handle multiple calculations efficiently', () => {
      const inputs = Array.from({ length: 100 }, () => createMockUserInput({
        monthlyIncome: Math.random() * 50000 + 5000,
        city: ['北京', '上海', '广州', '深圳'][Math.floor(Math.random() * 4)],
      }))
      
      const start = performance.now()
      inputs.forEach(input => calculateCompleteChildCost(input))
      const end = performance.now()
      
      const duration = end - start
      expect(duration).toBeLessThan(1000) // 100次计算应该在1秒内完成
    })
  })
})
