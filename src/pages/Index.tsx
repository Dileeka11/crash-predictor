import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, BarChart2, Zap, Car, AlertTriangle, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Accurate Predictions',
    description: 'ML model trained on 125K+ crash records with 87%+ accuracy',
  },
  {
    icon: BarChart2,
    title: 'Risk Analysis',
    description: 'Identify key factors contributing to crash severity',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get predictions and recommendations in seconds',
  },
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Crash Analysis</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Predict Car Crash{' '}
              <span className="text-primary">Severity</span>{' '}
              with Machine Learning
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Enter crash scenario details and get instant predictions on injury severity, 
              key risk factors, and personalized safety recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="gap-2 px-8 text-lg h-14">
                  <Car className="h-5 w-5" />
                  Start Prediction
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-lg h-14">
                  <BarChart2 className="h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="glass-card hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Severity Preview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Three Severity Levels</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our model predicts crash outcomes across three severity categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-severity-minor/50 bg-severity-minor/5">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🟢</div>
                <h3 className="text-xl font-bold text-severity-minor mb-2">Minor Injury</h3>
                <p className="text-sm text-muted-foreground">
                  Non-life-threatening injuries requiring minimal medical attention
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-severity-severe/50 bg-severity-severe/5">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🟡</div>
                <h3 className="text-xl font-bold text-severity-severe mb-2">Severe Injury</h3>
                <p className="text-sm text-muted-foreground">
                  Serious injuries requiring hospitalization and extended care
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-severity-fatal/50 bg-severity-fatal/5">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔴</div>
                <h3 className="text-xl font-bold text-severity-fatal mb-2">Fatal</h3>
                <p className="text-sm text-muted-foreground">
                  Life-threatening or fatal injuries with highest severity
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Analyze a Crash Scenario?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Enter crash parameters and receive instant severity predictions with actionable safety insights.
          </p>
          <Link to="/predict">
            <Button size="lg" className="gap-2">
              Start Prediction
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
