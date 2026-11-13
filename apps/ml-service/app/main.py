
from fastapi import FastAPI

app = FastAPI(
    title="VidhiLens ML Service",
    description="AI-powered Legal Precedent Discovery",
    version="0.1.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ml-service"
    }


@app.get("/")
def home():
    return {
        "message": "Welcome to VidhiLens ML Service"
    }
