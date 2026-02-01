export type SeverityLevel = 'Minor Injury' | 'Severe Injury' | 'Fatal';

export type WeatherCondition = 'Clear' | 'Rain' | 'Fog' | 'Snow';
export type RoadCondition = 'Dry' | 'Wet' | 'Icy' | 'Uneven';
export type CrashType = 'Head-on' | 'Side' | 'Rear-end' | 'Rollover';
export type VehicleType = 'Sedan' | 'SUV' | 'Truck' | 'Motorcycle';
export type BrakeCondition = 'Good' | 'Worn out';
export type TireCondition = 'Good' | 'Worn out';
export type DistractionLevel = 'None' | 'Phone' | 'Drowsiness' | 'Other';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Night';
export type TrafficDensity = 'Low' | 'Medium' | 'High';

export interface CrashDetailsData {
  crashSpeed: number;
  impactAngle: number;
  airbagDeployed: boolean;
  seatbeltUsed: boolean;
  weatherCondition: WeatherCondition;
  roadCondition: RoadCondition;
  crashType: CrashType;
}

export interface VehicleInfoData {
  vehicleType: VehicleType;
  vehicleAge: number;
  brakeCondition: BrakeCondition;
  tireCondition: TireCondition;
}

export interface DriverInfoData {
  driverAge: number;
  drivingExperience: number;
  alcoholLevel: number;
  distractionLevel: DistractionLevel;
}

export interface EnvironmentData {
  timeOfDay: TimeOfDay;
  trafficDensity: TrafficDensity;
  visibility: number;
}

export interface PredictionFormData extends CrashDetailsData, VehicleInfoData, DriverInfoData, EnvironmentData {}

export interface RiskFactor {
  feature: string;
  impact: number;
}

export interface PredictionResult {
  severity: SeverityLevel;
  confidence: number;
  riskFactors: RiskFactor[];
  recommendations: string[];
}
