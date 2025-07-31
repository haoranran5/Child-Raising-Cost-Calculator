/**
 * 基础计算器组件
 * 演示如何使用计算器相关类型
 */

import React, { useReducer, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CalculatorState,
  CalculatorAction,
  CalculatorActionType,
  CalculatorOperation,
  CalculatorButton,
  CalculatorEventHandlers,
  CalculatorConfig,
  BasicCalculatorFormData
} from '../../types'

// 默认计算器配置
const defaultConfig: CalculatorConfig = {
  maxDisplayDigits: 12,
  maxHistoryItems: 10,
  enableHistory: true,
  enableKeyboard: true,
  decimalPlaces: 8,
  enableScientificNotation: false,
}

// 初始状态
const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  hasError: false,
  history: [],
}

// 计算器按钮配置
const calculatorButtons: CalculatorButton[] = [
  // 第一行
  { value: 'clear', label: 'C', type: 'function', operation: 'clear', variant: 'danger' },
  { value: 'clearEntry', label: 'CE', type: 'function', operation: 'clearEntry', variant: 'secondary' },
  { value: 'backspace', label: '⌫', type: 'function', operation: 'backspace', variant: 'secondary' },
  { value: '/', label: '÷', type: 'operation', operation: '/', variant: 'primary' },
  
  // 第二行
  { value: '7', label: '7', type: 'number' },
  { value: '8', label: '8', type: 'number' },
  { value: '9', label: '9', type: 'number' },
  { value: '*', label: '×', type: 'operation', operation: '*', variant: 'primary' },
  
  // 第三行
  { value: '4', label: '4', type: 'number' },
  { value: '5', label: '5', type: 'number' },
  { value: '6', label: '6', type: 'number' },
  { value: '-', label: '−', type: 'operation', operation: '-', variant: 'primary' },
  
  // 第四行
  { value: '1', label: '1', type: 'number' },
  { value: '2', label: '2', type: 'number' },
  { value: '3', label: '3', type: 'number' },
  { value: '+', label: '+', type: 'operation', operation: '+', variant: 'primary' },
  
  // 第五行
  { value: '0', label: '0', type: 'number', size: 'lg' },
  { value: '.', label: '.', type: 'function', operation: 'decimal' },
  { value: '=', label: '=', type: 'equals', operation: '=', variant: 'success' },
]

// 计算器状态管理
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      const number = action.payload
      
      if (state.waitingForOperand) {
        return {
          ...state,
          display: number,
          waitingForOperand: false,
          hasError: false,
        }
      }
      
      return {
        ...state,
        display: state.display === '0' ? number : state.display + number,
        hasError: false,
      }
    }
    
    case 'INPUT_OPERATION': {
      const operation = action.payload as CalculatorOperation
      const inputValue = parseFloat(state.display)
      
      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: inputValue,
          operation,
          waitingForOperand: true,
        }
      }
      
      if (state.operation && state.waitingForOperand) {
        return {
          ...state,
          operation,
        }
      }
      
      const result = calculate(state.previousValue, inputValue, state.operation!)
      
      return {
        ...state,
        display: String(result),
        previousValue: result,
        operation,
        waitingForOperand: true,
      }
    }
    
    case 'CALCULATE': {
      const inputValue = parseFloat(state.display)
      
      if (state.previousValue === null || state.operation === null) {
        return state
      }
      
      const result = calculate(state.previousValue, inputValue, state.operation)
      
      return {
        ...state,
        display: String(result),
        previousValue: null,
        operation: null,
        waitingForOperand: true,
        history: [
          ...state.history.slice(-defaultConfig.maxHistoryItems + 1),
          {
            expression: `${state.previousValue} ${state.operation} ${inputValue}`,
            result,
            timestamp: new Date(),
          }
        ],
      }
    }
    
    case 'CLEAR': {
      return initialState
    }
    
    case 'CLEAR_ENTRY': {
      return {
        ...state,
        display: '0',
      }
    }
    
    case 'BACKSPACE': {
      if (state.display.length > 1) {
        return {
          ...state,
          display: state.display.slice(0, -1),
        }
      }
      return {
        ...state,
        display: '0',
      }
    }
    
    case 'INPUT_DECIMAL': {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0.',
          waitingForOperand: false,
        }
      }
      
      if (state.display.indexOf('.') === -1) {
        return {
          ...state,
          display: state.display + '.',
        }
      }
      
      return state
    }
    
    case 'SET_ERROR': {
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
        display: 'Error',
      }
    }
    
    case 'CLEAR_ERROR': {
      return {
        ...state,
        hasError: false,
        errorMessage: undefined,
      }
    }
    
    default:
      return state
  }
}

// 计算函数
function calculate(firstValue: number, secondValue: number, operation: CalculatorOperation): number {
  switch (operation) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '*':
      return firstValue * secondValue
    case '/':
      if (secondValue === 0) {
        throw new Error('除数不能为零')
      }
      return firstValue / secondValue
    default:
      return secondValue
  }
}

// 组件属性接口
interface BasicCalculatorProps {
  config?: Partial<CalculatorConfig>
  onCalculate?: (result: number) => void
  className?: string
}

// 基础计算器组件
export const BasicCalculator: React.FC<BasicCalculatorProps> = ({
  config = {},
  onCalculate,
  className = '',
}) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  const calculatorConfig = { ...defaultConfig, ...config }

  // 事件处理器
  const eventHandlers: CalculatorEventHandlers = {
    onNumberClick: useCallback((number: string) => {
      dispatch({ type: 'INPUT_NUMBER', payload: number })
    }, []),

    onOperationClick: useCallback((operation: CalculatorOperation) => {
      dispatch({ type: 'INPUT_OPERATION', payload: operation })
    }, []),

    onEqualsClick: useCallback(() => {
      try {
        dispatch({ type: 'CALCULATE' })
        if (onCalculate) {
          const result = parseFloat(state.display)
          onCalculate(result)
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
      }
    }, [state.display, onCalculate]),

    onClearClick: useCallback(() => {
      dispatch({ type: 'CLEAR' })
    }, []),

    onClearEntryClick: useCallback(() => {
      dispatch({ type: 'CLEAR_ENTRY' })
    }, []),

    onBackspaceClick: useCallback(() => {
      dispatch({ type: 'BACKSPACE' })
    }, []),

    onDecimalClick: useCallback(() => {
      dispatch({ type: 'INPUT_DECIMAL' })
    }, []),
  }

  // 按钮点击处理
  const handleButtonClick = (button: CalculatorButton) => {
    switch (button.type) {
      case 'number':
        eventHandlers.onNumberClick(button.value)
        break
      case 'operation':
        if (button.operation) {
          eventHandlers.onOperationClick(button.operation)
        }
        break
      case 'equals':
        eventHandlers.onEqualsClick()
        break
      case 'function':
        switch (button.operation) {
          case 'clear':
            eventHandlers.onClearClick()
            break
          case 'clearEntry':
            eventHandlers.onClearEntryClick()
            break
          case 'backspace':
            eventHandlers.onBackspaceClick()
            break
          case 'decimal':
            eventHandlers.onDecimalClick()
            break
        }
        break
    }
  }

  // 获取按钮样式
  const getButtonClassName = (button: CalculatorButton) => {
    const baseClass = 'h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95'
    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
    }
    
    const variant = button.variant || 'secondary'
    const sizeClass = button.size === 'lg' ? 'col-span-2' : ''
    
    return `${baseClass} ${variantClasses[variant]} ${sizeClass} ${button.className || ''}`
  }

  return (
    <div className={`max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* 显示屏 */}
      <div className="mb-4">
        <div className="bg-gray-900 text-white p-4 rounded-lg text-right">
          <div className="text-2xl font-mono">
            {state.hasError ? (
              <span className="text-red-400">{state.errorMessage}</span>
            ) : (
              state.display
            )}
          </div>
        </div>
      </div>

      {/* 按钮网格 */}
      <div className="grid grid-cols-4 gap-2">
        {calculatorButtons.map((button) => (
          <motion.button
            key={button.value}
            className={getButtonClassName(button)}
            onClick={() => handleButtonClick(button)}
            disabled={button.disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {button.label}
          </motion.button>
        ))}
      </div>

      {/* 历史记录 */}
      {calculatorConfig.enableHistory && state.history.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">历史记录</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {state.history.slice(-5).map((item, index) => (
              <div key={index} className="text-xs text-gray-600 font-mono">
                {item.expression} = {item.result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BasicCalculator
