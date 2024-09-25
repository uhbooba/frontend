from fastapi import APIRouter
from fastapi.responses import JSONResponse

from ..schemas.success_response import ok_res
from ..services.redis_service import RedisService

# Setup
router = APIRouter(prefix="/redis", tags=["(개발용)redis"])


# Constants

# Schemas


@router.get("/{db_number}", response_model=ok_res)
async def get_all_data(db_number: int):
    try:
        data = RedisService.get_all_data(db_number)
        return ok_res(data={"db_number": db_number, "data": data}).dict()
    except Exception as e:
        error_response = {
            "status": "error",
            "data": f"Redis error get_all_data: {str(e)}",
        }
        return JSONResponse(status_code=500, content=error_response)


@router.get("/{db_number}/{key}", response_model=ok_res)
async def get_data(db_number: int, key: str):
    value = RedisService.get_data(db_number, key)
    if value is None:
        error_response = {
            "status": "error",
            "message": f"Key '{key}' not found in DB {db_number}",
        }
        return JSONResponse(status_code=404, content=error_response)
    return ok_res(data={"db": db_number, "key": key, "value": value})


@router.delete("/{db_number}/{key}", response_model=ok_res)
async def delete_data(db_number: int, key: str):
    result = RedisService.delete_data(db_number, key)
    if not result:
        error_response = {
            "status": "error",
            "message": f"Key '{key}' not found in DB {db_number}",
        }
        return JSONResponse(status_code=404, content=error_response)
    return ok_res(message=f"Key '{key}' deleted from DB {db_number}")
