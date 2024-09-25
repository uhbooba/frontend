from sqlalchemy import desc
from sqlalchemy.orm import Session

from ..models.video import Video
from ..schemas.video import VideoItem


class VideoService:
    @staticmethod
    def get_all_videos(db: Session):
        videos = db.query(Video).order_by(desc(Video.upload_at)).all()
        return [
            VideoItem(
                id=video.id,
                keyword=video.keyword,
                title=video.title,
                url=video.url,
                description=video.description,
                upload_at=video.upload_at,
            )
            for video in videos
        ]

    @staticmethod
    def get_videos_by_keyword(db: Session, keyword: str):
        videos = db.query(Video).filter(Video.keyword == keyword).all()
        return [
            VideoItem(
                id=video.id,
                keyword=video.keyword,
                title=video.title,
                url=video.url,
                description=video.description,
                upload_at=video.upload_at,
            )
            for video in videos
        ]

    @staticmethod
    def get_all_keywords(db: Session):
        keywords = db.query(Video.keyword).distinct().all()
        return [keyword[0] for keyword in keywords]
