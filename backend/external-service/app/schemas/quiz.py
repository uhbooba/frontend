from typing import List, Union

from pydantic import BaseModel


class QuizItem(BaseModel):
    part: int
    number: int
    question: str
    answer: str
    comment: str


class QuizPartResponse(BaseModel):
    part: int
    quizzes: List[QuizItem]


class QuizResponse(BaseModel):
    status: str
    data: Union[List[QuizPartResponse], List[QuizItem]]
