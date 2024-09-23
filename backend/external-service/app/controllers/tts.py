from datetime import datetime
from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
import io
from fastapi.responses import StreamingResponse
from ..services.tts import TtsService


router = APIRouter(
    prefix="/tts",
    tags=["tts"]
)

class TtsRequest(BaseModel):
    text: str


@router.post("")
async def generate_tts(request: TtsRequest):
    """TTS 생성 API"""
    try:
        audio_data = await TtsService.get_tts_from_redis(request.text)
        current_time = datetime.now().strftime("%Y%m%d%H%M%S")
        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={"Content-Disposition": f'attachment; filename="{current_time}.mp3"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Redis에 저장된 모든 키 조회
@router.get("/list_keys")
async def list_audio_keys():
    keys = TtsService.get_all_keys()
    return keys


# Redis에 저장된 특정 값 조회
@router.get("/audio/{key}")
async def get_audio(key: str):
    """Redis에서 오디오 데이터 가져오기"""
    audio_data = TtsService.get_value_by_key(key)
    if audio_data is None:
        raise HTTPException(status_code=404, detail="Audio not found")
    return StreamingResponse(
        io.BytesIO(audio_data),
        media_type="audio/mpeg"
    )