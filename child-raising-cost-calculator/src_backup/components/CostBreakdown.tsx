import { FC } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { CostBreakdown as CostBreakdownType } from '../types'
import { formatCurrency } from '../utils/calculator'

interface CostBreakdownProps {
  breakdown: CostBreakdownType
}

const COLORS = [
  '#0ea5e9', // 基本需求 - 蓝色
  '#8b5cf6', // 教育 - 紫色
  '#10b981', // 医疗 - 绿色
  '#f59e0b', // 服装 - 橙色
  '#ef4444', // 娱乐 - 红色
  '#6366f1', // 课外活动 - 靛蓝色
]

const CostBreakdown: FC<CostBreakdownProps> = ({ breakdown }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card mt-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">成本构成分析</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* 饼图 */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 详细列表 */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
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
    </motion.div>
  )
}

export default CostBreakdown
