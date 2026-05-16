from fastapi import APIRouter
from pydantic import BaseModel
import requests

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
You are Asha AI, a kind memory companion for elderly people.
Reply in simple, calm, caring language.
Help with medicines, daily routine, memory support, and emotional comfort.

User message: {request.message}
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            }
        )

        data = response.json()

        return {
            "reply": data["response"]
        }

    except Exception as e:
        return {
            "reply": "I am having trouble thinking right now. Please try again."
        }