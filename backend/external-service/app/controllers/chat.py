import os

import requests
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..schemas.error import ErrorResponse

API_KEY = os.getenv("GPT_KEY")

router = APIRouter(prefix="/ai", tags=["ai"])

from ..config.logger import setup_logger

logging = setup_logger("app")

SYSTEM_PROMPT = ""


# 스키마
class AiRequest(BaseModel):
    question: str


class AiResponse(BaseModel):
    answer: str


# 서비스 로직
class AiService:
    @staticmethod
    def get_answer(question: str):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        }

        data = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=data
        )
        response.raise_for_status()
        return response.json()


# 라우터
@router.post("/get_answer", response_model=AiResponse)
def get_answer(request: AiRequest):
    try:
        response = AiService.get_answer(request.question)
        return AiResponse(answer=response["choices"][0]["message"]["content"])
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        error_response = ErrorResponse(
            status="error", data=f"Unexpected error: {str(e)}"
        )
        return JSONResponse(status_code=500, content=error_response.dict())
