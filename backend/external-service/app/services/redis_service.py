from sqlalchemy.orm import Session

from ..config.logger import setup_logger
from ..config.redis import RedisHandler, r_api_keys, r_api_data, r_chat_log
from ..models.chat_model import ChatHistory

logger = setup_logger("app")


class RedisService:
    @staticmethod
    def get_all_key(db_number):
        """n번 db에 저장된 모든 key 반환"""
        redis_client = RedisHandler.get_instance(db_number)
        return redis_client.get_all_keys()

    @staticmethod
    def get_data(db_number, key):
        """n번 db에 저장된 해당 'key' 값을 가진 데이터 반환"""
        redis_client = RedisHandler.get_instance(db_number)
        value = redis_client.get(key)
        if value:
            logger.info(f"DB {db_number}에서 키 '{key}' 조회 성공")
        else:
            logger.info(f"DB {db_number}에서 키 '{key}' 조회 실패")
        return value

    @staticmethod
    def delete_data(db_number, key):
        """n번 db에 저장된 해당 'key' 값을 가진 데이터 삭제"""
        redis_client = RedisHandler.get_instance(db_number)
        result = redis_client.delete(key)
        if result:
            logger.info(f"DB {db_number}에서 키 '{key}' 삭제 성공")
        else:
            logger.info(f"DB {db_number}에서 키 '{key}' 삭제 실패")
        return result

    @staticmethod
    def set_data(db_number, key, value):
        """n번 db에 저장된 해당 'key' 값을 가진 데이터 삭제"""
        redis_client = RedisHandler.get_instance(db_number)
        redis_client.set(key, value)

    @staticmethod
    def cache_invalidation(table_name):
        keys = r_api_keys.get(table_name)
        for key in keys:
            r_api_data.delete(key)

        return r_api_keys.get(table_name)

    @staticmethod
    def save_chat_history_to_db(db: Session):
        logger.info("Redis에 있는 채팅 기록 chat_history 테이블에 저장")
        key_list = r_chat_log.get_all_keys()
        user_cnt = len(key_list)
        message_cnt = 0
        try:
            for key in key_list:
                chat_logs = r_chat_log.get(key)
                for chat_log in reversed(chat_logs):
                    chat_history = ChatHistory(**chat_log)
                    db.add(chat_history)
                    message_cnt += 1

                db.commit()
                r_chat_log.delete(key)
            if message_cnt == 0:
                return "메세지 기록이 없음"
            message = f"{user_cnt}명 유저의 {message_cnt}개 메세지 DB에 저장 완료"
            logger.info(message)
            return message

        except Exception as e:
            logger.info(f"채팅 기록 저장 중 오류 발생: {str(e)}")
