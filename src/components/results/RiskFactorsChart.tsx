import { RiskFactor } from '@/types/prediction.types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RiskFactorsChartProps {
  riskFactors: RiskFactor[];
}

const RiskFactorsChart = ({ riskFactors }: RiskFactorsChartProps) => {
  const data = riskFactors.map((factor, index) => ({
    name: factor.feature,
    impact: Math.round(factor.impact * 100),
    fill: index === 0 ? 'hsl(var(--chart-5))' : index === 1 ? 'hsl(var(--chart-4))' : 'hsl(var(--chart-3))',
  }));

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">Key Risk Factors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="name" width={120} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {riskFactors.map((factor, index) => (
              <div key={factor.feature} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: data[index]?.fill }}
                  />
                  <span className="font-medium">{factor.feature}</span>
                </div>
                <span className="font-mono text-lg font-bold">
                  {Math.round(factor.impact * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskFactorsChart;
