from urllib.parse import unquote

from fastapi import Request
from fastapi.responses import JSONResponse
from ..config.logger import setup_logger

logger = setup_logger("app")

class UserHeaderInfo:
    def __init__(self, user_id: int, name: str):
        self.user_id = user_id
        self.name = name


def get_user_header_info(
        request: Request,
        # x_userid: Optional[str] = Header(None),
        # x_name: Optional[str] = Header(None),
        # headers: Header(None)
):
    # 헤더 정보 출력
    for key, value in request.headers.items():
        logger.info(f"[헤더] {key}: {value}")
    user_id = request.headers.x_userid
    user_name = request.headers.x_name
    if not user_id or not user_name:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "헤더에 토큰이 필요합니다"},
        )

    name = unquote(user_name)  # URL 디코딩
    user_id = int(user_id)
    return UserHeaderInfo(id=user_id, name=user_name)
