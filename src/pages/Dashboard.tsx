import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, TrendingUp, Users, Car } from 'lucide-react';

// Actual severity distribution from training data (4000 samples)
const severityData = [
  { name: 'Minor Injury', value: 68.9, color: 'hsl(var(--severity-minor))' },
  { name: 'Severe Injury', value: 26.0, color: 'hsl(var(--severity-severe))' },
  { name: 'Fatal', value: 5.1, color: 'hsl(var(--severity-fatal))' },
];

// Actual feature importance from CatBoost model
const featureImportance = [
  { feature: 'Impact Angle', importance: 10.68 },
  { feature: 'Driver Experience', importance: 10.52 },
  { feature: 'Crash Speed', importance: 9.85 },
  { feature: 'Traffic Density', importance: 9.55 },
  { feature: 'Distraction Level', importance: 8.67 },
  { feature: 'Visibility', importance: 7.50 },
];

const stats = [
  { label: 'Model Accuracy', value: '68.88%', icon: TrendingUp, color: 'text-severity-minor' },
  { label: 'Training Samples', value: '4,000', icon: Activity, color: 'text-primary' },
  { label: 'Input Features', value: '17', icon: Users, color: 'text-accent' },
  { label: 'Severity Classes', value: '3', icon: Car, color: 'text-severity-severe' },
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
              <CardTitle>Training Data Distribution</CardTitle>
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
              <CardTitle>Feature Importance (Top 6)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 12]} tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
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
                  CatBoost Classifier - a gradient boosting algorithm optimized for categorical features and crash severity prediction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Training Data</h3>
                <p className="text-sm text-muted-foreground">
                  Trained on 4,000 crash records with 17 engineered features including speed, impact angle, and driver characteristics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Validated with 68.88% accuracy on test set. Model predicts 3 severity classes: Minor Injury, Severe Injury, and Fatal.
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
