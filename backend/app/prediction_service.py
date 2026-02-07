import os
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier
from typing import List, Dict, Tuple
from .models import PredictionRequest, PredictionResponse, RiskFactor


class PredictionService:
    def __init__(self):
        self.model = None
        self.model_classes: List[str] | None = None
        # Match feature order from train_model_template.py: Numerical + Categorical
        self.feature_names = [
            # Numerical
            'Crash Speed (km/h)',
            'Impact Angle (degrees)',
            'Vehicle Age (years)',
            'Driver Age',
            'Driver Experience (years)',
            'Alcohol Level (BAC%)',
            'Visibility Distance (m)',
            # Categorical
            'Airbag Deployed', # Now 'Yes'/'No'
            'Seatbelt Used',   # Now 'Yes'/'No'
            'Weather Conditions',
            'Road Conditions',
            'Crash Type',
            'Vehicle Type',
            'Brake Condition',
            'Tire Condition',
            'Distraction Level',
            'Time of Day',
            'Traffic Density'
        ]
        
        # Encoding mappings for categorical features
        # Encoding mappings for categorical features aligned with Alphabetical Order (LabelEncoder default)
        self.weather_encoding = {'Clear': 0, 'Fog': 1, 'Rain': 2, 'Snow': 3}
        self.road_encoding = {'Dry': 0, 'Icy': 1, 'Uneven': 2, 'Wet': 3}
        self.crash_type_encoding = {'Head-on': 0, 'Rear-end': 1, 'Rollover': 2, 'Side': 3}
        self.vehicle_type_encoding = {'Motorcycle': 0, 'Sedan': 1, 'SUV': 2, 'Truck': 3}
        self.brake_encoding = {'Good': 0, 'Worn out': 1}
        self.tire_encoding = {'Good': 0, 'Worn out': 1}
        self.distraction_encoding = {'Drowsiness': 0, 'None': 1, 'Other': 2, 'Phone': 3}
        self.time_encoding = {'Afternoon': 0, 'Morning': 1, 'Night': 2}
        self.traffic_encoding = {'High': 0, 'Low': 1, 'Medium': 2}
        
        self.severity_labels = ["Fatal", "Minor Injury", "Severe Injury"]
        self._load_model()

    def _load_model(self):
        model_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "ml_models",
            "catboost_model.cbm"
        )
        if os.path.exists(model_path):
            self.model = CatBoostClassifier()
            self.model.load_model(model_path)
            # Capture the class order used during training to align probabilities correctly
            if hasattr(self.model, "classes_"):
                self.model_classes = list(self.model.classes_)
            
            # Check for categorical features in the loaded model
            try:
                cat_indices = self.model.get_cat_feature_indices()
                self.has_cat_features = len(cat_indices) > 0
                print(f"Model loaded. Categorical features detected: {self.has_cat_features}")
            except:
                self.has_cat_features = False
                print("Model loaded. No categorical features detected (legacy mode).")
                
            print(f"Model loaded successfully from {model_path}")
        else:
            print(f"Warning: Model file not found at {model_path}")
            self.model = None
            self.has_cat_features = False

    def _preprocess_input(self, data: PredictionRequest) -> pd.DataFrame:
        if self.has_cat_features:
            # New Model: Pass raw strings for categorical features
            features_dict = {
                'Crash Speed (km/h)': [data.crashSpeed],
                'Impact Angle (degrees)': [data.impactAngle],
                'Vehicle Age (years)': [data.vehicleAge],
                'Driver Age': [data.driverAge],
                'Driver Experience (years)': [data.drivingExperience],
                'Alcohol Level (BAC%)': [data.alcoholLevel],
                'Visibility Distance (m)': [data.visibility],
                'Airbag Deployed': ["Yes" if data.airbagDeployed else "No"],
                'Seatbelt Used': ["Yes" if data.seatbeltUsed else "No"],
                'Weather Conditions': [data.weatherCondition.value],
                'Road Conditions': [data.roadCondition.value],
                'Crash Type': [data.crashType.value],
                'Vehicle Type': [data.vehicleType.value],
                'Brake Condition': [data.brakeCondition.value],
                'Tire Condition': [data.tireCondition.value],
                'Distraction Level': [data.distractionLevel.value],
                'Time of Day': [data.timeOfDay.value],
                'Traffic Density': [data.trafficDensity.value]
            }
            # Enforce column order to match training
            return pd.DataFrame(features_dict)[self.feature_names]
        else:
            # Legacy Model: Use integer encoding
            features_dict = {
                'Crash Speed (km/h)': [data.crashSpeed],
                'Impact Angle (degrees)': [data.impactAngle],
                'Airbag Deployed': [1 if data.airbagDeployed else 0],
                'Seatbelt Used': [1 if data.seatbeltUsed else 0],
                'Weather Conditions': [self.weather_encoding.get(data.weatherCondition.value, 0)],
                'Road Conditions': [self.road_encoding.get(data.roadCondition.value, 0)],
                'Crash Type': [self.crash_type_encoding.get(data.crashType.value, 0)],
                'Vehicle Type': [self.vehicle_type_encoding.get(data.vehicleType.value, 0)],
                'Vehicle Age (years)': [data.vehicleAge],
                'Brake Condition': [self.brake_encoding.get(data.brakeCondition.value, 0)],
                'Tire Condition': [self.tire_encoding.get(data.tireCondition.value, 0)],
                'Driver Age': [data.driverAge],
                'Driver Experience (years)': [data.drivingExperience],
                'Alcohol Level (BAC%)': [data.alcoholLevel],
                'Distraction Level': [self.distraction_encoding.get(data.distractionLevel.value, 0)],
                'Time of Day': [self.time_encoding.get(data.timeOfDay.value, 0)],
                'Traffic Density': [self.traffic_encoding.get(data.trafficDensity.value, 0)],
                'Visibility Distance (m)': [data.visibility]
            }
            return pd.DataFrame(features_dict)

    def _calculate_risk_factors(self, data: PredictionRequest) -> List[RiskFactor]:
        risk_factors = []

        # Speed risk
        if data.crashSpeed > 100:
            risk_factors.append(RiskFactor(feature="High Crash Speed", impact=0.35))
        elif data.crashSpeed > 70:
            risk_factors.append(RiskFactor(feature="Moderate Crash Speed", impact=0.20))
        elif data.crashSpeed > 40:
            risk_factors.append(RiskFactor(feature="Crash Speed", impact=0.10))

        # Safety equipment
        if not data.seatbeltUsed:
            risk_factors.append(RiskFactor(feature="No Seatbelt", impact=0.25))
        if not data.airbagDeployed:
            risk_factors.append(RiskFactor(feature="Airbag Not Deployed", impact=0.15))

        # Crash type
        crash_type_impacts = {
            "Head-on": ("Head-on Collision", 0.20),
            "Rollover": ("Rollover Crash", 0.18),
            "Side": ("Side Impact", 0.12),
            "Rear-end": ("Rear-end Collision", 0.08)
        }
        if data.crashType.value in crash_type_impacts:
            name, impact = crash_type_impacts[data.crashType.value]
            risk_factors.append(RiskFactor(feature=name, impact=impact))

        # Vehicle type
        if data.vehicleType.value == "Motorcycle":
            risk_factors.append(RiskFactor(feature="Motorcycle", impact=0.20))

        # Weather conditions
        if data.weatherCondition.value != "Clear":
            risk_factors.append(RiskFactor(
                feature=f"{data.weatherCondition.value} Weather",
                impact=0.08
            ))

        # Road conditions
        road_impacts = {"Icy": 0.12, "Wet": 0.06, "Uneven": 0.06}
        if data.roadCondition.value in road_impacts:
            risk_factors.append(RiskFactor(
                feature=f"{data.roadCondition.value} Road",
                impact=road_impacts[data.roadCondition.value]
            ))

        # Alcohol
        if data.alcoholLevel > 0.08:
            risk_factors.append(RiskFactor(feature="Alcohol Above Legal Limit", impact=0.25))
        elif data.alcoholLevel > 0:
            risk_factors.append(RiskFactor(feature="Alcohol Detected", impact=0.12))

        # Visibility
        if data.visibility < 100:
            risk_factors.append(RiskFactor(feature="Very Low Visibility", impact=0.15))
        elif data.visibility < 300:
            risk_factors.append(RiskFactor(feature="Limited Visibility", impact=0.08))

        # Time of day
        if data.timeOfDay.value == "Night":
            risk_factors.append(RiskFactor(feature="Night Time", impact=0.08))

        # Impact angle
        if data.impactAngle > 120:
            risk_factors.append(RiskFactor(feature="Severe Impact Angle", impact=0.10))

        # Driver experience
        if data.drivingExperience < 2:
            risk_factors.append(RiskFactor(feature="Inexperienced Driver", impact=0.08))

        # Distraction
        if data.distractionLevel.value != "None":
            risk_factors.append(RiskFactor(
                feature=f"Distraction: {data.distractionLevel.value}",
                impact=0.10
            ))

        # Vehicle condition
        if data.brakeCondition.value == "Worn out":
            risk_factors.append(RiskFactor(feature="Worn Brakes", impact=0.08))
        if data.tireCondition.value == "Worn out":
            risk_factors.append(RiskFactor(feature="Worn Tires", impact=0.06))

        # Sort by impact and return top 3
        risk_factors.sort(key=lambda x: x.impact, reverse=True)
        return risk_factors[:3]

    def _generate_recommendations(self, data: PredictionRequest, risk_factors: List[RiskFactor]) -> List[str]:
        recommendations = []

        if data.crashSpeed > 70:
            recommendations.append(
                "High speed significantly increased crash severity. Reducing speed by 20 km/h "
                "could have reduced injury risk by up to 40%."
            )

        if not data.seatbeltUsed:
            recommendations.append(
                "Seatbelt usage reduces fatality risk by 45%. Always ensure all occupants are buckled."
            )

        if data.vehicleType.value == "Motorcycle":
            recommendations.append(
                "Motorcyclists are 28x more likely to die in crashes. Consider wearing full "
                "protective gear and a DOT-approved helmet."
            )

        if data.alcoholLevel > 0:
            recommendations.append(
                "Any alcohol impairs driving ability. At 0.08% BAC, crash risk is 11x higher "
                "than sober driving."
            )

        if data.weatherCondition.value != "Clear" or data.roadCondition.value != "Dry":
            recommendations.append(
                "Adverse conditions require 50% more stopping distance. Reduce speed and "
                "increase following distance."
            )

        if data.timeOfDay.value == "Night":
            recommendations.append(
                "Night crashes are 3x more fatal. Ensure headlights are functioning and "
                "consider high-visibility equipment."
            )

        if data.distractionLevel.value != "None":
            recommendations.append(
                "Distracted driving increases crash risk by 4x. Put phones away and take "
                "breaks if drowsy."
            )

        if len(recommendations) < 2:
            recommendations.append(
                "Regular vehicle maintenance and defensive driving techniques can reduce "
                "overall crash risk by up to 30%."
            )

        return recommendations[:4]

    def _resolve_severity_label(self, label_value, predicted_index: int) -> str:
        """Map model class output to the API's expected severity literal."""
        # If the model returns numeric class labels, align them to severity_labels order
        if isinstance(label_value, (int, float)):
            idx = int(label_value)
            return self.severity_labels[idx] if 0 <= idx < len(self.severity_labels) else self.severity_labels[predicted_index]

        # Handle numeric strings like "0", "1", "2"
        if isinstance(label_value, str) and label_value.isdigit():
            idx = int(label_value)
            return self.severity_labels[idx] if 0 <= idx < len(self.severity_labels) else self.severity_labels[predicted_index]

        # If already one of the literals, return as-is
        if isinstance(label_value, str) and label_value in self.severity_labels:
            return label_value

        # Fallback to index-based mapping
        return self.severity_labels[predicted_index]

    def predict(self, data: PredictionRequest) -> PredictionResponse:
        if self.model is None:
            raise RuntimeError("Model not loaded. Please ensure catboost_model.cbm exists in ml_models/")
        
        # Use actual model prediction
        features = self._preprocess_input(data)
        probabilities = self.model.predict_proba(features)[0]
        predicted_class = int(np.argmax(probabilities))

        # Align label with the model's internal class ordering when available
        if self.model_classes:
            severity = self._resolve_severity_label(self.model_classes[predicted_class], predicted_class)
        else:
            severity = self.severity_labels[predicted_class]

        # Confidence should always reflect the highest predicted probability
        confidence = float(np.max(probabilities))

        risk_factors = self._calculate_risk_factors(data)
        recommendations = self._generate_recommendations(data, risk_factors)

        return PredictionResponse(
            severity=severity,
            confidence=round(confidence, 2),
            riskFactors=risk_factors,
            recommendations=recommendations
        )


prediction_service = PredictionService()
