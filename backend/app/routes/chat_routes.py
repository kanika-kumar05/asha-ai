from fastapi import APIRouter
from pydantic import BaseModel

import requests

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
You are Asha AI, a caring AI companion for elderly people.

Your job:
- help with medicines
- help with memories
- provide emotional support
- speak calmly and simply

User message:
{request.message}
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
        print(e)

        return {
            "reply": "Sorry, I am having trouble thinking right now."
        }