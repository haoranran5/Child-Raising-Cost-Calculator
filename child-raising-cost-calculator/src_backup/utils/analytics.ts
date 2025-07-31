/**
 * 用户行为分析工具
 * 包含Google Analytics 4集成、事件跟踪、性能监控等
 */

import { useState, useEffect } from 'react'

// 扩展Window接口以支持gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// 分析事件类型
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// 用户属性接口
export interface UserProperties {
  user_id?: string
  device_type?: 'mobile' | 'tablet' | 'desktop'
  user_agent?: string
  language?: string
  timezone?: string
  screen_resolution?: string
  [key: string]: any
}

// Google Analytics 4 配置
export const GA4_CONFIG = {
  measurement_id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  config: {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  },
}

// 初始化Google Analytics 4
export const initializeGA4 = () => {
  if (typeof window === 'undefined' || !GA4_CONFIG.measurement_id) return
  
  // 加载gtag脚本
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurement_id}`
  document.head.appendChild(script)
  
  // 初始化gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  
  window.gtag('js', new Date())
  window.gtag('config', GA4_CONFIG.measurement_id, GA4_CONFIG.config)
}

// 发送页面浏览事件
export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('config', GA4_CONFIG.measurement_id, {
    page_title,
    page_location,
  })
}

// 发送自定义事件
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters,
  })
}

// 设置用户属性
export const setUserProperties = (properties: UserProperties) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('config', GA4_CONFIG.measurement_id, {
    user_properties: properties,
  })
}

// 预定义的事件跟踪函数
export const analytics = {
  // 页面相关事件
  page: {
    view: (page_name: string) => {
      trackEvent({
        action: 'page_view',
        category: 'engagement',
        label: page_name,
      })
    },
    
    leave: (page_name: string, time_on_page: number) => {
      trackEvent({
        action: 'page_leave',
        category: 'engagement',
        label: page_name,
        value: time_on_page,
      })
    },
  },
  
  // 表单相关事件
  form: {
    start: (form_name: string) => {
      trackEvent({
        action: 'form_start',
        category: 'form_interaction',
        label: form_name,
      })
    },
    
    step_complete: (form_name: string, step_number: number) => {
      trackEvent({
        action: 'form_step_complete',
        category: 'form_interaction',
        label: form_name,
        value: step_number,
      })
    },
    
    abandon: (form_name: string, step_number: number) => {
      trackEvent({
        action: 'form_abandon',
        category: 'form_interaction',
        label: form_name,
        value: step_number,
      })
    },
    
    submit: (form_name: string, total_steps: number) => {
      trackEvent({
        action: 'form_submit',
        category: 'conversion',
        label: form_name,
        value: total_steps,
      })
    },
    
    error: (form_name: string, error_message: string) => {
      trackEvent({
        action: 'form_error',
        category: 'form_interaction',
        label: form_name,
        custom_parameters: {
          error_message,
        },
      })
    },
  },
  
  // 计算相关事件
  calculation: {
    start: () => {
      trackEvent({
        action: 'calculation_start',
        category: 'engagement',
        label: 'cost_calculator',
      })
    },
    
    complete: (total_cost: number, calculation_time: number) => {
      trackEvent({
        action: 'calculation_complete',
        category: 'conversion',
        label: 'cost_calculator',
        value: total_cost,
        custom_parameters: {
          calculation_time,
        },
      })
    },
    
    share: (share_method: string) => {
      trackEvent({
        action: 'calculation_share',
        category: 'engagement',
        label: share_method,
      })
    },
    
    download: (format: string) => {
      trackEvent({
        action: 'calculation_download',
        category: 'engagement',
        label: format,
      })
    },
  },
  
  // 用户交互事件
  interaction: {
    click: (element_name: string, element_type: string) => {
      trackEvent({
        action: 'click',
        category: 'user_interaction',
        label: element_name,
        custom_parameters: {
          element_type,
        },
      })
    },
    
    scroll: (scroll_depth: number) => {
      trackEvent({
        action: 'scroll',
        category: 'user_interaction',
        value: scroll_depth,
      })
    },
    
    search: (search_term: string, results_count: number) => {
      trackEvent({
        action: 'search',
        category: 'user_interaction',
        label: search_term,
        value: results_count,
      })
    },
  },
  
  // 性能相关事件
  performance: {
    page_load: (load_time: number) => {
      trackEvent({
        action: 'page_load_time',
        category: 'performance',
        value: load_time,
      })
    },
    
    error: (error_message: string, error_stack?: string) => {
      trackEvent({
        action: 'javascript_error',
        category: 'error',
        label: error_message,
        custom_parameters: {
          error_stack,
        },
      })
    },
    
    api_call: (endpoint: string, response_time: number, status_code: number) => {
      trackEvent({
        action: 'api_call',
        category: 'performance',
        label: endpoint,
        value: response_time,
        custom_parameters: {
          status_code,
        },
      })
    },
  },
}

// 用户行为跟踪Hook
export const useAnalytics = () => {
  const [sessionStartTime] = useState(Date.now())
  
  // 页面停留时间跟踪
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - sessionStartTime
      analytics.page.leave(window.location.pathname, timeOnPage)
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [sessionStartTime])
  
  // 滚动深度跟踪
  useEffect(() => {
    let maxScrollDepth = 0
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100)
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        
        // 每25%发送一次事件
        if (scrollDepth % 25 === 0 && scrollDepth > 0) {
          analytics.interaction.scroll(scrollDepth)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return analytics
}

// 表单完成率分析
export class FormAnalytics {
  private formName: string
  private totalSteps: number
  private currentStep: number = 0
  private startTime: number = Date.now()
  private stepTimes: number[] = []
  
  constructor(formName: string, totalSteps: number) {
    this.formName = formName
    this.totalSteps = totalSteps
    analytics.form.start(formName)
  }
  
  nextStep() {
    this.currentStep++
    this.stepTimes.push(Date.now())
    analytics.form.step_complete(this.formName, this.currentStep)
  }
  
  abandon() {
    analytics.form.abandon(this.formName, this.currentStep)
  }
  
  complete() {
    const totalTime = Date.now() - this.startTime
    analytics.form.submit(this.formName, this.totalSteps)
    
    // 发送详细的完成时间分析
    trackEvent({
      action: 'form_completion_analysis',
      category: 'form_interaction',
      label: this.formName,
      custom_parameters: {
        total_time: totalTime,
        average_step_time: totalTime / this.totalSteps,
        step_times: this.stepTimes,
      },
    })
  }
  
  error(errorMessage: string) {
    analytics.form.error(this.formName, errorMessage)
  }
}

// 性能监控
export const performanceTracking = {
  // 监控页面加载性能
  trackPageLoad: () => {
    if (typeof window === 'undefined') return
    
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        analytics.performance.page_load(navigation.loadEventEnd - navigation.fetchStart)
        
        // 发送详细的性能指标
        trackEvent({
          action: 'performance_metrics',
          category: 'performance',
          custom_parameters: {
            dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp_connect: navigation.connectEnd - navigation.connectStart,
            request_response: navigation.responseEnd - navigation.requestStart,
            dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            load_complete: navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
          },
        })
      }
    })
  },
  
  // 监控JavaScript错误
  trackErrors: () => {
    if (typeof window === 'undefined') return
    
    window.addEventListener('error', (event) => {
      analytics.performance.error(event.message, event.error?.stack)
    })
    
    window.addEventListener('unhandledrejection', (event) => {
      analytics.performance.error(`Unhandled Promise Rejection: ${event.reason}`)
    })
  },
}

// 隐私保护配置
export const privacyConfig = {
  // GDPR合规
  gdpr: {
    required: true,
    consent_types: ['analytics', 'marketing', 'functional'],
    default_consent: {
      analytics: false,
      marketing: false,
      functional: true,
    },
  },
  
  // 数据保留期限
  data_retention: {
    analytics: 26, // 月
    user_data: 24, // 月
  },
  
  // IP匿名化
  anonymize_ip: true,
  
  // 禁用广告个性化
  disable_ad_personalization: true,
}

// 初始化分析系统
export const initializeAnalytics = () => {
  // 检查用户同意
  const hasConsent = localStorage.getItem('analytics_consent') === 'true'
  
  if (hasConsent) {
    initializeGA4()
    performanceTracking.trackPageLoad()
    performanceTracking.trackErrors()
  }
}

// 用户同意管理
export const consentManager = {
  grant: (consentTypes: string[]) => {
    localStorage.setItem('analytics_consent', 'true')
    localStorage.setItem('consent_types', JSON.stringify(consentTypes))
    
    if (consentTypes.includes('analytics')) {
      initializeGA4()
    }
  },
  
  revoke: () => {
    localStorage.removeItem('analytics_consent')
    localStorage.removeItem('consent_types')
    
    // 清除GA4 cookies
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = '_ga_' + GA4_CONFIG.measurement_id.slice(2) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  },
  
  hasConsent: () => {
    return localStorage.getItem('analytics_consent') === 'true'
  },
}

// 导出所有分析工具
export {
  initializeGA4,
  trackPageView,
  trackEvent,
  setUserProperties,
  analytics,
  useAnalytics,
  FormAnalytics,
  performanceTracking,
  privacyConfig,
  initializeAnalytics,
  consentManager,
}
