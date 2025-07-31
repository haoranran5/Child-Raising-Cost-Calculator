/**
 * 测试工具函数
 */

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// 自定义渲染函数，包含必要的Provider
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// 重新导出所有testing-library工具
export * from '@testing-library/react'
export { customRender as render }

// 测试数据工厂
export const createMockUserInput = (overrides = {}) => ({
  city: '北京',
  monthlyIncome: 20000,
  familySize: 3,
  educationLevel: 'public',
  hasInsurance: true,
  ...overrides,
})

export const createMockCalculationResult = (overrides = {}) => ({
  totalCost: 500000,
  breakdown: {
    basic: 200000,
    education: 150000,
    healthcare: 100000,
    entertainment: 50000,
  },
  ageGroups: [
    { age: '0-3', cost: 100000 },
    { age: '4-6', cost: 120000 },
    { age: '7-12', cost: 150000 },
    { age: '13-18', cost: 130000 },
  ],
  ...overrides,
})

// Mock函数工厂
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  return vi.fn(implementation)
}

// 异步测试工具
export const waitForAsync = (ms: number = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 模拟用户交互
export const mockUserInteraction = {
  click: (element: HTMLElement) => {
    element.click()
  },
  
  type: (element: HTMLInputElement, value: string) => {
    element.value = value
    element.dispatchEvent(new Event('input', { bubbles: true }))
  },
  
  select: (element: HTMLSelectElement, value: string) => {
    element.value = value
    element.dispatchEvent(new Event('change', { bubbles: true }))
  },
  
  submit: (form: HTMLFormElement) => {
    form.dispatchEvent(new Event('submit', { bubbles: true }))
  },
}

// 测试断言工具
export const expectElement = {
  toBeVisible: (element: HTMLElement) => {
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  },
  
  toHaveText: (element: HTMLElement, text: string) => {
    expect(element).toHaveTextContent(text)
  },
  
  toHaveValue: (element: HTMLInputElement, value: string) => {
    expect(element).toHaveValue(value)
  },
  
  toBeDisabled: (element: HTMLElement) => {
    expect(element).toBeDisabled()
  },
  
  toBeEnabled: (element: HTMLElement) => {
    expect(element).toBeEnabled()
  },
}

// 性能测试工具
export const measurePerformance = async (fn: () => Promise<void> | void) => {
  const start = performance.now()
  await fn()
  const end = performance.now()
  return end - start
}

// 内存泄漏检测
export const detectMemoryLeaks = () => {
  const initialMemory = (performance as any).memory?.usedJSHeapSize || 0
  
  return {
    check: () => {
      const currentMemory = (performance as any).memory?.usedJSHeapSize || 0
      const increase = currentMemory - initialMemory
      
      if (increase > 1024 * 1024) { // 1MB
        console.warn(`Potential memory leak detected: ${increase} bytes increase`)
      }
      
      return increase
    }
  }
}

// 可访问性测试工具
export const checkAccessibility = (element: HTMLElement) => {
  const checks = {
    hasAriaLabel: () => element.hasAttribute('aria-label'),
    hasRole: () => element.hasAttribute('role'),
    hasTabIndex: () => element.hasAttribute('tabindex'),
    isFocusable: () => {
      const focusableElements = [
        'button',
        'input',
        'select',
        'textarea',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ]
      
      return focusableElements.some(selector => 
        element.matches(selector) || element.querySelector(selector)
      )
    },
  }
  
  return checks
}

// 响应式测试工具
export const testResponsive = {
  mobile: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    window.dispatchEvent(new Event('resize'))
  },
  
  tablet: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    window.dispatchEvent(new Event('resize'))
  },
  
  desktop: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    window.dispatchEvent(new Event('resize'))
  },
}

// 错误边界测试工具
export const TestErrorBoundary = ({ children, onError }: {
  children: React.ReactNode
  onError?: (error: Error, errorInfo: any) => void
}) => {
  const [hasError, setHasError] = React.useState(false)
  
  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true)
      if (onError) {
        onError(error.error, { componentStack: error.filename })
      }
    }
    
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [onError])
  
  if (hasError) {
    return <div data-testid="error-boundary">Something went wrong</div>
  }
  
  return <>{children}</>
}

// 表单测试工具
export const formTestUtils = {
  fillForm: (form: HTMLFormElement, data: Record<string, string>) => {
    Object.entries(data).forEach(([name, value]) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      if (input) {
        mockUserInteraction.type(input, value)
      }
    })
  },
  
  validateForm: (form: HTMLFormElement) => {
    const inputs = form.querySelectorAll('input, select, textarea')
    const errors: string[] = []
    
    inputs.forEach((input: any) => {
      if (input.required && !input.value) {
        errors.push(`${input.name} is required`)
      }
    })
    
    return errors
  },
}

// 动画测试工具
export const animationTestUtils = {
  skipAnimations: () => {
    const style = document.createElement('style')
    style.innerHTML = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-delay: 0.01ms !important;
        transition-duration: 0.01ms !important;
        transition-delay: 0.01ms !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  },
  
  waitForAnimation: async (element: HTMLElement, timeout = 1000) => {
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Animation timeout'))
      }, timeout)
      
      const handleAnimationEnd = () => {
        clearTimeout(timer)
        element.removeEventListener('animationend', handleAnimationEnd)
        element.removeEventListener('transitionend', handleAnimationEnd)
        resolve()
      }
      
      element.addEventListener('animationend', handleAnimationEnd)
      element.addEventListener('transitionend', handleAnimationEnd)
    })
  },
}
