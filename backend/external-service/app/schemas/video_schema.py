from datetime import date
from typing import Optional

from pydantic import BaseModel


class VideoItem(BaseModel):
    id: int
    keyword: str
    title: str
    url: str
    description: Optional[str] = None
    upload_at: date
