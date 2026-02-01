import { SeverityLevel } from '@/types/prediction.types';
import { Shield, AlertTriangle, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface SeverityCardProps {
  severity: SeverityLevel;
  confidence: number;
}

const severityConfig = {
  'Minor Injury': {
    icon: Shield,
    emoji: '🟢',
    gradient: 'from-severity-minor/20 to-severity-minor/5',
    border: 'border-severity-minor',
    text: 'text-severity-minor',
    progressColor: 'bg-severity-minor',
    description: 'The predicted injuries are likely to be minor and non-life-threatening.',
  },
  'Severe Injury': {
    icon: AlertTriangle,
    emoji: '🟡',
    gradient: 'from-severity-severe/20 to-severity-severe/5',
    border: 'border-severity-severe',
    text: 'text-severity-severe',
    progressColor: 'bg-severity-severe',
    description: 'The crash conditions indicate potential for serious injuries requiring medical attention.',
  },
  'Fatal': {
    icon: Skull,
    emoji: '🔴',
    gradient: 'from-severity-fatal/20 to-severity-fatal/5',
    border: 'border-severity-fatal',
    text: 'text-severity-fatal',
    progressColor: 'bg-severity-fatal',
    description: 'The crash parameters suggest a high likelihood of life-threatening or fatal injuries.',
  },
};

const SeverityCard = ({ severity, confidence }: SeverityCardProps) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 animate-slide-up',
        config.border,
        `bg-gradient-to-br ${config.gradient}`
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <Icon className="w-full h-full" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className={cn('p-4 rounded-xl', config.text, 'bg-card/50')}>
            <Icon className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Predicted Severity</p>
            <h2 className={cn('text-3xl md:text-4xl font-bold', config.text)}>
              {config.emoji} {severity}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          {config.description}
        </p>

        {/* Confidence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Model Confidence</span>
            <span className={cn('text-2xl font-mono font-bold', config.text)}>
              {Math.round(confidence * 100)}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-1000', config.progressColor)}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeverityCard;
