import { useNavigate } from 'react-router-dom';
import { usePrediction } from '@/context/PredictionContext';
import { predictSeverity } from '@/utils/api';
import { PredictionFormData } from '@/types/prediction.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StepIndicator from '@/components/form/StepIndicator';
import RiskIndicator from '@/components/form/RiskIndicator';
import CrashDetailsStep from '@/components/form/CrashDetailsStep';
import VehicleInfoStep from '@/components/form/VehicleInfoStep';
import DriverInfoStep from '@/components/form/DriverInfoStep';
import EnvironmentStep from '@/components/form/EnvironmentStep';
import { ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const TOTAL_STEPS = 4;

const PredictionForm = () => {
  const navigate = useNavigate();
  const { formData, currentStep, setCurrentStep, setResult, isLoading, setIsLoading } = usePrediction();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await predictSeverity(formData as PredictionFormData);
      setResult(result);
      navigate('/results');
    } catch (error) {
      console.error('Prediction failed:', error);
      toast.error('Prediction failed. Please ensure the backend server is running on http://localhost:8000');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CrashDetailsStep />;
      case 2:
        return <VehicleInfoStep />;
      case 3:
        return <DriverInfoStep />;
      case 4:
        return <EnvironmentStep />;
      default:
        return <CrashDetailsStep />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Crash Severity Prediction</h1>
          <p className="text-muted-foreground">
            Enter crash details to predict injury severity and get safety recommendations
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Risk Indicator */}
        <div className="my-6">
          <RiskIndicator />
        </div>

        {/* Form Content */}
        <Card className="glass-card">
          <CardContent className="p-6 md:p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="gap-2 min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Get Prediction
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionForm;
