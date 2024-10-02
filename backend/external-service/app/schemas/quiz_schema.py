from typing import List

from pydantic import BaseModel


class QuizItem(BaseModel):
    number: int
    question: str
    answer: str
    comment: str


class QuizResponse(BaseModel):
    part: int
    topic: str
    quizzes: List[QuizItem]
