import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

console.log('main.tsx 开始执行')

// 确保DOM元素存在
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found')
  throw new Error('Root element not found')
}

console.log('开始渲染React应用')

// 创建React根节点并渲染应用
try {
  const root = createRoot(rootElement)
  console.log('Root created:', root)

  root.render(React.createElement(App))
  console.log('App rendered successfully')
} catch (error) {
  console.error('渲染失败:', error)
}
