from ..config.logger import setup_logger
from ..config.redis import RedisHandler, r_api_keys, r_api_data

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
