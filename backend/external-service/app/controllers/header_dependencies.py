from urllib.parse import unquote

from fastapi import Request
from fastapi.responses import JSONResponse


class UserHeaderInfo:
    def __init__(self, user_id: int, name: str):
        self.user_id = user_id
        self.name = name


def get_user_header_info(
        request: Request,
):
    user_id = request.headers.get("x_userid")
    user_name = request.headers.get("x_name")

    if user_id is None or user_name is None:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "헤더에 토큰이 필요합니다"},
        )

    name = unquote(user_name)  # URL 디코딩
    user_id = int(user_id)
    return UserHeaderInfo(id=user_id, name=user_name)
