/**
 * Lighthouse CI 配置
 * 用于性能监控和分析
 */

export default {
  ci: {
    collect: {
      url: [
        'http://localhost:5175/',
        'http://localhost:5175/calculator',
        'http://localhost:5175/results',
      ],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        // 性能指标
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // 其他重要指标
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        
        // 可访问性
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'valid-lang': 'error',
        
        // SEO
        'document-title': 'error',
        'meta-description': 'error',
        'viewport': 'error',
        
        // 最佳实践
        'uses-https': 'error',
        'no-vulnerable-libraries': 'error',
        'charset': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      port: 9001,
      storage: './lighthouse-reports',
    },
  },
}
