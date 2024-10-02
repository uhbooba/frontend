import re
from datetime import datetime, timedelta

import requests

from ..config.config import OPENAI_API_KEY
from ..config.redis import r_chat_log

# Constants
SYSTEM_PROMPT = "당신은 시니어에게 금융 관련 정보를 제공하는 유용한 AI 어시스턴트입니다. 사용자의 금융 관련 질문에 대해 친절하고 정확하게 답변해야 합니다. 대출, 신용카드, 저축, 투자 등의 금융 상품에 대한 정보는 물론, 시니어도 이해하기 쉽게 모바일뱅킹에 대한 조언을 제공하세요. 모든 대답은 반드시 한국어로 대답해야 하며, 반드시 완성된 문장으로 답하세요. 답변은 최대 500자 내로 대답하세요."
GPT_MODEL = "gpt-3.5-turbo"  # gpt-4o
API_URL = "https://api.openai.com/v1/chat/completions"


def current_kst_time():
    return datetime.utcnow() + timedelta(hours=9)


class ChatService:

    @staticmethod
    def preprocess_text(text: str) -> str:
        # 굵게 표시 (* 또는 **), 밑줄 표시 (_ 또는 __), 백틱(`), 제목(#) 제거
        return re.sub(r"[\*_`#]+", "", text).strip()

    @staticmethod
    def get_answer(userKey: int, question: str):
        request_time = current_kst_time()

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

        response_data = response.json()
        answer = response_data["choices"][0]["message"]["content"]
        response_time = current_kst_time()
        execution_time = (response_time - request_time).total_seconds()

        chat_history = {
            "user_id": userKey,
            "request_time": request_time.strftime("%Y-%m-%d %H:%M:%S"),
            "response_time": response_time.strftime("%Y-%m-%d %H:%M:%S"),
            "execution_time": f"{execution_time:.2f}초",
            "used_model": "openai",
            "user_input": question,
            "ai_output": answer,
        }

        r_chat_log.lpush(str(userKey), chat_history)

        return {
            "date": response_time.strftime("%Y-%m-%d"),
            "time": response_time.strftime("%H:%M:%S"),
            "answer": ChatService.preprocess_text(answer),
        }
