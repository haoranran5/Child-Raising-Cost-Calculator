# 项目故障排除指南

## 🔧 已解决的问题

### 问题1: 本地运行空白页面

#### 问题描述
- 开发服务器启动成功，但浏览器显示空白页面
- 控制台出现Tailwind CSS相关错误

#### 根本原因
1. **Tailwind CSS v4 兼容性问题**：v4版本存在配置复杂性和兼容性问题
2. **CSS @import 语句位置错误**：@import必须在@tailwind指令之前
3. **PostCSS插件配置不匹配**：v4需要特殊的插件配置

#### 解决方案

**1. 降级到Tailwind CSS v3 (推荐)**
```bash
# 卸载v4版本
npm uninstall tailwindcss @tailwindcss/postcss

# 安装稳定的v3版本
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

**2. 更新PostCSS配置**
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},  // ✅ v3使用标准插件名
    autoprefixer: {},
  },
}
```

**3. 修复CSS文件结构**
```css
/* 正确的顺序 */
@import url('https://fonts.googleapis.com/...');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg;
  }
}
```

**4. 简化App组件**
- 移除复杂的依赖导入
- 使用内联样式作为备选方案
- 确保基本功能正常工作

### 问题2: PostCSS + Tailwind CSS v4 配置问题 (已弃用v4)

#### 问题描述
项目启动时出现PostCSS插件错误：
```
Error: Cannot find module '@tailwindcss/postcss'
Error: Cannot apply unknown utility class 'bg-gray-50'
```

#### 解决方案
**已通过降级到v3解决** - v3版本更稳定，兼容性更好

## 🚀 当前配置状态

### 依赖版本
- **Tailwind CSS**: v3.4.0 (稳定版本)
- **PostCSS**: v8.5.6
- **Autoprefixer**: v10.4.21

### 配置文件

#### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* 自定义主色调 */ },
        secondary: { /* 自定义辅色调 */ }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: { /* 自定义动画 */ }
    },
  },
  plugins: [],
}
```

#### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* 导入自定义样式 */
@import './styles/animations.css';
@import './styles/components.css';

@layer base {
  * {
    box-sizing: border-box;
  }
  
  body {
    @apply bg-gray-50 text-gray-900 font-sans;
    font-feature-settings: "rlig" 1, "calt" 1;
    line-height: 1.6;
  }
  
  /* 其他基础样式 */
}
```

## 🛠️ 常见问题解决方案

### 1. PostCSS插件错误
**症状**: `Cannot find module '@tailwindcss/postcss'`
**解决**: 确保PostCSS配置使用正确的插件名称

### 2. Tailwind类名不生效
**症状**: CSS样式不应用
**解决**: 检查 `content` 配置是否包含所有文件路径

### 3. 自定义样式冲突
**症状**: 自定义CSS不生效
**解决**: 使用 `@layer` 指令正确组织样式

### 4. 开发服务器启动失败
**症状**: Vite启动错误
**解决**: 
```bash
# 清理缓存
rm -rf node_modules/.vite
npm run dev
```

### 5. 类型错误
**症状**: TypeScript编译错误
**解决**: 确保所有类型定义文件正确导入

## 📋 维护检查清单

### 定期检查项目
- [ ] 依赖版本是否最新且兼容
- [ ] PostCSS配置是否正确
- [ ] Tailwind配置是否完整
- [ ] 自定义样式是否正常工作
- [ ] TypeScript类型检查通过
- [ ] 开发服务器正常启动

### 更新依赖时注意事项
1. **检查破坏性变更**: 查看更新日志
2. **测试关键功能**: 确保核心功能正常
3. **更新配置文件**: 根据新版本要求调整
4. **运行完整测试**: 验证所有功能

## 🔍 调试技巧

### 1. 查看详细错误信息
```bash
npm run dev -- --debug
```

### 2. 检查PostCSS处理结果
```bash
npx postcss src/index.css --config postcss.config.js
```

### 3. 验证Tailwind配置
```bash
npx tailwindcss --init --dry-run
```

### 4. 清理所有缓存
```bash
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf dist
npm run dev
```

## 📞 获取帮助

如果遇到其他问题：
1. 查看控制台错误信息
2. 检查浏览器开发者工具
3. 参考官方文档：
   - [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
   - [Vite 文档](https://vitejs.dev/)
   - [PostCSS 文档](https://postcss.org/)

## ✅ 项目状态

**当前状态**: ✅ 正常运行 (已修复空白页面问题)
**Tailwind版本**: v3.4.0 (稳定版本)
**最后更新**: 2024年
**开发服务器**: http://localhost:5173/
**构建状态**: 正常
**主要修复**: 降级Tailwind CSS v4 → v3，修复配置兼容性问题
