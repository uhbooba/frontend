from pydantic import BaseModel
from typing import List, Union


class QuizItem(BaseModel):
    part: int
    number: int
    question: str
    answer: str

class QuizPartResponse(BaseModel):
    part: int
    quizzes: List[QuizItem]

class QuizResponse(BaseModel):
    status: str
    data: Union[List[QuizPartResponse], List[QuizItem]]