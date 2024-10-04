from sqlalchemy import Column, Integer, Text, DateTime, String, Enum, Float

from ..config.database import Base


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer)  # 유저 ID
    user_name = Column(String(10))  # 사용자 이름 (char(10) 대응)
    request_time = Column(DateTime)  # 요청 시간
    response_time = Column(DateTime)  # 응답 시간
    execution_time = Column(Float)  # 실행 시간 (소수점 포함)
    used_model = Column(Enum("openai", "llama"))  # 사용된 모델
    user_input = Column(Text)  # 유저 입력
    ai_output = Column(Text)  # AI 응답
