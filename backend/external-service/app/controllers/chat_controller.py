import requests
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..config.config import OPENAI_API_KEY
from ..config.logger import setup_logger

# Setup
router = APIRouter(prefix="/ai", tags=["ai"])
logging = setup_logger("app")

# Constants
SYSTEM_PROMPT = ""
GPT_MODEL = "gpt-4o"
API_URL = "https://api.openai.com/v1/chat/completions"


# Schemas
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
            "Authorization": f"Bearer {OPENAI_API_KEY}",
        }

        data = {
            "model": GPT_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
        }

        response = requests.post(API_URL, headers=headers, json=data)
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
        error_response = {"status": "error", "data": f"Unexpected error: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)
