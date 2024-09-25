import io

from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from ..services.tts_service import TtsService

# Setup
router = APIRouter(prefix="/tts", tags=["tts"])


# Constants


# Schemas
class TtsRequest(BaseModel):
    text: str


@router.post("")
async def generate_audio(request: TtsRequest):
    """TTS 생성 API"""
    try:
        audio_data = await TtsService.get_tts_from_redis(request.text)
        hashed_text = TtsService.hash_text(request.text)

        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": f'attachment; filename="{hashed_text}.mp3"'
            },
        )
    except Exception as e:
        error_response = {"status": "error", "message": str(e)}
        return JSONResponse(status_code=500, content=error_response)


@router.get("/audio/{key}")
async def get_audio(key: str):
    """Redis에서 오디오 데이터 가져오기"""
    try:
        audio_data = TtsService.get_value_by_key(key)
        if audio_data is None:
            return JSONResponse(
                status_code=404,
                content={"status": "error", "message": "Audio not found"},
            )

        return StreamingResponse(io.BytesIO(audio_data), media_type="audio/mpeg")
    except Exception as e:
        error_response = {"status": "error", "message": str(e)}
        return JSONResponse(status_code=500, content=error_response)
