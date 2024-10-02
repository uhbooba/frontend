from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..config.logger import setup_logger
from ..schemas.success_response import ok_res
from ..services.chat_service import ChatService

# Setup
router = APIRouter(prefix="/chat", tags=["chat"])
logging = setup_logger("app")


# Schemas
class AiRequest(BaseModel):
    question: str


# 라우터
@router.post("", response_model=ok_res)
def get_answer(request: AiRequest):
    userKey = 1
    try:
        response = ChatService.get_answer(userKey, request.question)
        return ok_res(data=response)
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        error_response = {"status": "error", "data": f"Unexpected error: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)
