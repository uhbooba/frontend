from itertools import groupby

from sqlalchemy.orm import Session

from ..models.quiz_model import Quiz
from ..schemas.quiz_schema import QuizItem, QuizResponse


class QuizService:
    @staticmethod
    def quiz_to_quiz_item(quiz: Quiz) -> QuizItem:
        return QuizItem(
            number=quiz.number,
            question=quiz.question,
            answer="O" if quiz.answer else "X",
            comment=quiz.comment,
        )

    # 모든 퀴즈를 가져오는 함수
    @staticmethod
    def get_all_quizzes(db: Session):
        quizzes = db.query(Quiz).all()

        # part와 topic으로 그룹화
        grouped_quizzes = groupby(quizzes, key=lambda x: (x.part, x.topic))

        quizzes_by_part = [
            QuizResponse(
                part=part,
                topic=topic,
                quizzes=[QuizService.quiz_to_quiz_item(quiz) for quiz in items],
            )
            for (part, topic), items in grouped_quizzes
        ]

        return quizzes_by_part

    # 특정 파트의 퀴즈를 가져오는 함수
    @staticmethod
    def get_quizzes_by_part(part: int, db: Session):
        quizzes = db.query(Quiz).filter(Quiz.part == part).all()

        if not quizzes:
            raise Exception(f"퀴즈를 찾을 수 없습니다: part is {part}")

        topic = quizzes[0].topic

        quiz_items = [QuizService.quiz_to_quiz_item(quiz) for quiz in quizzes]

        return QuizResponse(part=part, topic=topic, quizzes=quiz_items)
