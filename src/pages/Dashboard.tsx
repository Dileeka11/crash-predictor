import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, TrendingUp, Users, Car } from 'lucide-react';

const severityData = [
  { name: 'Minor Injury', value: 45, color: 'hsl(var(--severity-minor))' },
  { name: 'Severe Injury', value: 35, color: 'hsl(var(--severity-severe))' },
  { name: 'Fatal', value: 20, color: 'hsl(var(--severity-fatal))' },
];

const featureImportance = [
  { feature: 'Crash Speed', importance: 32 },
  { feature: 'Seatbelt Use', importance: 24 },
  { feature: 'Crash Type', importance: 18 },
  { feature: 'Vehicle Type', importance: 12 },
  { feature: 'Alcohol Level', importance: 8 },
  { feature: 'Weather', importance: 6 },
];

const stats = [
  { label: 'Model Accuracy', value: '87.3%', icon: TrendingUp, color: 'text-severity-minor' },
  { label: 'Training Samples', value: '125K+', icon: Activity, color: 'text-primary' },
  { label: 'Risk Factors', value: '18', icon: Users, color: 'text-accent' },
  { label: 'Predictions Made', value: '1,234', icon: Car, color: 'text-severity-severe' },
];

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Model Dashboard</h1>
          <p className="text-muted-foreground">
            View prediction statistics and model performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-card">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Icon className={`h-8 w-8 mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Severity Distribution */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Sample Prediction Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {severityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="feature" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Importance']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Model Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>About the Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Algorithm</h3>
                <p className="text-sm text-muted-foreground">
                  Gradient Boosting Classifier with hyperparameter tuning for optimal performance on crash severity prediction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Training Data</h3>
                <p className="text-sm text-muted-foreground">
                  Trained on 125,000+ historical crash records with 18 carefully engineered features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Cross-validated with 87.3% accuracy. Regularly updated with new crash data for improved predictions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
