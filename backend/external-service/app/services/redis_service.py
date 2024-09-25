from ..config.logger import setup_logger
from ..config.redis import RedisHandler

logger = setup_logger("app")


class RedisService:
    @staticmethod
    def get_all_data(db_number):
        """n번 db에 저장된 모든 key-value 데이터 반환"""
        redis_client = RedisHandler.get_instance(db_number)
        all_keys = redis_client.keys("*")
        result = {}
        for key in all_keys:
            value = redis_client.get(key)
            result[key.decode("utf-8")] = value.decode("utf-8") if value else None
        logger.info(f"DB {db_number}의 모든 데이터 조회: {len(result)}개")
        return result

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
