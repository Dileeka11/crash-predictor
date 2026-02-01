import { usePrediction } from '@/context/PredictionContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { VehicleType, BrakeCondition, TireCondition } from '@/types/prediction.types';
import { Car, Truck, Bike, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const vehicleTypes: { type: VehicleType; icon: typeof Car; label: string; risk: string }[] = [
  { type: 'Sedan', icon: Car, label: 'Sedan', risk: 'Moderate protection' },
  { type: 'SUV', icon: Truck, label: 'SUV', risk: 'Better protection' },
  { type: 'Truck', icon: Truck, label: 'Truck', risk: 'High protection' },
  { type: 'Motorcycle', icon: Bike, label: 'Motorcycle', risk: '28x higher fatality risk' },
];

const VehicleInfoStep = () => {
  const { formData, updateFormData } = usePrediction();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Vehicle Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Vehicle Type</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Vehicle type significantly affects crash survival rates</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vehicleTypes.map(({ type, icon: Icon, label, risk }) => (
            <button
              key={type}
              type="button"
              onClick={() => updateFormData({ vehicleType: type })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                formData.vehicleType === type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50',
                type === 'Motorcycle' && formData.vehicleType === type && 'border-destructive bg-destructive/10 text-destructive'
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium">{label}</span>
              <span className={cn(
                'text-xs',
                type === 'Motorcycle' ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {risk}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Age */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="vehicleAge" className="text-base font-medium">Vehicle Age</Label>
          <span className="font-mono text-lg font-bold text-primary">
            {formData.vehicleAge} <span className="text-sm font-normal text-muted-foreground">years</span>
          </span>
        </div>
        <Input
          id="vehicleAge"
          type="number"
          min={0}
          max={30}
          value={formData.vehicleAge || 0}
          onChange={(e) => updateFormData({ vehicleAge: Math.min(30, Math.max(0, parseInt(e.target.value) || 0)) })}
          className="text-lg"
        />
        <p className="text-xs text-muted-foreground">
          Newer vehicles have better safety features and crash protection
        </p>
      </div>

      {/* Brake Condition */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Brake Condition</Label>
        <RadioGroup
          value={formData.brakeCondition}
          onValueChange={(value: BrakeCondition) => updateFormData({ brakeCondition: value })}
          className="grid grid-cols-2 gap-4"
        >
          <div className={cn(
            'flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
            formData.brakeCondition === 'Good'
              ? 'border-severity-minor bg-severity-minor/10'
              : 'border-border hover:border-primary/50'
          )}>
            <RadioGroupItem value="Good" id="brake-good" />
            <Label htmlFor="brake-good" className="cursor-pointer flex-1">
              <span className="font-medium">Good</span>
              <p className="text-xs text-muted-foreground mt-1">Responsive, well-maintained</p>
            </Label>
          </div>
          <div className={cn(
            'flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
            formData.brakeCondition === 'Worn out'
              ? 'border-severity-severe bg-severity-severe/10'
              : 'border-border hover:border-primary/50'
          )}>
            <RadioGroupItem value="Worn out" id="brake-worn" />
            <Label htmlFor="brake-worn" className="cursor-pointer flex-1">
              <span className="font-medium">Worn Out</span>
              <p className="text-xs text-muted-foreground mt-1">Increased stopping distance</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Tire Condition */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Tire Condition</Label>
        <RadioGroup
          value={formData.tireCondition}
          onValueChange={(value: TireCondition) => updateFormData({ tireCondition: value })}
          className="grid grid-cols-2 gap-4"
        >
          <div className={cn(
            'flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
            formData.tireCondition === 'Good'
              ? 'border-severity-minor bg-severity-minor/10'
              : 'border-border hover:border-primary/50'
          )}>
            <RadioGroupItem value="Good" id="tire-good" />
            <Label htmlFor="tire-good" className="cursor-pointer flex-1">
              <span className="font-medium">Good</span>
              <p className="text-xs text-muted-foreground mt-1">Proper tread depth, good grip</p>
            </Label>
          </div>
          <div className={cn(
            'flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
            formData.tireCondition === 'Worn out'
              ? 'border-severity-severe bg-severity-severe/10'
              : 'border-border hover:border-primary/50'
          )}>
            <RadioGroupItem value="Worn out" id="tire-worn" />
            <Label htmlFor="tire-worn" className="cursor-pointer flex-1">
              <span className="font-medium">Worn Out</span>
              <p className="text-xs text-muted-foreground mt-1">Reduced traction, longer stops</p>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default VehicleInfoStep;
