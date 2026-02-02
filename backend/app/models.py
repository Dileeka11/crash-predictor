from pydantic import BaseModel, Field
from typing import Literal, List
from enum import Enum


class WeatherCondition(str, Enum):
    CLEAR = "Clear"
    RAIN = "Rain"
    FOG = "Fog"
    SNOW = "Snow"


class RoadCondition(str, Enum):
    DRY = "Dry"
    WET = "Wet"
    ICY = "Icy"
    UNEVEN = "Uneven"


class CrashType(str, Enum):
    HEAD_ON = "Head-on"
    SIDE = "Side"
    REAR_END = "Rear-end"
    ROLLOVER = "Rollover"


class VehicleType(str, Enum):
    SEDAN = "Sedan"
    SUV = "SUV"
    TRUCK = "Truck"
    MOTORCYCLE = "Motorcycle"


class BrakeCondition(str, Enum):
    GOOD = "Good"
    WORN_OUT = "Worn out"


class TireCondition(str, Enum):
    GOOD = "Good"
    WORN_OUT = "Worn out"


class DistractionLevel(str, Enum):
    NONE = "None"
    PHONE = "Phone"
    DROWSINESS = "Drowsiness"
    OTHER = "Other"


class TimeOfDay(str, Enum):
    MORNING = "Morning"
    AFTERNOON = "Afternoon"
    NIGHT = "Night"


class TrafficDensity(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class PredictionRequest(BaseModel):
    crashSpeed: float = Field(..., ge=0, le=200, description="Crash speed in km/h")
    impactAngle: float = Field(..., ge=0, le=180, description="Impact angle in degrees")
    airbagDeployed: bool = Field(..., description="Whether airbag was deployed")
    seatbeltUsed: bool = Field(..., description="Whether seatbelt was used")
    weatherCondition: WeatherCondition
    roadCondition: RoadCondition
    crashType: CrashType
    vehicleType: VehicleType
    vehicleAge: int = Field(..., ge=0, le=30, description="Vehicle age in years")
    brakeCondition: BrakeCondition
    tireCondition: TireCondition
    driverAge: int = Field(..., ge=16, le=100, description="Driver age in years")
    drivingExperience: int = Field(..., ge=0, description="Driving experience in years")
    alcoholLevel: float = Field(..., ge=0, le=0.4, description="Blood alcohol content")
    distractionLevel: DistractionLevel
    timeOfDay: TimeOfDay
    trafficDensity: TrafficDensity
    visibility: float = Field(..., ge=0, le=1000, description="Visibility in meters")

    class Config:
        json_schema_extra = {
            "example": {
                "crashSpeed": 60,
                "impactAngle": 45,
                "airbagDeployed": True,
                "seatbeltUsed": True,
                "weatherCondition": "Clear",
                "roadCondition": "Dry",
                "crashType": "Rear-end",
                "vehicleType": "Sedan",
                "vehicleAge": 5,
                "brakeCondition": "Good",
                "tireCondition": "Good",
                "driverAge": 35,
                "drivingExperience": 10,
                "alcoholLevel": 0.0,
                "distractionLevel": "None",
                "timeOfDay": "Morning",
                "trafficDensity": "Medium",
                "visibility": 500
            }
        }


class RiskFactor(BaseModel):
    feature: str
    impact: float


class PredictionResponse(BaseModel):
    severity: Literal["Minor Injury", "Severe Injury", "Fatal"]
    confidence: float
    riskFactors: List[RiskFactor]
    recommendations: List[str]
