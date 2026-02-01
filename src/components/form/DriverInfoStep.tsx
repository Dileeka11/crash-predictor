import { usePrediction } from '@/context/PredictionContext';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DistractionLevel } from '@/types/prediction.types';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const distractionLevels: DistractionLevel[] = ['None', 'Phone', 'Drowsiness', 'Other'];

const DriverInfoStep = () => {
  const { formData, updateFormData } = usePrediction();

  // Calculate max experience based on driver age
  const maxExperience = Math.max(0, (formData.driverAge || 16) - 16);

  // Ensure experience doesn't exceed max when age changes
  const handleAgeChange = (age: number) => {
    const clampedAge = Math.min(100, Math.max(16, age));
    const maxExp = clampedAge - 16;
    updateFormData({
      driverAge: clampedAge,
      drivingExperience: Math.min(formData.drivingExperience || 0, maxExp),
    });
  };

  const alcoholLevel = formData.alcoholLevel || 0;
  const isOverLimit = alcoholLevel >= 0.08;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Driver Age */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="driverAge" className="text-base font-medium">Driver Age</Label>
          <span className="font-mono text-lg font-bold text-primary">
            {formData.driverAge} <span className="text-sm font-normal text-muted-foreground">years</span>
          </span>
        </div>
        <Input
          id="driverAge"
          type="number"
          min={16}
          max={100}
          value={formData.driverAge || 35}
          onChange={(e) => handleAgeChange(parseInt(e.target.value) || 16)}
          className="text-lg"
        />
      </div>

      {/* Driving Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-base font-medium">Driving Experience</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>New drivers (under 2 years) have higher crash rates</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="font-mono text-2xl font-bold text-primary">
            {formData.drivingExperience} <span className="text-sm font-normal text-muted-foreground">years</span>
          </span>
        </div>
        <Slider
          value={[formData.drivingExperience || 0]}
          onValueChange={([value]) => updateFormData({ drivingExperience: value })}
          min={0}
          max={maxExperience}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Beginner (0)</span>
          <span>Max: {maxExperience} years</span>
        </div>
      </div>

      {/* Alcohol Level (BAC) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-base font-medium">Blood Alcohol Content (BAC)</Label>
            {isOverLimit && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-destructive text-destructive-foreground font-semibold">
                <AlertTriangle className="h-3 w-3" />
                Over Legal Limit
              </span>
            )}
          </div>
          <span className={cn(
            'font-mono text-2xl font-bold',
            isOverLimit ? 'text-destructive' : alcoholLevel > 0 ? 'text-severity-severe' : 'text-primary'
          )}>
            {alcoholLevel.toFixed(2)}%
          </span>
        </div>
        <div className="relative">
          <Slider
            value={[alcoholLevel * 250]}
            onValueChange={([value]) => updateFormData({ alcoholLevel: value / 250 })}
            min={0}
            max={100}
            step={1}
            className={cn(
              isOverLimit && '[&>span:first-child]:bg-destructive',
              !isOverLimit && alcoholLevel > 0 && '[&>span:first-child]:bg-severity-severe'
            )}
          />
          {/* Legal limit marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-destructive"
            style={{ left: `${(0.08 / 0.4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Sober (0%)</span>
          <span className="text-destructive">Legal limit (0.08%)</span>
          <span>0.40%</span>
        </div>
        {alcoholLevel > 0 && (
          <div className={cn(
            'p-3 rounded-lg text-sm',
            isOverLimit ? 'bg-destructive/20 text-destructive' : 'bg-severity-severe/20 text-severity-severe'
          )}>
            {isOverLimit
              ? 'At 0.08% BAC, crash risk is 11x higher than sober driving. This is above the legal limit.'
              : 'Even small amounts of alcohol impair judgment and reaction time.'}
          </div>
        )}
      </div>

      {/* Distraction Level */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Distraction Level</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Distracted driving increases crash risk by 4x</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select
          value={formData.distractionLevel}
          onValueChange={(value: DistractionLevel) => updateFormData({ distractionLevel: value })}
        >
          <SelectTrigger className="text-base">
            <SelectValue placeholder="Select distraction level" />
          </SelectTrigger>
          <SelectContent>
            {distractionLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level === 'None' ? 'None (Fully attentive)' : level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formData.distractionLevel && formData.distractionLevel !== 'None' && (
          <div className="p-3 rounded-lg bg-severity-severe/20 text-severity-severe text-sm">
            <strong>{formData.distractionLevel}</strong> was a factor. Distraction significantly reduces reaction time.
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverInfoStep;
