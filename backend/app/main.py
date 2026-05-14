from fastapi import FastAPI

from app.database.database import engine
from app.database.database import Base

from app.models.user_model import User

from app.routes.auth_routes import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include Auth Routes
app.include_router(auth_router)

@app.get("/")
def home():

    return {
        "message": "Asha AI Backend Running"
    }