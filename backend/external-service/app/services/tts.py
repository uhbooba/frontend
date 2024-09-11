import hashlib
from gtts import gTTS
import asyncio
import io
from ..config.logger import setup_logger
from ..services.redis import redis_service  # 새로 만든 RedisService 임포트

logger = setup_logger("app")

class TtsService:
    @staticmethod
    def hash_text(text: str) -> str:
        """텍스트를 SHA-256 해쉬로 변환"""
        return hashlib.sha256(text.encode()).hexdigest()


    @staticmethod
    def _generate_tts_sync(text: str) -> bytes:
        """gTTS로 음성 데이터 생성하고 바이트 형식으로 반환"""
        tts = gTTS(text, lang="ko")
        mp3_fp = io.BytesIO()
        tts.write_to_fp(mp3_fp)
        return mp3_fp.getvalue()


    @staticmethod
    async def generate_tts(text: str, text_hash: str) -> bytes:
        logger.info("TTS 생성 시작")
        audio_data = await asyncio.to_thread(TtsService._generate_tts_sync, text)
        logger.info(f"생성된 오디오 데이터 길이: {len(audio_data)} 바이트")

        redis_service.set(text_hash, audio_data, expiration=24 * 60 * 60)

        logger.info("TTS 생성 및 Redis 저장 완료")
        return audio_data


    @staticmethod
    async def get_tts_from_redis(text: str) -> bytes:
        text_hash = TtsService.hash_text(text)
        cached_audio = redis_service.get(text_hash)

        if cached_audio:
            logger.info("캐시된 TTS 음성을 반환합니다.")
            return cached_audio
        else:
            logger.info("새로운 TTS 음성을 생성합니다.")
            return await TtsService.generate_tts(text, text_hash)

    @staticmethod
    def get_value_by_key(key:str) -> bytes:
        return redis_service.get(key)

    @staticmethod
    def get_all_keys():
        return redis_service.get_all_keys()
