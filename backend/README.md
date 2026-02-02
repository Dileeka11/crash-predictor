# Crash Severity Prediction Backend

FastAPI backend for serving the CatBoost crash severity prediction model.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check (shows if model is loaded)
- `POST /predict` - Make a prediction
- `GET /docs` - Swagger UI documentation

## Model

The CatBoost model file should be placed at:
```
backend/ml_models/catboost_model.cbm
```

If the model file is not found, the API will fall back to a rule-based prediction system.
