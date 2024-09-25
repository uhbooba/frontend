from typing import Generic, TypeVar, Union

from pydantic import BaseModel

T = TypeVar("T")


class ok_res(BaseModel, Generic[T]):
    status: str = "success"
    data: Union[T, None] = ""
    message: Union[str, None] = ""
