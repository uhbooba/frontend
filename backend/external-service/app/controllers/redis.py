from fastapi import APIRouter, HTTPException

from ..services.redis import RedisService

router = APIRouter(prefix="/redis", tags=["(개발용)redis"])


@router.get("/{db_number}")
async def get_all_data(db_number: int):
    try:
        data = RedisService.get_all_data(db_number)
        return {"db": db_number, "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{db_number}/{key}")
async def get_data(db_number: int, key: str):
    value = RedisService.get_data(db_number, key)
    if value is None:
        raise HTTPException(status_code=404, detail="Key not found")
    return {"db": db_number, "key": key, "value": value}


@router.delete("/{db_number}/{key}")
async def delete_data(db_number: int, key: str):
    result = RedisService.delete_data(db_number, key)
    if not result:
        raise HTTPException(status_code=404, detail="Key not found")
    return {"message": f"Key '{key}' deleted from DB {db_number}"}
