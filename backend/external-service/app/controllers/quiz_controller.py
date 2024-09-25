from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from ..config.database import get_db
from ..schemas.success_response import ok_res
from ..services.quiz_service import QuizService

# Setup
router = APIRouter(prefix="/quiz", tags=["quiz"])


# Constants

# Schemas


@router.get("", response_model=ok_res)
def get_all_quiz(db: Session = Depends(get_db)):
    try:
        quizzes = QuizService.get_all_quizzes(db)
        return ok_res(data=quizzes)
    except Exception as e:
        error_response = {"status": "error", "data": f"Failed to get quizzes: {str(e)}"}
        return JSONResponse(status_code=500, content=error_response)


@router.get("/{part}", response_model=ok_res)
def get_quiz(part: int, db: Session = Depends(get_db)):
    response = QuizService.get_quizzes_by_part(part, db)
    if not response.data:
        error_response = {
            "status": "not found",
            "data": f"No quizzes found for part {part}",
        }
        return JSONResponse(status_code=404, content=error_response)
    return ok_res(data=response)
