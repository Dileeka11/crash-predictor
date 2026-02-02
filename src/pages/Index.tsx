import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, BarChart2, Zap, Info, AlertTriangle, ChevronRight, Activity } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safety Insights',
    description: 'Understand crash patterns and key safety learnings from historical data.',
  },
  {
    icon: BarChart2,
    title: 'Risk Analysis',
    description: 'Identify influential factors that drive crash severity outcomes.',
  },
  {
    icon: Zap,
    title: 'Interactive Dashboard',
    description: 'Explore curated visuals and summaries without running predictions.',
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
              Crash Safety <span className="text-primary">Insights</span>{' '}
              &amp; Analysis Hub
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Explore curated crash data insights, severity patterns, and safety learnings without running prediction forms.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="gap-2 px-8 text-lg h-14">
                  <Activity className="h-5 w-5" />
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
              <Link to="/about">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-lg h-14">
                  <Info className="h-5 w-5" />
                  Learn More
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Explore the Crash Insights Dashboard</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse curated visuals, safety takeaways, and data-backed summaries.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              Open Dashboard
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
