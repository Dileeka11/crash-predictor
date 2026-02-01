import { AlertTriangle, Shield, Skull } from 'lucide-react';
import { usePrediction } from '@/context/PredictionContext';
import { cn } from '@/lib/utils';

const RiskIndicator = () => {
  const { formData } = usePrediction();

  // Calculate real-time risk level based on current form data
  let riskScore = 0;
  const warnings: string[] = [];

  if (formData.crashSpeed && formData.crashSpeed > 100) {
    riskScore += 30;
    warnings.push('High speed detected');
  } else if (formData.crashSpeed && formData.crashSpeed > 70) {
    riskScore += 15;
  }

  if (formData.seatbeltUsed === false) {
    riskScore += 25;
    warnings.push('No seatbelt');
  }

  if (formData.airbagDeployed === false) {
    riskScore += 15;
  }

  if (formData.vehicleType === 'Motorcycle') {
    riskScore += 20;
    warnings.push('Motorcycle crash');
  }

  if (formData.alcoholLevel && formData.alcoholLevel > 0.08) {
    riskScore += 25;
    warnings.push('Alcohol above limit');
  } else if (formData.alcoholLevel && formData.alcoholLevel > 0) {
    riskScore += 10;
  }

  if (formData.crashType === 'Head-on' || formData.crashType === 'Rollover') {
    riskScore += 15;
  }

  if (formData.weatherCondition && formData.weatherCondition !== 'Clear') {
    riskScore += 5;
  }

  if (formData.roadCondition === 'Icy') {
    riskScore += 10;
  }

  // Determine risk level
  let level: 'low' | 'medium' | 'high' = 'low';
  let Icon = Shield;
  let label = 'Low Risk';

  if (riskScore >= 60) {
    level = 'high';
    Icon = Skull;
    label = 'High Risk';
  } else if (riskScore >= 30) {
    level = 'medium';
    Icon = AlertTriangle;
    label = 'Medium Risk';
  }

  return (
    <div className="glass-card rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">Risk Assessment</span>
        <div
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
            level === 'low' && 'bg-severity-minor/20 text-severity-minor',
            level === 'medium' && 'bg-severity-severe/20 text-severity-severe',
            level === 'high' && 'bg-severity-fatal/20 text-severity-fatal'
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
      </div>

      {/* Risk bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full risk-gradient transition-all duration-500 ease-out"
          style={{ width: `${Math.min(riskScore, 100)}%` }}
        />
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {warnings.map((warning) => (
            <span
              key={warning}
              className="px-2 py-0.5 rounded text-xs bg-destructive/20 text-destructive"
            >
              {warning}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskIndicator;
