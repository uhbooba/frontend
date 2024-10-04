from fastapi import APIRouter, Depends
from pydantic import BaseModel
from requests import Session
from starlette.responses import JSONResponse

from .header_dependencies import get_user_header_info, UserHeaderInfo
from ..config.database import get_db
from ..config.logger import setup_logger
from ..schemas.success_response import ok_res
from ..services.smishing_service import SmishingService

# Setup
router = APIRouter(prefix="/smishing", tags=["smishing"])
logging = setup_logger("app")

# Constants
valid_scenarios = {
    "A0000",
    "A0001",
    "A0002",
    "A0011",
    "A0021_F",
    "B0000",
    "B0001",
    "B0002",
    "B0012",
    "B0022_F",
    "C0000",
    "C0001",
    "C0002",
    "C0003",
    "C0011",
    "C0013",
    "C0021_F",
    "C0023_F",
    "C0031",
    "C0033",
    "D0000_F",
    "E0000",
    "E0001",
    "E0002",
    "E0011",
    "E0021_F",
    "F0000_F",
    "G0000_F",
}


# Schemas
class StatusRequest(BaseModel):
    scenario: str


@router.get(
    "",
    response_model=ok_res,
)
def get_message_list(
        db: Session = Depends(get_db),
        user_info: UserHeaderInfo = Depends(get_user_header_info),
):
    if isinstance(user_info, JSONResponse):
        return user_info
    print(user_info.name)
    try:
        message_list, remain_count = SmishingService.get_message_list(
            user_info.user_id, db
        )
        message = (
            "메시지" if remain_count == 0 else f"읽지 않은 메시지\n{remain_count}개"
        )
        return ok_res(data=message_list, message=message)
    except Exception as e:
        error_response = {
            "status": "error",
            "data": f"Failed to get smishing status : {str(e)}",
        }
        return JSONResponse(status_code=500, content=error_response)


@router.post("/{user_key}", response_model=ok_res)
def set_user_smishing_status(
        user_key: int, request: StatusRequest, db: Session = Depends(get_db)
):
    if request.scenario not in valid_scenarios:
        error_response = {
            "status": "error",
            "data": f"Invalid scenario. Must be one of the predefined scenarios",
        }
        return JSONResponse(
            status_code=400,
            content=error_response,
        )

    try:
        SmishingService.set_user_status(user_key, request.scenario, db)
        return ok_res(data=request, message=f"user_id is {user_key}")
    except ValueError as e:
        return JSONResponse(
            status_code=404, content={"status": "Not Found", "message": str(e)}
        )
    except Exception as e:
        error_response = {
            "status": "error",
            "data": f"Failed to set smishing status : {str(e)}",
        }
        return JSONResponse(status_code=500, content=error_response)
