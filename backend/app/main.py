from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import PredictionRequest, PredictionResponse
from .prediction_service import prediction_service

app = FastAPI(
    title="Crash Severity Prediction API",
    description="ML-powered API for predicting car crash severity based on various factors",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Crash Severity Prediction API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": prediction_service.model is not None
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict_severity(request: PredictionRequest):
    """
    Predict crash severity based on input parameters.
    
    Returns:
    - severity: Minor Injury, Severe Injury, or Fatal
    - confidence: Prediction confidence score (0-1)
    - riskFactors: Top contributing factors to the prediction
    - recommendations: Safety recommendations based on the input
    """
    try:
        result = prediction_service.predict(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
