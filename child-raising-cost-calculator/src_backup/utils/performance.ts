/**
 * 性能优化工具和配置
 * 包含代码分割、缓存策略、性能监控等
 */

import React, { lazy, ComponentType, ReactNode, useState, useEffect, useRef } from 'react'

// 懒加载组件工厂
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) => {
  const LazyComponent = lazy(importFunc)
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}

// 图片懒加载Hook
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }
    
    img.onerror = () => {
      setIsError(true)
    }
    
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])
  
  return { imageSrc, isLoaded, isError }
}

// 缓存管理器
class CacheManager {
  private cache = new Map<string, any>()
  private timestamps = new Map<string, number>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5分钟
  
  set(key: string, value: any, ttl: number = this.defaultTTL) {
    this.cache.set(key, value)
    this.timestamps.set(key, Date.now() + ttl)
  }
  
  get(key: string) {
    const timestamp = this.timestamps.get(key)
    
    if (!timestamp || Date.now() > timestamp) {
      this.delete(key)
      return null
    }
    
    return this.cache.get(key)
  }
  
  delete(key: string) {
    this.cache.delete(key)
    this.timestamps.delete(key)
  }
  
  clear() {
    this.cache.clear()
    this.timestamps.clear()
  }
  
  size() {
    return this.cache.size
  }
}

export const cacheManager = new CacheManager()

// 计算结果缓存
export const cacheCalculationResult = (input: any, result: any) => {
  const key = `calculation_${JSON.stringify(input)}`
  cacheManager.set(key, result, 30 * 60 * 1000) // 30分钟
}

export const getCachedCalculationResult = (input: any) => {
  const key = `calculation_${JSON.stringify(input)}`
  return cacheManager.get(key)
}

// API响应缓存
export const cacheApiResponse = (url: string, response: any, ttl?: number) => {
  cacheManager.set(`api_${url}`, response, ttl)
}

export const getCachedApiResponse = (url: string) => {
  return cacheManager.get(`api_${url}`)
}

// 防抖Hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// 节流Hook
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])
  
  return throttledValue
}

// 内存泄漏防护Hook
export const useCleanup = (cleanup: () => void) => {
  useEffect(() => {
    return cleanup
  }, [cleanup])
}

// 组件渲染优化Hook
export const useRenderOptimization = () => {
  const renderCount = useRef(0)
  const startTime = useRef(Date.now())
  
  useEffect(() => {
    renderCount.current += 1
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Component rendered ${renderCount.current} times`)
      console.log(`Time since mount: ${Date.now() - startTime.current}ms`)
    }
  })
  
  return {
    renderCount: renderCount.current,
    timeSinceMount: Date.now() - startTime.current,
  }
}

// 性能监控
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  
  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  // 记录性能指标
  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    
    const values = this.metrics.get(name)!
    values.push(value)
    
    // 只保留最近100个值
    if (values.length > 100) {
      values.shift()
    }
  }
  
  // 获取平均值
  getAverage(name: string): number {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return 0
    
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }
  
  // 获取最大值
  getMax(name: string): number {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return 0
    
    return Math.max(...values)
  }
  
  // 获取最小值
  getMin(name: string): number {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return 0
    
    return Math.min(...values)
  }
  
  // 获取所有指标
  getAllMetrics() {
    const result: Record<string, any> = {}
    
    for (const [name, values] of this.metrics) {
      result[name] = {
        average: this.getAverage(name),
        max: this.getMax(name),
        min: this.getMin(name),
        count: values.length,
        latest: values[values.length - 1],
      }
    }
    
    return result
  }
  
  // 清除指标
  clearMetrics() {
    this.metrics.clear()
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()

// 性能测量装饰器
export const measurePerformance = (name: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    
    descriptor.value = function (...args: any[]) {
      const startTime = performance.now()
      const result = originalMethod.apply(this, args)
      const endTime = performance.now()
      
      performanceMonitor.recordMetric(name, endTime - startTime)
      
      return result
    }
    
    return descriptor
  }
}

// 页面加载性能监控
export const monitorPageLoad = () => {
  if (typeof window === 'undefined') return
  
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      performanceMonitor.recordMetric('page_load_time', navigation.loadEventEnd - navigation.fetchStart)
      performanceMonitor.recordMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart)
      performanceMonitor.recordMetric('first_paint', navigation.responseEnd - navigation.fetchStart)
    }
  })
}

// 组件加载时间监控Hook
export const useComponentLoadTime = (componentName: string) => {
  const startTime = useRef(Date.now())
  
  useEffect(() => {
    const loadTime = Date.now() - startTime.current
    performanceMonitor.recordMetric(`component_load_${componentName}`, loadTime)
  }, [componentName])
}

// 内存使用监控
export const monitorMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) return
  
  const memory = (performance as any).memory
  
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  }
}

// 网络状态监控
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionType, setConnectionType] = useState<string>('unknown')
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // 检测连接类型
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      setConnectionType(connection.effectiveType || 'unknown')
      
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown')
      }
      
      connection.addEventListener('change', handleConnectionChange)
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange)
      }
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  return { isOnline, connectionType }
}

// 错误边界性能监控
export const reportError = (error: Error, errorInfo?: any) => {
  performanceMonitor.recordMetric('error_count', 1)
  
  // 在生产环境中，这里可以发送错误报告到监控服务
  if (process.env.NODE_ENV === 'production') {
    console.error('Error reported:', error, errorInfo)
    // 发送到错误监控服务
    // sendErrorToService(error, errorInfo)
  }
}

// 导出所有工具
export {
  createLazyComponent,
  useLazyImage,
  cacheManager,
  useDebounce,
  useThrottle,
  useCleanup,
  useRenderOptimization,
  performanceMonitor,
  measurePerformance,
  monitorPageLoad,
  useComponentLoadTime,
  monitorMemoryUsage,
  useNetworkStatus,
  reportError,
}
