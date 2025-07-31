import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { calculateTotalVaccineCosts } from '@/data/vaccineCosts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface VaccineStatisticsProps {
  includeOptional: boolean
}

export function VaccineStatistics({ includeOptional }: VaccineStatisticsProps) {
  const totalCosts = calculateTotalVaccineCosts(includeOptional)

  // 准备图表数据
  const annualData = Object.entries(totalCosts.annualBreakdown).map(([year, cost]) => ({
    year: `${year}岁`,
    cost,
    age: parseInt(year)
  })).sort((a, b) => a.age - b.age)

  const categoryData = [
    { name: '免费疫苗', value: 0, color: '#10b981' },
    { name: '自费疫苗', value: totalCosts.totalCost, color: '#3b82f6' },
    { name: '可选疫苗', value: includeOptional ? totalCosts.totalCost * 0.3 : 0, color: '#8b5cf6' }
  ].filter(item => item.value > 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getVaccineSchedule = () => {
    const schedule = []
    for (let year = 0; year <= 18; year++) {
      const yearVaccines = totalCosts.vaccineSchedule[year] || []
      if (yearVaccines.length > 0) {
        schedule.push({
          year,
          vaccines: yearVaccines
        })
      }
    }
    return schedule
  }

  return (
    <div className="space-y-6">
      {/* 总费用概览 */}
      <Card>
        <CardHeader>
          <CardTitle>0-18岁疫苗费用总览</CardTitle>
          <CardDescription>
            包含国家免疫规划疫苗和{includeOptional ? '所有' : '推荐'}自费疫苗
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">免费疫苗</div>
              <div className="text-sm text-muted-foreground">国家免疫规划</div>
              <div className="text-lg font-semibold">¥0</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">自费疫苗</div>
              <div className="text-sm text-muted-foreground">推荐接种</div>
              <div className="text-lg font-semibold">{formatCurrency(totalCosts.totalCost)}</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">可选疫苗</div>
              <div className="text-sm text-muted-foreground">高端疫苗</div>
              <div className="text-lg font-semibold">
                {includeOptional ? formatCurrency(totalCosts.totalCost * 0.3) : '¥0'}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-lg font-semibold mb-2">总费用</div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(totalCosts.totalCost + (includeOptional ? totalCosts.totalCost * 0.3 : 0))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              0-18岁完整疫苗接种费用
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 年度费用分布图 */}
      <Card>
        <CardHeader>
          <CardTitle>年度疫苗费用分布</CardTitle>
          <CardDescription>
            按年龄显示每年的疫苗费用支出
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={annualData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '费用']}
                  labelFormatter={(label) => `${label}疫苗费用`}
                />
                <Bar dataKey="cost" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 费用分类饼图 */}
      <Card>
        <CardHeader>
          <CardTitle>疫苗费用分类</CardTitle>
          <CardDescription>
            按疫苗类型显示费用占比
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), '费用']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 疫苗接种时间表 */}
      <Card>
        <CardHeader>
          <CardTitle>疫苗接种时间表</CardTitle>
          <CardDescription>
            按年龄显示需要接种的疫苗
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getVaccineSchedule().map(({ year, vaccines }) => (
              <div key={year} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{year}岁</h4>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {vaccines.length}种疫苗
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {vaccines.map((vaccine, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{vaccine.name}</span>
                      <span className="text-sm font-medium">
                        {vaccine.price === 0 ? '免费' : `¥${vaccine.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 重要提醒 */}
      <Card>
        <CardHeader>
          <CardTitle>重要提醒</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>国家免疫规划疫苗全部免费，必须按时接种，否则可能影响入学</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>自费疫苗价格可能因地区、医院不同而有所差异</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold">•</span>
              <span>建议在接种前咨询医生，了解疫苗的适应症和禁忌症</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span>部分疫苗可能需要多次接种，请按照医生建议的接种程序进行</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>疫苗费用是养娃成本的重要组成部分，建议提前做好预算规划</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 