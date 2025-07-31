import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CalculatorFormData } from '../types'
import { useLocalStorage } from './useLocalStorage'

const FORM_STORAGE_KEY = 'child-calculator-form-data'

export const useFormPersistence = (form: UseFormReturn<CalculatorFormData>) => {
  const [savedData, setSavedData, clearSavedData] = useLocalStorage<Partial<CalculatorFormData>>(
    FORM_STORAGE_KEY,
    {}
  )

  // 加载保存的表单数据
  useEffect(() => {
    if (Object.keys(savedData).length > 0) {
      Object.entries(savedData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof CalculatorFormData, value)
        }
      })
    }
  }, [form, savedData])

  // 监听表单变化并保存
  useEffect(() => {
    const subscription = form.watch((data) => {
      // 过滤掉空值
      const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          acc[key as keyof CalculatorFormData] = value
        }
        return acc
      }, {} as Partial<CalculatorFormData>)

      setSavedData(filteredData)
    })

    return () => subscription.unsubscribe()
  }, [form, setSavedData])

  // 清除保存的数据
  const clearFormData = () => {
    clearSavedData()
    form.reset()
  }

  // 检查是否有保存的数据
  const hasSavedData = Object.keys(savedData).length > 0

  return {
    hasSavedData,
    clearFormData,
    savedData
  }
}
