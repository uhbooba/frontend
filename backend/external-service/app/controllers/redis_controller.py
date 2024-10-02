from typing import Any

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..schemas.success_response import ok_res
from ..services.redis_service import RedisService

# Setup
router = APIRouter(prefix="/redis", tags=["(개발용)redis"])


# Constants
class KeyRequest(BaseModel):
    key: str


class KeyValueRequest(BaseModel):
    key: str
    value: Any


# Schemas


@router.get("/keys/{db_number}", response_model=ok_res)
async def get_all_key(db_number: int):
    try:
        data = RedisService.get_all_key(db_number)
        return ok_res(message=f"db number is {db_number}", data=data)
    except Exception as e:
        error_response = {
            "status": "error",
            "data": f"Redis error get_all_data: {str(e)}",
        }
        return JSONResponse(status_code=500, content=error_response)


@router.post("/{db_number}", response_model=ok_res)
async def set_data(db_number: int, request: KeyValueRequest):
    key = request.key
    value = request.value

    RedisService.set_data(db_number, key, value)
    return ok_res(
        message=f"db number is {db_number}", data={"key": key, "value": value}
    )


@router.post("/value/{db_number}", response_model=ok_res)
async def get_data(db_number: int, request: KeyRequest):
    key = request.key
    value = RedisService.get_data(db_number, key)
    if value is None:
        error_response = {
            "status": "error",
            "message": f"Key '{key}' not found in DB {db_number}",
        }
        return JSONResponse(status_code=404, content=error_response)
    return ok_res(
        message=f"db number is {db_number}", data={"key": key, "value": value}
    )


@router.delete("/value/{db_number}", response_model=ok_res)
async def delete_data(db_number: int, request: KeyRequest):
    key = request.key
    result = RedisService.delete_data(db_number, key)
    if not result:
        error_response = {
            "status": "error",
            "message": f"Key '{key}' not found in DB {db_number}",
        }
        return JSONResponse(status_code=404, content=error_response)
    return ok_res(message=f"Key '{key}' deleted from DB {db_number}")


@router.delete("/invalidation/{table_name}", response_model=ok_res)
async def cache_invalidation(table_name: str):
    result = RedisService.cache_invalidation(table_name)
    return ok_res(message=f"table {table_name}'s API cache invalidation", data=result)
