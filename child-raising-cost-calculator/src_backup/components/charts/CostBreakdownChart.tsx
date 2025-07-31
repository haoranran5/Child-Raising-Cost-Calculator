import { FC } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { PieChart as PieChartIcon } from 'lucide-react'
import { CostBreakdown } from '../../types'
import { formatCurrency } from '../../utils/calculator'
import { Card } from '../ui'

interface CostBreakdownChartProps {
  breakdown: CostBreakdown
  title?: string
}

const COLORS = [
  '#0ea5e9', // 基本需求 - 蓝色
  '#8b5cf6', // 教育 - 紫色
  '#10b981', // 医疗 - 绿色
  '#f59e0b', // 服装 - 橙色
  '#ef4444', // 娱乐 - 红色
  '#6366f1', // 课外活动 - 靛蓝色
]

const CostBreakdownChart: FC<CostBreakdownChartProps> = ({ 
  breakdown, 
  title = "成本构成分析" 
}) => {
  const data = [
    { name: '基本需求', value: breakdown.basicNeeds, color: COLORS[0] },
    { name: '教育费用', value: breakdown.education, color: COLORS[1] },
    { name: '医疗保健', value: breakdown.healthcare, color: COLORS[2] },
    { name: '服装费用', value: breakdown.clothing, color: COLORS[3] },
    { name: '娱乐活动', value: breakdown.entertainment, color: COLORS[4] },
    { name: '课外活动', value: breakdown.extracurricular, color: COLORS[5] },
  ].filter(item => item.value > 0) // 只显示有值的项目

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.color }}>
            {formatCurrency(data.value)}
          </p>
        </div>
      )
    }
    return null
  }

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null // 不显示小于5%的标签
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card>
      <div className="flex items-center mb-6">
        <PieChartIcon className="w-6 h-6 text-primary-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* 饼图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 详细列表 */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="font-bold text-gray-800">
                {formatCurrency(item.value)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default CostBreakdownChart
