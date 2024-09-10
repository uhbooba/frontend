from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.error import ErrorResponse
from fastapi.responses import JSONResponse
from app.config.database import get_db
from app.schemas.quiz import QuizResponse
from app.services.quiz import QuizService

router = APIRouter(
    prefix="/quiz",
    tags=["quiz"]
)

@router.get("", response_model=QuizResponse)
def read_quizzes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    quizzes = QuizService.get_all_quizzes(db, skip=skip, limit=limit)
    return quizzes


@router.get("/{part}", response_model=QuizResponse)
def read_quizzes_by_part(part: int, db: Session = Depends(get_db)):
    response = QuizService.get_quizzes_by_part(db, part)
    if not response.data:
        error_response = ErrorResponse(
            status="not found",
            data=f"No quizzes found for part {part}"
        )
        return JSONResponse(status_code=404, content=error_response.dict())
    return response