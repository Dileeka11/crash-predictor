import { PredictionFormData, PredictionResult, SeverityLevel } from '@/types/prediction.types';

// Mock prediction API - simulates ML model response
export const predictSeverity = async (data: PredictionFormData): Promise<PredictionResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Calculate risk score based on input data
  let riskScore = 0;
  const riskFactors: { feature: string; impact: number }[] = [];

  // Speed factor (major impact)
  if (data.crashSpeed > 100) {
    riskScore += 35;
    riskFactors.push({ feature: 'High Crash Speed', impact: 0.35 });
  } else if (data.crashSpeed > 70) {
    riskScore += 20;
    riskFactors.push({ feature: 'Moderate Crash Speed', impact: 0.2 });
  } else if (data.crashSpeed > 40) {
    riskScore += 10;
    riskFactors.push({ feature: 'Crash Speed', impact: 0.1 });
  }

  // Safety equipment
  if (!data.seatbeltUsed) {
    riskScore += 25;
    riskFactors.push({ feature: 'No Seatbelt', impact: 0.25 });
  }
  if (!data.airbagDeployed) {
    riskScore += 15;
    riskFactors.push({ feature: 'Airbag Not Deployed', impact: 0.15 });
  }

  // Crash type
  if (data.crashType === 'Head-on') {
    riskScore += 20;
    riskFactors.push({ feature: 'Head-on Collision', impact: 0.2 });
  } else if (data.crashType === 'Rollover') {
    riskScore += 18;
    riskFactors.push({ feature: 'Rollover Crash', impact: 0.18 });
  } else if (data.crashType === 'Side') {
    riskScore += 12;
    riskFactors.push({ feature: 'Side Impact', impact: 0.12 });
  }

  // Vehicle type
  if (data.vehicleType === 'Motorcycle') {
    riskScore += 20;
    riskFactors.push({ feature: 'Motorcycle', impact: 0.2 });
  }

  // Weather conditions
  if (data.weatherCondition !== 'Clear') {
    riskScore += 8;
    riskFactors.push({ feature: `${data.weatherCondition} Weather`, impact: 0.08 });
  }

  // Road conditions
  if (data.roadCondition === 'Icy') {
    riskScore += 12;
    riskFactors.push({ feature: 'Icy Road', impact: 0.12 });
  } else if (data.roadCondition !== 'Dry') {
    riskScore += 6;
    riskFactors.push({ feature: `${data.roadCondition} Road`, impact: 0.06 });
  }

  // Alcohol
  if (data.alcoholLevel > 0.08) {
    riskScore += 25;
    riskFactors.push({ feature: 'Alcohol Above Legal Limit', impact: 0.25 });
  } else if (data.alcoholLevel > 0) {
    riskScore += 12;
    riskFactors.push({ feature: 'Alcohol Detected', impact: 0.12 });
  }

  // Visibility
  if (data.visibility < 100) {
    riskScore += 15;
    riskFactors.push({ feature: 'Very Low Visibility', impact: 0.15 });
  } else if (data.visibility < 300) {
    riskScore += 8;
    riskFactors.push({ feature: 'Limited Visibility', impact: 0.08 });
  }

  // Time of day
  if (data.timeOfDay === 'Night') {
    riskScore += 8;
    riskFactors.push({ feature: 'Night Time', impact: 0.08 });
  }

  // Impact angle
  if (data.impactAngle > 120) {
    riskScore += 10;
    riskFactors.push({ feature: 'Severe Impact Angle', impact: 0.1 });
  }

  // Driver experience
  if (data.drivingExperience < 2) {
    riskScore += 8;
    riskFactors.push({ feature: 'Inexperienced Driver', impact: 0.08 });
  }

  // Distraction
  if (data.distractionLevel !== 'None') {
    riskScore += 10;
    riskFactors.push({ feature: `Distraction: ${data.distractionLevel}`, impact: 0.1 });
  }

  // Vehicle condition
  if (data.brakeCondition === 'Worn out') {
    riskScore += 8;
    riskFactors.push({ feature: 'Worn Brakes', impact: 0.08 });
  }
  if (data.tireCondition === 'Worn out') {
    riskScore += 6;
    riskFactors.push({ feature: 'Worn Tires', impact: 0.06 });
  }

  // Determine severity
  let severity: SeverityLevel;
  let confidence: number;

  if (riskScore >= 70) {
    severity = 'Fatal';
    confidence = Math.min(0.95, 0.75 + (riskScore - 70) / 100);
  } else if (riskScore >= 40) {
    severity = 'Severe Injury';
    confidence = Math.min(0.92, 0.7 + (riskScore - 40) / 100);
  } else {
    severity = 'Minor Injury';
    confidence = Math.max(0.65, 0.85 - riskScore / 100);
  }

  // Sort risk factors by impact and take top 3
  const topRiskFactors = riskFactors
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3);

  // Generate recommendations based on risk factors
  const recommendations = generateRecommendations(data, topRiskFactors);

  return {
    severity,
    confidence: Math.round(confidence * 100) / 100,
    riskFactors: topRiskFactors,
    recommendations,
  };
};

const generateRecommendations = (
  data: PredictionFormData,
  riskFactors: { feature: string; impact: number }[]
): string[] => {
  const recommendations: string[] = [];

  if (data.crashSpeed > 70) {
    recommendations.push('High speed significantly increased crash severity. Reducing speed by 20 km/h could have reduced injury risk by up to 40%.');
  }

  if (!data.seatbeltUsed) {
    recommendations.push('Seatbelt usage reduces fatality risk by 45%. Always ensure all occupants are buckled.');
  }

  if (data.vehicleType === 'Motorcycle') {
    recommendations.push('Motorcyclists are 28x more likely to die in crashes. Consider wearing full protective gear and a DOT-approved helmet.');
  }

  if (data.alcoholLevel > 0) {
    recommendations.push('Any alcohol impairs driving ability. At 0.08% BAC, crash risk is 11x higher than sober driving.');
  }

  if (data.weatherCondition !== 'Clear' || data.roadCondition !== 'Dry') {
    recommendations.push('Adverse conditions require 50% more stopping distance. Reduce speed and increase following distance.');
  }

  if (data.timeOfDay === 'Night') {
    recommendations.push('Night crashes are 3x more fatal. Ensure headlights are functioning and consider high-visibility equipment.');
  }

  if (data.distractionLevel !== 'None') {
    recommendations.push('Distracted driving increases crash risk by 4x. Put phones away and take breaks if drowsy.');
  }

  // Add general recommendation if we don't have enough specific ones
  if (recommendations.length < 2) {
    recommendations.push('Regular vehicle maintenance and defensive driving techniques can reduce overall crash risk by up to 30%.');
  }

  return recommendations.slice(0, 4);
};
