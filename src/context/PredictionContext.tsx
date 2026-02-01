import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PredictionFormData, PredictionResult } from '@/types/prediction.types';

interface PredictionContextType {
  formData: Partial<PredictionFormData>;
  setFormData: (data: Partial<PredictionFormData>) => void;
  updateFormData: (data: Partial<PredictionFormData>) => void;
  result: PredictionResult | null;
  setResult: (result: PredictionResult | null) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  resetForm: () => void;
}

const defaultFormData: Partial<PredictionFormData> = {
  crashSpeed: 60,
  impactAngle: 45,
  airbagDeployed: true,
  seatbeltUsed: true,
  weatherCondition: 'Clear',
  roadCondition: 'Dry',
  crashType: 'Rear-end',
  vehicleType: 'Sedan',
  vehicleAge: 5,
  brakeCondition: 'Good',
  tireCondition: 'Good',
  driverAge: 35,
  drivingExperience: 10,
  alcoholLevel: 0,
  distractionLevel: 'None',
  timeOfDay: 'Morning',
  trafficDensity: 'Medium',
  visibility: 500,
};

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const PredictionProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<Partial<PredictionFormData>>(defaultFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (data: Partial<PredictionFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <PredictionContext.Provider
      value={{
        formData,
        setFormData,
        updateFormData,
        result,
        setResult,
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
        resetForm,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
};
