from itertools import groupby

from sqlalchemy.orm import Session

from ..config.logger import setup_logger
from ..config.redis import r_api_data
from ..models.quiz_model import Quiz
from ..schemas.quiz_schema import QuizItem, QuizResponse

logger = setup_logger("app")


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
        cache_key = "GET:quiz"
        cached_data = r_api_data.get(cache_key)

        if cached_data:
            return cached_data

        #####################################
        logger.info(f"캐싱된 데이터가 없음 : API key is {cache_key}")
        quizzes = db.query(Quiz).all()

        # part와 topic으로 그룹화
        grouped_quizzes = groupby(quizzes, key=lambda x: (x.part, x.topic))

        quizzes_by_parts = [
            QuizResponse(
                part=part,
                topic=topic,
                quizzes=[QuizService.quiz_to_quiz_item(quiz) for quiz in items],
            )
            for (part, topic), items in grouped_quizzes
        ]

        r_api_data.set(cache_key, quizzes_by_parts)
        logger.info(f"캐싱 데이터 생성 및 Redis 저장 완료 : API key is {cache_key}")

        return quizzes_by_parts

    # 특정 파트의 퀴즈를 가져오는 함수
    @staticmethod
    def get_quizzes_by_part(part: int, db: Session):
        cache_key = f"GET:quiz:{part}"
        cached_data = r_api_data.get(cache_key)

        if cached_data:
            return cached_data

        #####################################
        logger.info(f"캐싱된 데이터가 없음 : API key is GET:quiz:{part}")
        quizzes = db.query(Quiz).filter(Quiz.part == part).all()

        if not quizzes:
            raise ValueError(f"퀴즈를 찾을 수 없습니다: part is {part}")

        topic = quizzes[0].topic

        quiz_items = [QuizService.quiz_to_quiz_item(quiz) for quiz in quizzes]
        quizzes_by_part = QuizResponse(part=part, topic=topic, quizzes=quiz_items)

        r_api_data.set(cache_key, quizzes_by_part)
        logger.info(f"캐싱 데이터 생성 및 Redis 저장 완료 : API key is {cache_key}")

        return quizzes_by_part
