import re
from datetime import datetime, timedelta

import requests
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker

from ..config.config import OPENAI_API_KEY
from ..config.database import engine
from ..config.logger import setup_logger
from ..config.redis import r_chat_log, r_chat_credits
from ..models.chat_model import ChatHistory

logger = setup_logger("app")

# Constants
SYSTEM_PROMPT = "당신은 시니어에게 금융 관련 정보를 제공하는 유용한 AI 어시스턴트입니다. 사용자의 금융 관련 질문에 대해 친절하고 정확하게 답변해야 합니다. 대출, 신용카드, 저축, 투자 등의 금융 상품에 대한 정보는 물론, 시니어도 이해하기 쉽게 모바일뱅킹에 대한 조언을 제공하세요. 모든 대답은 반드시 한국어로 대답해야 하며, 반드시 완성된 문장으로 답하세요. 답변은 최대 500자 내로 대답하세요."
GPT_MODEL = "gpt-3.5-turbo"  # gpt-4o
API_URL = "https://api.openai.com/v1/chat/completions"

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def current_kst_time():
    return datetime.utcnow() + timedelta(hours=9)


class ChatService:

    @staticmethod
    def preprocess_text(text: str) -> str:
        # 굵게 표시 (* 또는 **), 밑줄 표시 (_ 또는 __), 백틱(`), 제목(#) 제거
        return re.sub(r"[\*_`#]+", "", text).strip()

    @staticmethod
    def save_chat_history_to_db(key: str):
        db = SessionLocal()

        try:
            chat_logs = r_chat_log.get(key)

            for chat_log in reversed(chat_logs):
                chat_history = ChatHistory(**chat_log)
                db.add(chat_history)

            db.commit()
            r_chat_log.delete(key)

            logger.info(f"Redis에 저장된 데이터 10개를 DB에 저장 완료: {key}")

        except SQLAlchemyError as e:
            db.rollback()
            logger.info(f"DB 저장 중 오류 발생: {str(e)}")

        except Exception as e:
            logger.info(f"채팅 기록 저장 중 오류 발생: {str(e)}")

    @staticmethod
    def get_answer(userKey: str, question: str):

        cnt = r_chat_credits.get(userKey)
        if cnt is None:
            cnt = 0
        else:
            cnt = int(cnt)
        if cnt >= 10:
            raise Exception(
                f"오늘의 채팅 크레딧을 모두 썻습니다: user key is {userKey}"
            )
        request_time = current_kst_time()

        now_kst = request_time
        seconds_until_midnight = 86400 - (
                now_kst.hour * 3600 + now_kst.minute * 60 + now_kst.second
        )

        r_chat_credits.set(userKey, cnt + 1, expiration=seconds_until_midnight)

        ###########################################

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}",
        }

        data = {
            "model": GPT_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
        }

        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()

        ###########################################
        response_data = response.json()
        answer = response_data["choices"][0]["message"]["content"]
        response_time = current_kst_time()
        execution_time = (response_time - request_time).total_seconds()

        chat_history = {
            "user_id": userKey,
            "request_time": request_time.strftime("%Y-%m-%d %H:%M:%S"),
            "response_time": response_time.strftime("%Y-%m-%d %H:%M:%S"),
            "execution_time": f"{execution_time:.2f}",
            "used_model": "openai",
            "user_input": question,
            "ai_output": answer,
        }

        if r_chat_log.lpush(userKey, chat_history) > 10:
            ChatService.save_chat_history_to_db(userKey)

        return {
            "date": response_time.strftime("%Y-%m-%d"),
            "time": response_time.strftime("%H:%M:%S"),
            "answer": ChatService.preprocess_text(answer),
        }
