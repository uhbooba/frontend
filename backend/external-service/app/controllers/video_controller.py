from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from ..config.database import get_db
from ..schemas.success_response import ok_res
from ..services.video_service import VideoService

# Setup
router = APIRouter(prefix="/video", tags=["video"])


# Constants


# Schemas
@router.get("", response_model=ok_res)
def get_all_video(db: Session = Depends(get_db)):
    try:
        video_items = VideoService.get_all_videos(db)
        return ok_res(data=video_items)
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"status": "error", "message": str(e)}
        )


@router.get("/search/{keyword}", response_model=ok_res)
def search_videos(keyword: str, db: Session = Depends(get_db)):
    try:
        video_items = VideoService.get_videos_by_keyword(db, keyword)
        if not video_items:
            return JSONResponse(
                status_code=404,
                content={
                    "status": "not found",
                    "message": f"No videos found for keyword '{keyword}'",
                },
            )
        return ok_res(data=video_items)
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"status": "error", "message": str(e)}
        )


@router.get("/keywords", response_model=ok_res)
def get_keywords(db: Session = Depends(get_db)):
    try:
        keywords = VideoService.get_all_keywords(db)
        return ok_res(data=keywords)
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"status": "error", "message": str(e)}
        )