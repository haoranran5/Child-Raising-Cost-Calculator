import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { calculateVaccineCosts, getVaccineRecommendations } from '@/data/vaccineCosts'
import { VaccineInfo } from '@/data/vaccineCosts'

interface VaccineDetailsProps {
  childAge: number
  monthlyIncome: number
}

export function VaccineDetails({ childAge, monthlyIncome }: VaccineDetailsProps) {
  const ageMonths = childAge * 12
  const includeOptional = monthlyIncome >= 30000
  const vaccineCosts = calculateVaccineCosts(ageMonths, includeOptional)
  const familyIncome = monthlyIncome < 15000 ? 'low' : monthlyIncome < 30000 ? 'medium' : 'high'
  const recommendations = getVaccineRecommendations(ageMonths, familyIncome)

  const getVaccineCategoryColor = (category: string) => {
    switch (category) {
      case 'free':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'optional':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getVaccineNecessityColor = (necessity: string) => {
    switch (necessity) {
      case 'required':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'recommended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'optional':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const renderVaccineList = (vaccines: VaccineInfo[], title: string, description: string) => {
    if (vaccines.length === 0) return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{title}</span>
            <Badge variant="outline" className={getVaccineCategoryColor(vaccines[0].category)}>
              {vaccines[0].category === 'free' ? '免费' : vaccines[0].category === 'paid' ? '自费' : '可选'}
            </Badge>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vaccines.map((vaccine, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{vaccine.name}</span>
                    <Badge variant="outline" className={getVaccineNecessityColor(vaccine.necessity)}>
                      {vaccine.necessity === 'required' ? '必须' : vaccine.necessity === 'recommended' ? '推荐' : '可选'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{vaccine.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    接种月龄: {vaccine.ageMonths.map(month => `${month}月`).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {vaccine.price === 0 ? '免费' : `¥${vaccine.price}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 疫苗费用总览 */}
      <Card>
        <CardHeader>
          <CardTitle>疫苗费用总览</CardTitle>
          <CardDescription>
            {childAge}岁孩子的疫苗费用分解（{ageMonths}月龄）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">免费</div>
              <div className="text-sm text-muted-foreground">国家免疫疫苗</div>
              <div className="text-lg font-semibold">{vaccineCosts.freeVaccines.length}种</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">自费</div>
              <div className="text-sm text-muted-foreground">推荐接种疫苗</div>
              <div className="text-lg font-semibold">¥{vaccineCosts.breakdown.paid}</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">可选</div>
              <div className="text-sm text-muted-foreground">高端疫苗</div>
              <div className="text-lg font-semibold">¥{vaccineCosts.breakdown.optional}</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="text-lg font-semibold mb-2">本月总疫苗费用</div>
            <div className="text-3xl font-bold text-primary">
              ¥{vaccineCosts.totalCost}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              包含 {vaccineCosts.paidVaccines.length + vaccineCosts.optionalVaccines.length} 种自费疫苗
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 疫苗列表 */}
      <div className="space-y-4">
        {renderVaccineList(
          vaccineCosts.freeVaccines,
          '国家免疫规划疫苗（免费）',
          '这些疫苗由国家免费提供，必须按时接种'
        )}
        
        {renderVaccineList(
          vaccineCosts.paidVaccines,
          '自费疫苗（推荐接种）',
          '这些疫苗虽然需要自费，但强烈推荐接种以提供更好的保护'
        )}
        
        {renderVaccineList(
          vaccineCosts.optionalVaccines,
          '可选疫苗',
          '这些疫苗可根据家庭经济情况选择接种'
        )}
      </div>

      {/* 接种建议 */}
      <Card>
        <CardHeader>
          <CardTitle>接种建议</CardTitle>
          <CardDescription>
            基于孩子年龄和家庭收入水平的个性化建议
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 注意事项 */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 