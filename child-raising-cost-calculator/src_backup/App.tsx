import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeTheme } from './store'
import { HomePage, CalculatorPage, ResultsPage } from './pages'

// 404页面组件
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        页面未找到
      </h2>
      <p className="text-gray-600 mb-8">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        返回首页
      </a>
    </div>
  </div>
)

// 主应用组件
function App() {
  useEffect(() => {
    // 初始化主题
    initializeTheme()

    // 设置页面标题
    document.title = '养娃成本计算器 - 科学规划育儿预算'

    // 设置页面描述
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '专业的养娃成本计算器，帮助年轻父母科学规划育儿预算。基于大数据分析，提供个性化的养育成本预估和理财建议。')
    }
  }, [])

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 发送错误报告到监控服务
        console.error('App Error Boundary:', error, errorInfo)
      }}
    >
      <div className="App">
        {/* 路由系统 */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  )
}

export default App