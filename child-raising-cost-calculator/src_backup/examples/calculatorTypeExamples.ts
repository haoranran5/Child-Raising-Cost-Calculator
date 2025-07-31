/**
 * 计算器类型使用示例和最佳实践
 * 展示如何正确使用计算器相关的类型定义
 */

import {
  CalculatorState,
  CalculatorAction,
  CalculatorOperation,
  CalculatorButton,
  CalculatorEventHandlers,
  CalculatorConfig,
  CalculatorFormData,
  BasicCalculatorFormData,
  CalculatorHistoryItem,
  CalculatorTheme,
  CalculatorFormState,
} from '../types'

// ==================== 基础类型使用示例 ====================

/**
 * 示例1：创建基础计算器状态
 */
export const createBasicCalculatorState = (): CalculatorState => {
  return {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    hasError: false,
    history: [],
  }
}

/**
 * 示例2：创建计算器动作
 */
export const createCalculatorActions = () => {
  // 数字输入动作
  const numberAction: CalculatorAction = {
    type: 'INPUT_NUMBER',
    payload: '5'
  }

  // 操作输入动作
  const operationAction: CalculatorAction = {
    type: 'INPUT_OPERATION',
    payload: '+' as CalculatorOperation
  }

  // 计算动作
  const calculateAction: CalculatorAction = {
    type: 'CALCULATE'
  }

  // 清除动作
  const clearAction: CalculatorAction = {
    type: 'CLEAR'
  }

  return {
    numberAction,
    operationAction,
    calculateAction,
    clearAction,
  }
}

/**
 * 示例3：创建计算器按钮配置
 */
export const createCalculatorButtons = (): CalculatorButton[] => {
  return [
    // 数字按钮
    {
      value: '1',
      label: '1',
      type: 'number',
      className: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      value: '2',
      label: '2',
      type: 'number',
      className: 'bg-gray-100 hover:bg-gray-200',
    },
    
    // 操作按钮
    {
      value: '+',
      label: '+',
      type: 'operation',
      operation: '+',
      variant: 'primary',
      className: 'bg-blue-500 text-white hover:bg-blue-600',
    },
    {
      value: '-',
      label: '−',
      type: 'operation',
      operation: '-',
      variant: 'primary',
    },
    
    // 功能按钮
    {
      value: 'clear',
      label: 'C',
      type: 'function',
      operation: 'clear',
      variant: 'danger',
      size: 'lg',
    },
    
    // 等号按钮
    {
      value: '=',
      label: '=',
      type: 'equals',
      operation: '=',
      variant: 'success',
    },
  ]
}

/**
 * 示例4：创建事件处理器
 */
export const createEventHandlers = (
  dispatch: (action: CalculatorAction) => void
): CalculatorEventHandlers => {
  return {
    onNumberClick: (number: string) => {
      dispatch({ type: 'INPUT_NUMBER', payload: number })
    },
    
    onOperationClick: (operation: CalculatorOperation) => {
      dispatch({ type: 'INPUT_OPERATION', payload: operation })
    },
    
    onEqualsClick: () => {
      dispatch({ type: 'CALCULATE' })
    },
    
    onClearClick: () => {
      dispatch({ type: 'CLEAR' })
    },
    
    onClearEntryClick: () => {
      dispatch({ type: 'CLEAR_ENTRY' })
    },
    
    onBackspaceClick: () => {
      dispatch({ type: 'BACKSPACE' })
    },
    
    onDecimalClick: () => {
      dispatch({ type: 'INPUT_DECIMAL' })
    },
  }
}

// ==================== 高级类型使用示例 ====================

/**
 * 示例5：创建计算器配置
 */
export const createCalculatorConfig = (): CalculatorConfig => {
  return {
    maxDisplayDigits: 12,
    maxHistoryItems: 20,
    enableHistory: true,
    enableKeyboard: true,
    decimalPlaces: 6,
    enableScientificNotation: true,
  }
}

/**
 * 示例6：创建计算器主题
 */
export const createCalculatorTheme = (): CalculatorTheme => {
  return {
    primaryColor: '#3b82f6',
    secondaryColor: '#6b7280',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    buttonStyles: {
      number: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      operation: 'bg-blue-500 text-white hover:bg-blue-600',
      function: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
      equals: 'bg-green-500 text-white hover:bg-green-600',
    },
  }
}

/**
 * 示例7：创建历史记录项
 */
export const createHistoryItem = (
  expression: string,
  result: number
): CalculatorHistoryItem => {
  return {
    expression,
    result,
    timestamp: new Date(),
  }
}

// ==================== 表单类型使用示例 ====================

/**
 * 示例8：创建养娃成本计算器表单数据
 */
export const createCalculatorFormData = (): CalculatorFormData => {
  return {
    // UserInput 继承的字段
    cityTier: 'tier1',
    incomeLevel: 'middle',
    housingType: 'owned',
    familySupport: 'moderate',
    educationType: 'public',
    trainingAttitude: 'normal',
    childAge: 5,
    
    // CalculatorFormData 特有字段
    monthlyIncome: 20000,
    location: 'tier1',
    educationLevel: 'public',
    healthcareLevel: 'basic',
    extracurricular: true,
  }
}

/**
 * 示例9：创建基础计算器表单数据
 */
export const createBasicCalculatorFormData = (): BasicCalculatorFormData => {
  return {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
  }
}

/**
 * 示例10：创建计算器表单状态
 */
export const createCalculatorFormState = (): CalculatorFormState => {
  return {
    isValid: true,
    isSubmitting: false,
    errors: [],
    touched: {},
    calculatorState: createBasicCalculatorState(),
    isCalculating: false,
    result: undefined,
  }
}

// ==================== 类型守卫和验证函数 ====================

/**
 * 类型守卫：检查是否为有效的计算器操作
 */
export const isValidCalculatorOperation = (value: string): value is CalculatorOperation => {
  const validOperations: CalculatorOperation[] = ['+', '-', '*', '/', '=', 'clear', 'clearEntry', 'backspace', 'decimal']
  return validOperations.includes(value as CalculatorOperation)
}

/**
 * 类型守卫：检查是否为数字字符串
 */
export const isNumberString = (value: string): boolean => {
  return /^\d+$/.test(value)
}

/**
 * 验证计算器状态
 */
export const validateCalculatorState = (state: CalculatorState): boolean => {
  // 检查显示值是否有效
  if (!state.display || state.display.length === 0) {
    return false
  }
  
  // 检查操作是否有效（如果存在）
  if (state.operation && !isValidCalculatorOperation(state.operation)) {
    return false
  }
  
  // 检查历史记录
  if (!Array.isArray(state.history)) {
    return false
  }
  
  return true
}

// ==================== 工具函数 ====================

/**
 * 格式化显示值
 */
export const formatDisplayValue = (value: number, config: CalculatorConfig): string => {
  if (config.enableScientificNotation && Math.abs(value) >= Math.pow(10, config.maxDisplayDigits)) {
    return value.toExponential(config.decimalPlaces)
  }
  
  const formatted = value.toFixed(config.decimalPlaces)
  const trimmed = formatted.replace(/\.?0+$/, '')
  
  if (trimmed.length > config.maxDisplayDigits) {
    return value.toExponential(config.decimalPlaces - 2)
  }
  
  return trimmed
}

/**
 * 创建默认按钮样式
 */
export const createButtonStyle = (button: CalculatorButton, theme: CalculatorTheme): string => {
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200'
  const typeStyle = theme.buttonStyles[button.type === 'equals' ? 'equals' : button.type]
  const sizeStyle = button.size === 'lg' ? 'px-6 py-3 text-lg' : button.size === 'sm' ? 'px-2 py-1 text-sm' : ''
  
  return `${baseStyle} ${typeStyle} ${sizeStyle} ${button.className || ''}`
}

/**
 * 计算器状态序列化
 */
export const serializeCalculatorState = (state: CalculatorState): string => {
  return JSON.stringify({
    ...state,
    history: state.history.map(item => ({
      ...item,
      timestamp: item.timestamp.toISOString(),
    })),
  })
}

/**
 * 计算器状态反序列化
 */
export const deserializeCalculatorState = (serialized: string): CalculatorState => {
  const parsed = JSON.parse(serialized)
  return {
    ...parsed,
    history: parsed.history.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    })),
  }
}

// ==================== 最佳实践示例 ====================

/**
 * 最佳实践1：使用类型安全的状态更新
 */
export const safeStateUpdate = (
  currentState: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  // 总是返回新的状态对象，不要修改原状态
  switch (action.type) {
    case 'INPUT_NUMBER':
      return {
        ...currentState,
        display: action.payload,
        hasError: false, // 清除错误状态
      }
    
    default:
      return currentState
  }
}

/**
 * 最佳实践2：使用类型安全的事件处理
 */
export const createTypeSafeEventHandler = (
  dispatch: (action: CalculatorAction) => void
) => {
  return (buttonValue: string) => {
    if (isNumberString(buttonValue)) {
      dispatch({ type: 'INPUT_NUMBER', payload: buttonValue })
    } else if (isValidCalculatorOperation(buttonValue)) {
      dispatch({ type: 'INPUT_OPERATION', payload: buttonValue })
    } else {
      console.warn(`Invalid button value: ${buttonValue}`)
    }
  }
}

/**
 * 最佳实践3：错误处理
 */
export const handleCalculatorError = (
  error: Error,
  dispatch: (action: CalculatorAction) => void
) => {
  console.error('Calculator error:', error)
  dispatch({
    type: 'SET_ERROR',
    payload: error.message || '计算错误',
  })
}

// 导出所有示例
export default {
  createBasicCalculatorState,
  createCalculatorActions,
  createCalculatorButtons,
  createEventHandlers,
  createCalculatorConfig,
  createCalculatorTheme,
  createHistoryItem,
  createCalculatorFormData,
  createBasicCalculatorFormData,
  createCalculatorFormState,
  isValidCalculatorOperation,
  isNumberString,
  validateCalculatorState,
  formatDisplayValue,
  createButtonStyle,
  serializeCalculatorState,
  deserializeCalculatorState,
  safeStateUpdate,
  createTypeSafeEventHandler,
  handleCalculatorError,
}
