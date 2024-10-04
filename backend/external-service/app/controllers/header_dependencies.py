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
):
    user_id = request.headers.get("x-userid")
    user_name = request.headers.get("x-name")
    logger.info(request.headers)
    if user_id is None or user_name is None:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "헤더에 토큰이 필요합니다"},
        )

    return UserHeaderInfo(id=int(user_id), name=unquote(user_name))
