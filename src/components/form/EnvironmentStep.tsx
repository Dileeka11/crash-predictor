import { usePrediction } from '@/context/PredictionContext';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { TimeOfDay, TrafficDensity } from '@/types/prediction.types';
import { Sun, Sunset, Moon, Info, Users, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const timeOptions: { value: TimeOfDay; icon: typeof Sun; label: string; risk: string }[] = [
  { value: 'Morning', icon: Sun, label: 'Morning', risk: '6 AM - 12 PM' },
  { value: 'Afternoon', icon: Sunset, label: 'Afternoon', risk: '12 PM - 6 PM' },
  { value: 'Night', icon: Moon, label: 'Night', risk: '6 PM - 6 AM (3x more fatal)' },
];

const trafficOptions: { value: TrafficDensity; label: string; description: string }[] = [
  { value: 'Low', label: 'Low', description: 'Few vehicles, open roads' },
  { value: 'Medium', label: 'Medium', description: 'Moderate traffic flow' },
  { value: 'High', label: 'High', description: 'Heavy traffic, congestion' },
];

const EnvironmentStep = () => {
  const { formData, updateFormData } = usePrediction();

  const visibility = formData.visibility || 500;
  const getVisibilityLabel = () => {
    if (visibility < 100) return 'Very Poor';
    if (visibility < 300) return 'Limited';
    if (visibility < 500) return 'Moderate';
    return 'Good';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Time of Day */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Time of Day</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Night crashes are 3x more likely to be fatal</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {timeOptions.map(({ value, icon: Icon, label, risk }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateFormData({ timeOfDay: value })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                formData.timeOfDay === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50',
                value === 'Night' && formData.timeOfDay === value && 'border-severity-severe bg-severity-severe/10 text-severity-severe'
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium">{label}</span>
              <span className={cn(
                'text-xs text-center',
                value === 'Night' ? 'text-severity-severe' : 'text-muted-foreground'
              )}>
                {risk}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Traffic Density */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Traffic Density</Label>
        <div className="grid grid-cols-3 gap-3">
          {trafficOptions.map(({ value, label, description }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateFormData({ trafficDensity: value })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                formData.trafficDensity === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <div className="flex gap-0.5">
                {value === 'Low' && <Car className="h-6 w-6" />}
                {value === 'Medium' && (
                  <>
                    <Car className="h-5 w-5" />
                    <Car className="h-5 w-5" />
                  </>
                )}
                {value === 'High' && (
                  <>
                    <Car className="h-4 w-4" />
                    <Car className="h-4 w-4" />
                    <Car className="h-4 w-4" />
                  </>
                )}
              </div>
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground text-center">{description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visibility */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-base font-medium">Visibility</Label>
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              visibility < 100 && 'bg-destructive/20 text-destructive',
              visibility >= 100 && visibility < 300 && 'bg-severity-severe/20 text-severity-severe',
              visibility >= 300 && 'bg-severity-minor/20 text-severity-minor'
            )}>
              {getVisibilityLabel()}
            </span>
          </div>
          <span className="font-mono text-2xl font-bold text-primary">
            {visibility} <span className="text-sm font-normal text-muted-foreground">m</span>
          </span>
        </div>
        <Slider
          value={[visibility]}
          onValueChange={([value]) => updateFormData({ visibility: value })}
          min={0}
          max={1000}
          step={50}
          className={cn(
            visibility < 100 && '[&>span:first-child]:bg-destructive',
            visibility >= 100 && visibility < 300 && '[&>span:first-child]:bg-severity-severe'
          )}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0m (Fog)</span>
          <span>500m</span>
          <span>1000m (Clear)</span>
        </div>
        {visibility < 300 && (
          <div className="p-3 rounded-lg bg-severity-severe/20 text-severity-severe text-sm">
            Low visibility significantly increases crash risk. Reduce speed and increase following distance.
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="glass-card rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">Environmental Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Time</span>
            <p className="font-medium">{formData.timeOfDay}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Traffic</span>
            <p className="font-medium">{formData.trafficDensity}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Visibility</span>
            <p className="font-medium">{visibility}m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStep;
