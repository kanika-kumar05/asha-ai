from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    user_message = request.message.lower()

    if "medicine" in user_message:
        response = "Please check your medicine schedule. I can help you remember your daily medicines."

    elif "who" in user_message or "family" in user_message:
        response = "I can help you remember family members once face recognition is added."

    elif "hello" in user_message or "hi" in user_message:
        response = "Hello! I am Asha AI, your memory companion. How can I help you today?"

    elif "sad" in user_message or "lonely" in user_message:
        response = "I am here with you. You are not alone. Would you like to listen to a favorite song or call a family member?"

    else:
        response = "I am here to help you with reminders, memories, medicines, and daily support."

    return {
        "reply": response
    }