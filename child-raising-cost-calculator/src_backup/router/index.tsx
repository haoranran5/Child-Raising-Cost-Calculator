import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import { PageLoading } from '../components/LoadingSpinner'
import SEO, { seoConfigs } from '../components/SEO'

// 懒加载页面组件
const HomePage = lazy(() => import('../pages/HomePage'))
const CalculatorPage = lazy(() => import('../pages/CalculatorPage'))
const ResultsPage = lazy(() => import('../pages/ResultsPage'))

// 404页面组件
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <SEO
      title="页面未找到"
      description="抱歉，您访问的页面不存在。"
      noIndex={true}
    />
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-400 dark:text-gray-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        页面未找到
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回首页
      </a>
    </div>
  </div>
)

// 根布局组件
const RootLayout: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

// 路由配置
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <SEO {...seoConfigs.home} />
            <HomePage />
          </>
        )
      },
      {
        path: 'calculator',
        element: (
          <>
            <SEO {...seoConfigs.calculator} />
            <CalculatorPage />
          </>
        )
      },
      {
        path: 'results',
        element: (
          <>
            <SEO {...seoConfigs.results} />
            <ResultsPage />
          </>
        )
      }
    ]
  }
], {
  // 路由配置选项
  future: {
    // 启用未来的路由特性
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
})

// 路由提供者组件
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter

// 路由工具函数
export const navigateToCalculator = () => {
  window.location.href = '/calculator'
}

export const navigateToResults = () => {
  window.location.href = '/results'
}

export const navigateToHome = () => {
  window.location.href = '/'
}

// 路由守卫Hook
export const useRouteGuard = () => {
  const checkCalculatorAccess = () => {
    // 检查是否有必要的数据访问计算器
    const store = JSON.parse(localStorage.getItem('child-cost-calculator-store') || '{}')
    return !!store.state?.userInput
  }

  const checkResultsAccess = () => {
    // 检查是否有计算结果访问结果页
    const store = JSON.parse(localStorage.getItem('child-cost-calculator-store') || '{}')
    return !!store.state?.calculationResult
  }

  return {
    checkCalculatorAccess,
    checkResultsAccess
  }
}

// 面包屑配置
export const breadcrumbConfig = {
  '/': { label: '首页', path: '/' },
  '/calculator': { label: '成本计算', path: '/calculator' },
  '/results': { label: '计算结果', path: '/results' }
}

// 获取当前路由信息
export const getCurrentRouteInfo = () => {
  const path = window.location.pathname
  return breadcrumbConfig[path as keyof typeof breadcrumbConfig] || { label: '未知页面', path }
}
