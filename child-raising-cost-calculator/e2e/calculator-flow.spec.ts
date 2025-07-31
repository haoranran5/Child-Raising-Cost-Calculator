/**
 * E2E测试：完整的计算器流程
 */

import { test, expect } from '@playwright/test'

test.describe('Calculator Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete full calculator flow', async ({ page }) => {
    // 1. 首页检查
    await expect(page).toHaveTitle(/养娃成本计算器/)
    await expect(page.getByRole('heading', { name: /养娃成本计算器/ })).toBeVisible()
    
    // 2. 点击开始计算
    await page.getByRole('button', { name: /开始计算/ }).click()
    await expect(page).toHaveURL('/calculator')
    
    // 3. 填写第一步：城市选择
    await expect(page.getByText(/选择城市/)).toBeVisible()
    await page.selectOption('[name="city"]', '北京')
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 4. 填写第二步：家庭信息
    await expect(page.getByText(/家庭信息/)).toBeVisible()
    await page.fill('[name="monthlyIncome"]', '20000')
    await page.selectOption('[name="familySize"]', '3')
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 5. 填写第三步：教育偏好
    await expect(page.getByText(/教育偏好/)).toBeVisible()
    await page.check('[name="educationLevel"][value="public"]')
    await page.check('[name="hasInsurance"]')
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 6. 预览和提交
    await expect(page.getByText(/信息预览/)).toBeVisible()
    await page.getByRole('button', { name: /提交计算/ }).click()
    
    // 7. 查看结果
    await expect(page).toHaveURL('/results')
    await expect(page.getByText(/计算结果/)).toBeVisible()
    await expect(page.getByText(/总成本/)).toBeVisible()
    
    // 8. 验证结果数据
    const totalCost = page.getByTestId('total-cost')
    await expect(totalCost).toBeVisible()
    await expect(totalCost).toContainText(/¥/)
  })

  test('should handle form validation', async ({ page }) => {
    await page.getByRole('button', { name: /开始计算/ }).click()
    
    // 尝试不填写必填字段就提交
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 应该显示验证错误
    await expect(page.getByText(/请选择城市/)).toBeVisible()
  })

  test('should allow going back to previous steps', async ({ page }) => {
    await page.getByRole('button', { name: /开始计算/ }).click()
    
    // 填写第一步
    await page.selectOption('[name="city"]', '上海')
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 填写第二步
    await page.fill('[name="monthlyIncome"]', '15000')
    await page.getByRole('button', { name: /下一步/ }).click()
    
    // 返回上一步
    await page.getByRole('button', { name: /上一步/ }).click()
    
    // 验证数据是否保留
    await expect(page.locator('[name="monthlyIncome"]')).toHaveValue('15000')
  })

  test('should save progress automatically', async ({ page }) => {
    await page.getByRole('button', { name: /开始计算/ }).click()
    
    // 填写一些数据
    await page.selectOption('[name="city"]', '深圳')
    await page.getByRole('button', { name: /下一步/ }).click()
    await page.fill('[name="monthlyIncome"]', '25000')
    
    // 刷新页面
    await page.reload()
    
    // 验证数据是否自动保存
    await expect(page.locator('[name="monthlyIncome"]')).toHaveValue('25000')
  })

  test('should work on mobile devices', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip('This test is only for mobile devices')
    }

    // 检查移动端布局
    await expect(page.getByRole('heading', { name: /养娃成本计算器/ })).toBeVisible()
    
    // 检查按钮是否足够大（触摸友好）
    const startButton = page.getByRole('button', { name: /开始计算/ })
    const buttonBox = await startButton.boundingBox()
    expect(buttonBox?.height).toBeGreaterThan(44) // 最小触摸目标
    
    // 测试移动端表单
    await startButton.click()
    await page.selectOption('[name="city"]', '广州')
    
    // 检查表单在移动端是否易于使用
    const citySelect = page.locator('[name="city"]')
    const selectBox = await citySelect.boundingBox()
    expect(selectBox?.height).toBeGreaterThan(44)
  })
})

test.describe('Performance Tests', () => {
  test('should load pages quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000) // 页面应该在3秒内加载完成
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // 测试LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
    
    expect(lcp).toBeLessThan(2500) // LCP应该小于2.5秒
  })
})

test.describe('Accessibility Tests', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // 使用Tab键导航
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: /开始计算/ })).toBeFocused()
    
    // 使用Enter键激活按钮
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/calculator')
  })

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/calculator')
    
    // 检查表单字段是否有适当的标签
    const citySelect = page.locator('[name="city"]')
    await expect(citySelect).toHaveAttribute('aria-label')
    
    // 检查按钮是否有描述性文本
    const nextButton = page.getByRole('button', { name: /下一步/ })
    await expect(nextButton).toBeVisible()
  })

  test('should work with screen readers', async ({ page }) => {
    await page.goto('/')
    
    // 检查页面结构是否语义化
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
    
    // 检查跳转链接
    const skipLink = page.locator('[href="#main-content"]')
    if (await skipLink.isVisible()) {
      await expect(skipLink).toHaveText(/跳转到主要内容/)
    }
  })
})

test.describe('Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    // 模拟网络错误
    await page.route('**/api/**', route => route.abort())
    
    await page.goto('/')
    await page.getByRole('button', { name: /开始计算/ }).click()
    
    // 填写表单并提交
    await page.selectOption('[name="city"]', '北京')
    await page.getByRole('button', { name: /下一步/ }).click()
    await page.fill('[name="monthlyIncome"]', '20000')
    await page.getByRole('button', { name: /提交计算/ }).click()
    
    // 应该显示错误信息
    await expect(page.getByText(/网络错误|计算失败/)).toBeVisible()
  })

  test('should show 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route')
    await expect(page.getByText(/404|页面未找到/)).toBeVisible()
    
    // 应该有返回首页的链接
    await page.getByRole('link', { name: /返回首页/ }).click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('Data Persistence', () => {
  test('should persist calculation results', async ({ page }) => {
    // 完成一次计算
    await page.goto('/')
    await page.getByRole('button', { name: /开始计算/ }).click()
    
    // 快速填写表单（使用测试数据）
    await page.selectOption('[name="city"]', '北京')
    await page.getByRole('button', { name: /下一步/ }).click()
    await page.fill('[name="monthlyIncome"]', '20000')
    await page.getByRole('button', { name: /提交计算/ }).click()
    
    // 获取结果
    await expect(page).toHaveURL('/results')
    const totalCost = await page.getByTestId('total-cost').textContent()
    
    // 导航到其他页面再回来
    await page.goto('/')
    await page.goto('/results')
    
    // 验证结果是否仍然存在
    await expect(page.getByTestId('total-cost')).toHaveText(totalCost!)
  })
})
