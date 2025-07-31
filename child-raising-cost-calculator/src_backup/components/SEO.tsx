import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  /** 页面标题 */
  title?: string
  /** 页面描述 */
  description?: string
  /** 关键词 */
  keywords?: string[]
  /** 页面URL */
  url?: string
  /** 图片URL */
  image?: string
  /** 页面类型 */
  type?: 'website' | 'article' | 'product'
  /** 是否索引 */
  noIndex?: boolean
  /** 结构化数据 */
  structuredData?: object
  /** 自定义meta标签 */
  customMeta?: Array<{ name?: string; property?: string; content: string }>
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = '专业的养娃成本计算器，帮助年轻父母科学规划育儿预算。基于大数据分析，提供个性化的养育成本预估和理财建议。',
  keywords = ['养娃成本', '育儿预算', '养育费用', '儿童成本计算', '家庭理财', '育儿规划'],
  url,
  image = '/og-image.jpg',
  type = 'website',
  noIndex = false,
  structuredData,
  customMeta = []
}) => {
  // 默认配置
  const defaultTitle = '养娃成本计算器 - 科学规划育儿预算'
  const siteTitle = title ? `${title} | 养娃成本计算器` : defaultTitle
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const imageUrl = image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : ''}${image}`

  // 结构化数据
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '养娃成本计算器',
    description: description,
    url: currentUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    author: {
      '@type': 'Organization',
      name: '养娃成本计算器团队'
    },
    publisher: {
      '@type': 'Organization',
      name: '养娃成本计算器',
      logo: {
        '@type': 'ImageObject',
        url: `${typeof window !== 'undefined' ? window.location.origin : ''}/logo.png`
      }
    }
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Helmet>
      {/* 基础meta标签 */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* 视口和字符集 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* 语言和地区 */}
      <html lang="zh-CN" />
      <meta name="language" content="zh-CN" />
      <meta name="geo.region" content="CN" />
      
      {/* 搜索引擎指令 */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="养娃成本计算器" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* 移动端优化 */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="养娃成本计算器" />
      
      {/* 主题颜色 */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* 图标 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* 预连接和DNS预取 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* 规范链接 */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* 自定义meta标签 */}
      {customMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}
    </Helmet>
  )
}

export default SEO

// 预定义的SEO配置
export const seoConfigs = {
  home: {
    title: '首页',
    description: '专业的养娃成本计算器，帮助年轻父母科学规划育儿预算。基于大数据分析，提供个性化的养育成本预估和理财建议。',
    keywords: ['养娃成本', '育儿预算', '养育费用', '儿童成本计算', '家庭理财', '育儿规划'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '养娃成本计算器',
      url: typeof window !== 'undefined' ? window.location.origin : '',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${typeof window !== 'undefined' ? window.location.origin : ''}/calculator`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  },
  
  calculator: {
    title: '成本计算器',
    description: '使用我们的智能计算器，输入您的家庭信息，获得个性化的养娃成本分析。支持多种教育选择和生活水平设置。',
    keywords: ['养娃成本计算', '育儿费用计算器', '儿童成本预估', '家庭预算工具'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: '养娃成本计算器',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web'
    }
  },
  
  results: {
    title: '计算结果',
    description: '查看详细的养娃成本分析报告，包括费用分解、年龄段对比、省钱建议等。帮助您更好地规划家庭财务。',
    keywords: ['养娃成本报告', '育儿费用分析', '家庭财务规划', '省钱建议'],
    noIndex: true // 结果页面不需要被搜索引擎索引
  }
}

// 便捷的SEO Hook
export const useSEO = (config: keyof typeof seoConfigs | SEOProps) => {
  if (typeof config === 'string') {
    return seoConfigs[config]
  }
  return config
}
