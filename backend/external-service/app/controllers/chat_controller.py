from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..config.database import get_db
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
@router.post("/{user_key}", response_model=ok_res)
def get_answer(user_key: int, request: AiRequest):
    try:
        response = ChatService.get_answer(str(user_key), request.question)
        return ok_res(data=response)
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        error_response = {"status": "error", "message": f"Unexpected error: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)


@router.get("")
def save_chat_history(db: Session = Depends(get_db)):
    logging.info("Redis에 있는 채팅 기록 chat_history 테이블에 저장")
    try:
        message = ChatService.save_chat_history_to_db(db)
        return ok_res(message=message)

    except Exception as e:
        logging.error(f"Failed to save chat log: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": f"Failed to save chat log: {str(e)}",
            },
        )
