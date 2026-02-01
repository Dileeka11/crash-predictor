import { Check, Car, Truck, User, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { label: 'Crash Details', icon: Car },
  { label: 'Vehicle Info', icon: Truck },
  { label: 'Driver Info', icon: User },
  { label: 'Environment', icon: Cloud },
];

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-primary/20 text-primary animate-pulse-glow',
                    !isCompleted && !isCurrent && 'border-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium hidden sm:block',
                    isCurrent && 'text-primary',
                    !isCurrent && !isCompleted && 'text-muted-foreground',
                    isCompleted && 'text-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors duration-300',
                    stepNumber < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
