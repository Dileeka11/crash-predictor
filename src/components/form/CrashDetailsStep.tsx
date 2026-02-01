import { usePrediction } from '@/context/PredictionContext';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CrashType, WeatherCondition, RoadCondition } from '@/types/prediction.types';
import { Car, ArrowUp, RotateCcw, ArrowLeftRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const crashTypes: { type: CrashType; icon: typeof Car; label: string }[] = [
  { type: 'Head-on', icon: ArrowUp, label: 'Head-on' },
  { type: 'Side', icon: ArrowLeftRight, label: 'Side' },
  { type: 'Rear-end', icon: Car, label: 'Rear-end' },
  { type: 'Rollover', icon: RotateCcw, label: 'Rollover' },
];

const weatherConditions: WeatherCondition[] = ['Clear', 'Rain', 'Fog', 'Snow'];
const roadConditions: RoadCondition[] = ['Dry', 'Wet', 'Icy', 'Uneven'];

const CrashDetailsStep = () => {
  const { formData, updateFormData } = usePrediction();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Crash Speed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Crash Speed</Label>
          <span className="font-mono text-2xl font-bold text-primary">
            {formData.crashSpeed} <span className="text-sm font-normal text-muted-foreground">km/h</span>
          </span>
        </div>
        <Slider
          value={[formData.crashSpeed || 60]}
          onValueChange={([value]) => updateFormData({ crashSpeed: value })}
          min={0}
          max={200}
          step={5}
          className={cn(
            formData.crashSpeed && formData.crashSpeed > 100 && '[&>span:first-child]:bg-destructive',
            formData.crashSpeed && formData.crashSpeed > 70 && formData.crashSpeed <= 100 && '[&>span:first-child]:bg-severity-severe'
          )}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 km/h</span>
          <span>100 km/h</span>
          <span>200 km/h</span>
        </div>
      </div>

      {/* Impact Angle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-base font-medium">Impact Angle</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>0° = Direct front, 90° = Side, 180° = Rear</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="font-mono text-2xl font-bold text-primary">
            {formData.impactAngle}°
          </span>
        </div>
        <Slider
          value={[formData.impactAngle || 45]}
          onValueChange={([value]) => updateFormData({ impactAngle: value })}
          min={0}
          max={180}
          step={5}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Front (0°)</span>
          <span>Side (90°)</span>
          <span>Rear (180°)</span>
        </div>
      </div>

      {/* Safety Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card rounded-lg p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label htmlFor="airbag" className="text-base font-medium cursor-pointer">
              Airbag Deployed
            </Label>
            <span className="text-xs text-muted-foreground">Was airbag activated?</span>
          </div>
          <Switch
            id="airbag"
            checked={formData.airbagDeployed}
            onCheckedChange={(checked) => updateFormData({ airbagDeployed: checked })}
          />
        </div>

        <div className="glass-card rounded-lg p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="seatbelt" className="text-base font-medium cursor-pointer">
                Seatbelt Used
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seatbelts reduce fatality risk by 45%</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-xs text-muted-foreground">Was seatbelt worn?</span>
          </div>
          <Switch
            id="seatbelt"
            checked={formData.seatbeltUsed}
            onCheckedChange={(checked) => updateFormData({ seatbeltUsed: checked })}
          />
        </div>
      </div>

      {/* Weather & Road Conditions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-base font-medium">Weather Conditions</Label>
          <Select
            value={formData.weatherCondition}
            onValueChange={(value: WeatherCondition) => updateFormData({ weatherCondition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select weather" />
            </SelectTrigger>
            <SelectContent>
              {weatherConditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Road Conditions</Label>
          <Select
            value={formData.roadCondition}
            onValueChange={(value: RoadCondition) => updateFormData({ roadCondition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select road condition" />
            </SelectTrigger>
            <SelectContent>
              {roadConditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Crash Type */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Crash Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {crashTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => updateFormData({ crashType: type })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                formData.crashType === type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrashDetailsStep;
