import { PredictionFormData, PredictionResult } from '@/types/prediction.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const predictSeverity = async (data: PredictionFormData): Promise<PredictionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result: PredictionResult = await response.json();
    return result;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

export const checkHealth = async (): Promise<{ status: string; model_loaded: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};
