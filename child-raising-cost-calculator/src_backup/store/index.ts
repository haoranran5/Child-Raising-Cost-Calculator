import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserInput, CalculationResult } from '../types'

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 应用状态接口
interface AppState {
  // 主题相关
  theme: Theme
  isDarkMode: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void

  // 计算相关
  userInput: UserInput | null
  calculationResult: CalculationResult | null
  isCalculating: boolean
  calculationError: string | null
  
  // 计算操作
  setUserInput: (input: UserInput) => void
  setCalculationResult: (result: CalculationResult) => void
  setCalculating: (loading: boolean) => void
  setCalculationError: (error: string | null) => void
  clearCalculation: () => void

  // 导航相关
  currentStep: number
  setCurrentStep: (step: number) => void
  
  // 应用状态
  isLoading: boolean
  setLoading: (loading: boolean) => void
  
  // 错误处理
  globalError: string | null
  setGlobalError: (error: string | null) => void
  
  // 数据持久化
  lastCalculationTime: string | null
  setLastCalculationTime: (time: string) => void
}

// 检测系统主题
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// 应用主题到DOM
const applyTheme = (isDark: boolean) => {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }
}

// 创建store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 主题初始状态
      theme: 'system',
      isDarkMode: getSystemTheme() === 'dark',

      // 主题操作
      setTheme: (theme: Theme) => {
        const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')
        applyTheme(isDark)
        set({ theme, isDarkMode: isDark })
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },

      // 计算相关初始状态
      userInput: null,
      calculationResult: null,
      isCalculating: false,
      calculationError: null,

      // 计算操作
      setUserInput: (input: UserInput) => set({ userInput: input }),
      
      setCalculationResult: (result: CalculationResult) => 
        set({ 
          calculationResult: result, 
          isCalculating: false, 
          calculationError: null,
          lastCalculationTime: new Date().toISOString()
        }),
      
      setCalculating: (loading: boolean) => 
        set({ 
          isCalculating: loading, 
          calculationError: loading ? null : get().calculationError 
        }),
      
      setCalculationError: (error: string | null) => 
        set({ 
          calculationError: error, 
          isCalculating: false 
        }),
      
      clearCalculation: () => 
        set({ 
          userInput: null, 
          calculationResult: null, 
          isCalculating: false, 
          calculationError: null,
          currentStep: 0
        }),

      // 导航相关
      currentStep: 0,
      setCurrentStep: (step: number) => set({ currentStep: step }),

      // 应用状态
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // 错误处理
      globalError: null,
      setGlobalError: (error: string | null) => set({ globalError: error }),

      // 数据持久化
      lastCalculationTime: null,
      setLastCalculationTime: (time: string) => set({ lastCalculationTime: time })
    }),
    {
      name: 'child-cost-calculator-store',
      storage: createJSONStorage(() => localStorage),
      // 只持久化部分状态
      partialize: (state) => ({
        theme: state.theme,
        userInput: state.userInput,
        calculationResult: state.calculationResult,
        lastCalculationTime: state.lastCalculationTime,
        currentStep: state.currentStep
      })
    }
  )
)

// 系统主题变化监听
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    const store = useAppStore.getState()
    if (store.theme === 'system') {
      const isDark = e.matches
      applyTheme(isDark)
      useAppStore.setState({ isDarkMode: isDark })
    }
  })
}

// 选择器hooks（性能优化）
export const useTheme = () => useAppStore((state) => ({
  theme: state.theme,
  isDarkMode: state.isDarkMode,
  setTheme: state.setTheme,
  toggleTheme: state.toggleTheme
}))

export const useCalculation = () => useAppStore((state) => ({
  userInput: state.userInput,
  calculationResult: state.calculationResult,
  isCalculating: state.isCalculating,
  calculationError: state.calculationError,
  setUserInput: state.setUserInput,
  setCalculationResult: state.setCalculationResult,
  setCalculating: state.setCalculating,
  setCalculationError: state.setCalculationError,
  clearCalculation: state.clearCalculation
}))

export const useNavigation = () => useAppStore((state) => ({
  currentStep: state.currentStep,
  setCurrentStep: state.setCurrentStep
}))

export const useAppStatus = () => useAppStore((state) => ({
  isLoading: state.isLoading,
  globalError: state.globalError,
  setLoading: state.setLoading,
  setGlobalError: state.setGlobalError
}))

// 初始化主题
export const initializeTheme = () => {
  const store = useAppStore.getState()
  const isDark = store.theme === 'dark' || (store.theme === 'system' && getSystemTheme() === 'dark')
  applyTheme(isDark)
  useAppStore.setState({ isDarkMode: isDark })
}
