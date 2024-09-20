from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from ..config.database import get_db
from ..schemas.error import ErrorResponse
from ..schemas.video import VideoResponse, KeywordListResponse
from ..services.video import VideoService

router = APIRouter(
    prefix="/video",
    tags=["video"]
)


@router.get("", response_model=VideoResponse)
def read_videos(db: Session = Depends(get_db)):
    video_items = VideoService.get_all_videos(db)
    return VideoResponse(status="success", data=video_items)


@router.get("/search", response_model=VideoResponse)
def search_videos(keyword: str = Query(..., description="Filter videos by keyword"), db: Session = Depends(get_db)):
    video_items = VideoService.get_videos_by_keyword(db, keyword)
    if not video_items:
        error_response = ErrorResponse(
            status="not found",
            data=f"No videos found for keyword {keyword}"
        )
        return JSONResponse(status_code=404, content=error_response.dict())

    return VideoResponse(status="success", data=video_items)


@router.get("/keywords", response_model=KeywordListResponse)
def read_keywords(db: Session = Depends(get_db)):
    keywords = VideoService.get_all_keywords(db)
    return KeywordListResponse(status="success", data=keywords)
