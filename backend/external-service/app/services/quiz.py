from itertools import groupby
from operator import attrgetter

from sqlalchemy.orm import Session

from ..models.quiz import Quiz
from ..schemas.quiz import QuizItem, QuizPartResponse, QuizResponse


class QuizService:

    # 모든 퀴즈를 가져오는 함수
    @staticmethod
    def get_all_quizzes(db: Session, skip: int = 0, limit: int = 100):
        quizzes = db.query(Quiz).offset(skip).limit(limit).all()
        quiz_items = [
            QuizItem(
                part=quiz.part,
                number=quiz.number,
                question=quiz.question,
                answer='O' if quiz.answer else 'X',
                comment=quiz.comment
            )
            for quiz in quizzes
        ]

        # part로 그룹화
        grouped_quizzes = groupby(sorted(quiz_items, key=attrgetter('part')), key=attrgetter('part'))

        quizzes_by_part = [
            QuizPartResponse(part=part, quizzes=list(items))
            for part, items in grouped_quizzes
        ]

        return QuizResponse(status="success", data=quizzes_by_part)

    # 특정 파트의 퀴즈를 가져오는 함수
    @staticmethod
    def get_quizzes_by_part(db: Session, part: int):
        quizzes = db.query(Quiz).filter(Quiz.part == part).all()

        quiz_items = [
            QuizItem(
                part=quiz.part,
                number=quiz.number,
                question=quiz.question,
                answer='O' if quiz.answer else 'X',
                comment=quiz.comment
            )
            for quiz in quizzes
        ]

        return QuizResponse(status="success", data=quiz_items)
