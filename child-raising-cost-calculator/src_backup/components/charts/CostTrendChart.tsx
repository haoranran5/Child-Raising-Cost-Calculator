import { FC } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { ChartDataPoint } from '../../types'
import { formatCurrency } from '../../utils/calculator'
import { Card } from '../ui'

interface CostTrendChartProps {
  data: ChartDataPoint[]
  title?: string
}

const CostTrendChart: FC<CostTrendChartProps> = ({ 
  data, 
  title = "成本趋势图" 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{`年龄: ${label}岁`}</p>
          <p className="text-lg font-bold text-primary-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-primary-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="age" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>* 图表显示不同年龄段的预估月均成本</p>
      </div>
    </Card>
  )
}

export default CostTrendChart
