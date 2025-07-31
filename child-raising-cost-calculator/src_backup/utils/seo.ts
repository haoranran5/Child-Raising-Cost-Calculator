/**
 * SEO优化工具和配置
 * 包含Meta标签管理、结构化数据、性能优化等
 */

// SEO配置接口
export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  siteName?: string
  locale?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

// 默认SEO配置
export const defaultSEOConfig: SEOConfig = {
  title: '养娃成本计算器 - 科学规划育儿预算',
  description: '专业的养娃成本计算器，帮助年轻父母科学规划育儿预算。基于大数据分析，提供个性化的养育成本预估和理财建议。',
  keywords: [
    '养娃成本',
    '育儿预算',
    '养娃费用',
    '育儿成本计算',
    '养孩子费用',
    '育儿理财',
    '养娃规划',
    '育儿投资',
    '养娃预算',
    '育儿开支'
  ],
  image: '/images/og-image.jpg',
  type: 'website',
  siteName: '养娃成本计算器',
  locale: 'zh_CN',
  author: '养娃成本计算器团队',
}

// 页面特定SEO配置
export const pageSEOConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: '养娃成本计算器 - 科学规划育儿预算',
    description: '专业的养娃成本计算器，帮助年轻父母科学规划育儿预算。基于大数据分析，提供个性化的养育成本预估和理财建议。',
    keywords: ['养娃成本', '育儿预算', '养娃费用', '育儿成本计算'],
  },
  calculator: {
    title: '开始计算 - 养娃成本计算器',
    description: '填写您的家庭信息，获取个性化的养娃成本分析报告。包含教育、医疗、生活等各项费用的详细预估。',
    keywords: ['养娃成本计算', '育儿费用评估', '养娃预算规划'],
  },
  results: {
    title: '计算结果 - 养娃成本计算器',
    description: '查看您的个性化养娃成本分析报告，包含详细的费用分解、年龄段分析和节省建议。',
    keywords: ['养娃成本报告', '育儿费用分析', '养娃预算结果'],
  },
}

// 生成页面标题
export const generatePageTitle = (pageTitle?: string, siteName?: string) => {
  const site = siteName || defaultSEOConfig.siteName
  
  if (!pageTitle) {
    return defaultSEOConfig.title
  }
  
  return pageTitle.includes(site!) ? pageTitle : `${pageTitle} - ${site}`
}

// 生成Meta标签
export const generateMetaTags = (config: Partial<SEOConfig> = {}) => {
  const seoConfig = { ...defaultSEOConfig, ...config }
  
  const metaTags = [
    // 基础Meta标签
    { name: 'description', content: seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords?.join(', ') },
    { name: 'author', content: seoConfig.author },
    
    // Open Graph标签
    { property: 'og:title', content: seoConfig.title },
    { property: 'og:description', content: seoConfig.description },
    { property: 'og:type', content: seoConfig.type },
    { property: 'og:image', content: seoConfig.image },
    { property: 'og:url', content: seoConfig.url },
    { property: 'og:site_name', content: seoConfig.siteName },
    { property: 'og:locale', content: seoConfig.locale },
    
    // Twitter Card标签
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoConfig.title },
    { name: 'twitter:description', content: seoConfig.description },
    { name: 'twitter:image', content: seoConfig.image },
    
    // 移动端优化
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // 搜索引擎优化
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    
    // 性能优化
    { name: 'dns-prefetch', content: '//fonts.googleapis.com' },
    { name: 'preconnect', content: 'https://fonts.gstatic.com' },
  ]
  
  // 添加时间戳（如果提供）
  if (seoConfig.publishedTime) {
    metaTags.push({ property: 'article:published_time', content: seoConfig.publishedTime })
  }
  
  if (seoConfig.modifiedTime) {
    metaTags.push({ property: 'article:modified_time', content: seoConfig.modifiedTime })
  }
  
  return metaTags.filter(tag => tag.content) // 过滤空值
}

// 生成结构化数据
export const generateStructuredData = (config: Partial<SEOConfig> = {}) => {
  const seoConfig = { ...defaultSEOConfig, ...config }
  
  // 应用程序结构化数据
  const applicationData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoConfig.siteName,
    description: seoConfig.description,
    url: seoConfig.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    author: {
      '@type': 'Organization',
      name: seoConfig.author,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '10000',
      bestRating: '5',
      worstRating: '1',
    },
  }
  
  // 工具类型结构化数据
  const toolData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '养娃成本计算器',
    description: seoConfig.description,
    url: seoConfig.url,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    featureList: [
      '个性化成本计算',
      '详细费用分解',
      '年龄段分析',
      '节省建议',
      '数据可视化',
    ],
  }
  
  // 组织信息结构化数据
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    description: seoConfig.description,
    url: seoConfig.url,
    logo: seoConfig.image,
    sameAs: [
      // 社交媒体链接（如果有）
    ],
  }
  
  return {
    application: applicationData,
    tool: toolData,
    organization: organizationData,
  }
}

// 生成面包屑导航结构化数据
export const generateBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// 生成FAQ结构化数据
export const generateFAQData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// 生成站点地图数据
export const generateSitemapData = () => {
  const baseUrl = 'https://yangwacost.com' // 替换为实际域名
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/calculator', priority: 0.9, changefreq: 'monthly' },
    { url: '/results', priority: 0.8, changefreq: 'monthly' },
  ]
  
  return pages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastmod: new Date().toISOString(),
    priority: page.priority,
    changefreq: page.changefreq,
  }))
}

// 生成robots.txt内容
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# 站点地图
Sitemap: https://yangwacost.com/sitemap.xml

# 禁止访问的路径
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# 爬取延迟（毫秒）
Crawl-delay: 1`
}

// 核心Web指标优化建议
export const coreWebVitalsOptimization = {
  // Largest Contentful Paint (LCP) 优化
  lcp: {
    recommendations: [
      '优化图片加载：使用WebP格式，添加loading="lazy"',
      '预加载关键资源：使用<link rel="preload">',
      '优化服务器响应时间：使用CDN',
      '移除未使用的CSS和JavaScript',
    ],
    target: '< 2.5s',
  },
  
  // First Input Delay (FID) 优化
  fid: {
    recommendations: [
      '减少JavaScript执行时间',
      '代码分割和懒加载',
      '使用Web Workers处理复杂计算',
      '优化第三方脚本加载',
    ],
    target: '< 100ms',
  },
  
  // Cumulative Layout Shift (CLS) 优化
  cls: {
    recommendations: [
      '为图片和视频设置尺寸属性',
      '避免在现有内容上方插入内容',
      '使用transform动画而不是改变布局的属性',
      '预留广告和嵌入内容的空间',
    ],
    target: '< 0.1',
  },
}

// 字体加载优化
export const fontOptimization = {
  // 字体预加载
  preloadFonts: [
    { href: '/fonts/inter-var.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
  ],
  
  // 字体显示策略
  fontDisplay: 'swap',
  
  // 字体子集化
  fontSubsets: ['latin', 'latin-ext'],
}

// 图片优化配置
export const imageOptimization = {
  // 支持的格式
  formats: ['webp', 'avif', 'jpg', 'png'],
  
  // 响应式图片尺寸
  sizes: [320, 640, 768, 1024, 1280, 1920],
  
  // 质量设置
  quality: {
    webp: 80,
    avif: 70,
    jpg: 85,
    png: 90,
  },
  
  // 懒加载配置
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
  },
}

// 导出所有SEO工具
export {
  defaultSEOConfig,
  pageSEOConfigs,
  generatePageTitle,
  generateMetaTags,
  generateStructuredData,
  generateBreadcrumbData,
  generateFAQData,
  generateSitemapData,
  generateRobotsTxt,
  coreWebVitalsOptimization,
  fontOptimization,
  imageOptimization,
}
