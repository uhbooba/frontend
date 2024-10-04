from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..schemas.success_response import ok_res
from ..services.chat_service import ChatService

# Setup
router = APIRouter(prefix="/chat", tags=["chat"])


# Schemas
class AiRequest(BaseModel):
    question: str


# 라우터
@router.post("/{user_key}", response_model=ok_res)
def get_answer(user_key: int, request: AiRequest):
    try:
        response = ChatService.get_answer(str(user_key), request.question)
        return ok_res(data=response)
    except Exception as e:
        error_response = {"status": "error", "message": f"Unexpected error: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)
