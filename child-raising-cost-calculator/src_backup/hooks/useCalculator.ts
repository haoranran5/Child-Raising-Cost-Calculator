import { useState, useCallback } from 'react'
import { CalculatorFormData, CalculationResult } from '../types'
import { calculateChildRaisingCost } from '../utils/calculator'

interface UseCalculatorReturn {
  result: CalculationResult | null
  loading: boolean
  error: string | null
  calculate: (data: CalculatorFormData) => Promise<void>
  reset: () => void
}

export const useCalculator = (): UseCalculatorReturn => {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(async (data: CalculatorFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      // 模拟异步计算（可以替换为API调用）
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const calculationResult = calculateChildRaisingCost(data)
      setResult(calculationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算过程中发生错误')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    result,
    loading,
    error,
    calculate,
    reset
  }
}
