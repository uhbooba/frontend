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
        return ok_res(data=video_items, message=f"{len(video_items)}개의 영상 - 인기순")
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"status": "error", "message": str(e)}
        )


@router.get("/search/{keyword}", response_model=ok_res)
def search_videos(keyword: str, db: Session = Depends(get_db)):
    try:
        video_items = VideoService.get_videos_by_keyword(keyword, db)
        if not video_items:
            return JSONResponse(
                status_code=404,
                content={
                    "status": "not found",
                    "message": f"No videos found for keyword '{keyword}'",
                },
            )
        return ok_res(data=video_items, message=f"{len(video_items)}개의 영상 - 최신순")
    except ValueError as e:
        return JSONResponse(
            status_code=404, content={"status": "Not Found", "message": str(e)}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Failed to get videos: {str(e)}"},
        )


@router.get("/keywords", response_model=ok_res)
def get_keywords(db: Session = Depends(get_db)):
    try:
        keywords = VideoService.get_all_keywords(db)
        return ok_res(data=keywords, message=f"{len(keywords)}개의 키워드")
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": f"Failed to get keywords: {str(e)}"},
        )
