import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Activity, Users, Car, Info } from 'lucide-react';

const safetyStats = [
  { stat: '38,000+', description: 'Annual road fatalities in the US', source: 'NHTSA 2023' },
  { stat: '45%', description: 'Reduction in fatalities with seatbelt use', source: 'NHTSA Research' },
  { stat: '28x', description: 'Higher fatality rate for motorcyclists', source: 'IIHS Data' },
  { stat: '11x', description: 'Crash risk at 0.08% BAC vs sober', source: 'CDC Statistics' },
];

const About = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About CrashPredict</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An AI-powered tool for predicting car crash severity to help improve road safety and emergency response planning.
          </p>
        </div>

        {/* Mission */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CrashPredict uses machine learning to analyze crash scenarios and predict injury severity. 
                  Our goal is to provide actionable insights that can help emergency responders prioritize resources, 
                  assist insurance companies in risk assessment, and educate drivers about factors that influence crash outcomes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              How the Prediction Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary mb-2">1</div>
                <h3 className="font-semibold mb-1">Input Data</h3>
                <p className="text-sm text-muted-foreground">
                  Enter crash details including speed, vehicle type, safety features, and environmental conditions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary mb-2">2</div>
                <h3 className="font-semibold mb-1">ML Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our model analyzes 18+ features using gradient boosting to predict severity with 87%+ accuracy.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <h3 className="font-semibold mb-1">Results</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a severity prediction, confidence score, key risk factors, and safety recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Statistics */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-severity-severe" />
              Road Safety Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safetyStats.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 border border-border/50"
                >
                  <p className="text-3xl font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-sm font-medium mb-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Who Can Benefit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Insurance Companies</h3>
                  <p className="text-sm text-muted-foreground">
                    Assess risk factors and set appropriate premiums based on predicted crash severity scenarios.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
                <Activity className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Emergency Responders</h3>
                  <p className="text-sm text-muted-foreground">
                    Prioritize resources and prepare appropriate medical response based on predicted injury severity.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Safety Researchers</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify key risk factors and develop targeted interventions to reduce crash fatalities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-severity-severe/50 bg-severity-fatal/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-severity-severe flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  This tool is for educational and research purposes only. Predictions are based on statistical models 
                  and may not reflect actual crash outcomes. Real-world crashes are influenced by many variables that 
                  cannot be fully captured. Always prioritize safe driving practices and follow traffic laws.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
