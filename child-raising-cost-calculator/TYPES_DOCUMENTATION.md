# TypeScript 类型定义文档

## 概述

本文档详细说明了养娃成本计算器项目中的所有TypeScript类型定义。类型系统设计遵循以下原则：

- **类型安全**: 确保编译时类型检查
- **可扩展性**: 便于添加新功能和字段
- **向后兼容**: 保持与现有代码的兼容性
- **清晰性**: 类型名称和结构清晰易懂

## 核心类型分类

### 1. 基础枚举类型

#### CityTier - 城市等级
```typescript
type CityTier = 'tier1' | 'new-tier1' | 'tier2' | 'tier3-4'
```
- `tier1`: 一线城市（北上广深）
- `new-tier1`: 新一线城市（成都、杭州等）
- `tier2`: 二线城市（省会城市）
- `tier3-4`: 三四线城市

#### IncomeLevel - 收入档位
```typescript
type IncomeLevel = 'low' | 'lower-middle' | 'middle' | 'upper-middle' | 'high'
```
- `low`: 低收入（<8k）
- `lower-middle`: 中低收入（8k-15k）
- `middle`: 中等收入（15k-25k）
- `upper-middle`: 中高收入（25k-50k）
- `high`: 高收入（>50k）

#### HousingType - 住房情况
```typescript
type HousingType = 'rental' | 'owned' | 'school-district'
```

#### FamilySupport - 家庭支持程度
```typescript
type FamilySupport = 'none' | 'minimal' | 'moderate' | 'significant' | 'full'
```

#### EducationType - 教育选择
```typescript
type EducationType = 'public' | 'private' | 'international'
```

#### TrainingAttitude - 培训态度
```typescript
type TrainingAttitude = 'relaxed' | 'normal' | 'active' | 'intensive'
```

### 2. 用户输入数据

#### UserInput - 主要输入接口
包含用户在表单中填写的所有信息：
- 城市等级、收入水平、住房情况
- 家庭支持、教育选择、培训态度
- 孩子年龄、计划生育数量等

### 3. 费用相关类型

#### CostBreakdown - 费用分解
提供完整的费用分析：
- 总费用、年均、月均
- 按年龄段分解
- 按类别分解
- 必需vs可选费用
- 收入占比分析

#### AgeGroupCost - 年龄段费用
详细的年龄段费用分析：
- 年龄范围定义
- 该年龄段总费用
- 费用明细列表

#### CostItem - 单项费用
每个具体费用项的详细信息：
- 费用类别和名称
- 月均/年度金额
- 是否必需
- 费用占比

### 4. 对比数据类型

#### ComparisonData - 对比分析
提供与平均水平的对比：
- 全国平均、城市平均
- 同收入水平、同教育选择平均
- 差异分析和排名信息

#### DifferenceAnalysis - 差异分析
详细的差异分析：
- 金额和百分比差异
- 主要差异因素
- 是否高于平均水平

### 5. 计算结果类型

#### CalculationResult - 完整计算结果
包含所有计算输出：
- 用户输入数据
- 费用分解分析
- 年度预测数据
- 对比分析结果
- 图表数据

#### YearlyProjection - 年度预测
每年的详细预测：
- 年份和孩子年龄
- 当年费用和累计费用
- 通胀调整（可选）
- 费用分解

### 6. 配置类型

#### CostFactors - 费用系数配置
所有计算用到的系数：
- 基础费用配置
- 各种乘数系数
- 年龄段系数

#### AppConfig - 应用配置
应用级别的配置：
- 版本信息
- 功能开关
- 默认设置

## 使用示例

### 基本用法
```typescript
import { UserInput, CalculationResult, CostBreakdown } from './types'

// 用户输入
const userInput: UserInput = {
  cityTier: 'tier1',
  incomeLevel: 'middle',
  housingType: 'owned',
  familySupport: 'moderate',
  educationType: 'public',
  trainingAttitude: 'normal',
  childAge: 3
}

// 计算结果
const result: CalculationResult = calculateCost(userInput)

// 费用分解
const breakdown: CostBreakdown = result.costBreakdown
```

### 类型守卫
```typescript
function isCityTier(value: string): value is CityTier {
  return ['tier1', 'new-tier1', 'tier2', 'tier3-4'].includes(value)
}
```

### 工具类型使用
```typescript
// 部分更新
type PartialUserInput = DeepPartial<UserInput>

// 只读配置
type ReadonlyConfig = DeepReadonly<AppConfig>
```

## 扩展指南

### 添加新的枚举值
1. 在对应的类型定义中添加新值
2. 更新相关的配置对象
3. 更新验证逻辑
4. 更新UI选项

### 添加新的费用类别
1. 在 `CostCategory` 中添加新类别
2. 更新 `CostFactors` 中的基础费用
3. 更新计算逻辑
4. 更新UI显示

### 添加新的输入字段
1. 在 `UserInput` 接口中添加字段
2. 更新表单组件
3. 更新验证规则
4. 更新计算逻辑

## 最佳实践

1. **使用联合类型**: 对于有限的选项使用联合类型而不是字符串
2. **接口继承**: 使用接口继承减少重复定义
3. **可选字段**: 合理使用可选字段，提供默认值
4. **泛型**: 在通用组件中使用泛型提高复用性
5. **类型守卫**: 使用类型守卫确保运行时类型安全

## 版本兼容性

为了保持向后兼容性，我们保留了 `FormData` 接口，它扩展了新的 `UserInput` 接口并包含了旧版本的字段。

新代码应该使用 `UserInput` 接口，旧代码可以继续使用 `FormData` 接口。
