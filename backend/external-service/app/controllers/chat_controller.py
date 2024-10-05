from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from .header_dependencies import get_user_header_info, UserHeaderInfo
from ..schemas.success_response import ok_res
from ..services.chat_service import ChatService

# Setup
router = APIRouter(prefix="/chat", tags=["chat"])


# Schemas
class AiRequest(BaseModel):
    question: str


# 라우터
@router.post("", response_model=ok_res)
def get_answer(
        request: AiRequest,
        user_info: UserHeaderInfo = Depends(get_user_header_info),
):
    """헤더에 토큰이 필요합니다"""
    try:
        response = ChatService.get_answer(str(user_info.user_id), request.question)
        return ok_res(data=response)
    except Exception as e:
        error_response = {"status": "error", "message": f"Unexpected error: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)
