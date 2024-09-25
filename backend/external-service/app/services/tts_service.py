import asyncio
import hashlib
import io

from gtts import gTTS

from ..config.logger import setup_logger
from ..config.redis import r_tts_audio, r_tts_hash

logger = setup_logger("app")


class TtsService:
    @staticmethod
    def hash_text(text: str) -> str:
        """텍스트를 SHA-256 해쉬로 변환"""
        return hashlib.sha256(text.encode()).hexdigest()

    @staticmethod
    def convert_to_audio(text: str) -> bytes:
        """gTTS로 음성 데이터 생성하고 바이트 형식으로 반환"""
        tts = gTTS(text, lang="ko")
        mp3_fp = io.BytesIO()
        tts.write_to_fp(mp3_fp)
        return mp3_fp.getvalue()

    @staticmethod
    async def generate_tts(text: str, text_hash: str) -> bytes:
        logger.info("TTS 생성 시작")
        audio_data = await asyncio.to_thread(TtsService.convert_to_audio, text)
        logger.info(f"생성된 오디오 데이터 길이: {len(audio_data)} 바이트")

        r_tts_audio.set(text_hash, audio_data, expiration=24 * 60 * 60)
        r_tts_hash.set(text_hash, text[:11], expiration=24 * 60 * 60)

        logger.info("TTS 생성 및 Redis 저장 완료")
        return audio_data

    @staticmethod
    async def get_tts_from_redis(text: str) -> bytes:
        hashed_text = TtsService.hash_text(text)

        # 해쉬 충돌 확인
        cached_prefix = r_tts_hash.get(hashed_text)
        if cached_prefix and cached_prefix != text[:11].encode("utf-8"):
            # 해시 충돌 발생
            r_tts_hash.redis_client.delete(hashed_text)
            r_tts_audio.redis_client.delete(hashed_text)
            logger.info(f"충돌된 캐시 삭제: {hashed_text}")

        # 캐시된 오디오 확인
        cached_audio = r_tts_audio.get(cached_prefix)

        if cached_audio:
            logger.info("캐시된 TTS 음성을 반환합니다.")
            return cached_audio
        else:
            logger.info("새로운 TTS 음성을 생성합니다.")
            return await TtsService.generate_tts(text, hashed_text)
