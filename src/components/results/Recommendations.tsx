import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-severity-severe" />
          Safety Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
