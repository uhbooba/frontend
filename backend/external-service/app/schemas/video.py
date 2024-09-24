from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class VideoItem(BaseModel):
    id: int
    keyword: str
    title: str
    url: str
    description: Optional[str] = None
    upload_at: date


class VideoResponse(BaseModel):
    status: str = "success"
    data: List[VideoItem]


class KeywordListResponse(BaseModel):
    status: str = "success"
    data: List[str]
