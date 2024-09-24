# app/services/redis.py

import redis
from ..config.logger import setup_logger

logger = setup_logger("app")


class RedisService:
    _instance = None

    def __new__(cls, host="localhost", port=6379, db=3):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance.redis_client = redis.StrictRedis(host=host, port=port, db=db)
            logger.warning(f"Redis 연결 설정: {host}:{port}, DB: {db}")
        return cls._instance

    def __init__(cls, *args, **kwargs):
        # __new__에서 초기화를 수행하므로 여기서는 아무것도 하지 않습니다.
        pass

    def set(self, key: str, value: bytes, expiration: int = None):
        """
        Redis에 키-값 쌍을 저장합니다.
        expiration이 유효한 양의 정수일 경우에만 만료 시간을 설정합니다.
        """
        self.redis_client.set(key, value)

        if expiration is not None and isinstance(expiration, int) and expiration > 0:
            self.redis_client.expire(key, expiration)
            logger.info(f"Redis에 키 저장: {key}, 만료 시간: {expiration}초")
        else:
            logger.info(f"Redis에 키 저장: {key}, 만료 시간: 없음")

    def get(self, key: str):
        """Redis에서 키에 해당하는 값을 가져옵니다."""
        value = self.redis_client.get(key)
        if value:
            logger.info(f"Redis에서 키 조회 성공: {key}")
        else:
            logger.info(f"Redis에서 키 조회 실패: {key}")
        return value

    def get_all_keys(self):
        """모든 키를 조회합니다."""
        keys = self.redis_client.keys("*")
        logger.info(f"Redis의 모든 키 조회: {len(keys)}개")
        return keys


# 싱글톤 인스턴스 생성
redis_service = RedisService()
