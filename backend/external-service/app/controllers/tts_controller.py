from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..services.tts_service import TtsService

# Setup
router = APIRouter(prefix="/tts", tags=["tts"])


# Constants


# Schemas
class TtsRequest(BaseModel):
    text: str


@router.post("/new")
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


@router.get("/{tts_key}")
async def find_audio(tts_key: str):
    """금융사기용 TTS 음성 파일 찾기 API"""
    try:
        audio_data = await TtsService.get_tts_ai(tts_key)
        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={"Content-Disposition": f'attachment; filename="{tts_key}.mp3"'},
        )
    except Exception as e:
        return JSONResponse(
            status_code=404, content={"status": "error", "message": str(e)}
        )
