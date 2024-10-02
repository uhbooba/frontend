import jsonpickle
from sqlalchemy import desc
from sqlalchemy.orm import Session

from ..config.logger import setup_logger
from ..config.redis import r_api_data
from ..models.video_model import Video
from ..schemas.video_schema import VideoItem

logger = setup_logger("app")


class VideoService:
    @staticmethod
    def get_all_videos(db: Session):
        cache_key = "GET:video"
        cached_data = r_api_data.get(cache_key)

        if cached_data:
            return jsonpickle.decode(cached_data)

        logger.info(f"캐싱된 데이터가 없음 : API key is {cache_key}")

        #####################################
        videos = db.query(Video).order_by(desc(Video.views)).all()
        VideoItems = [
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

        r_api_data.set(cache_key, jsonpickle.encode(VideoItems))
        logger.info(f"캐싱 데이터 생성 및 Redis 저장 완료 : API key is {cache_key}")

        return VideoItems

    @staticmethod
    def get_videos_by_keyword(keyword: str, db: Session):

        cache_key = f"GET:video:search:{keyword}"
        cached_data = r_api_data.get(cache_key)

        if cached_data:
            return jsonpickle.decode(cached_data)

        logger.info(f"캐싱된 데이터가 없음 : API key is {cache_key}")

        #####################################
        videos = (
            db.query(Video)
            .filter(Video.keyword == keyword)
            .order_by(desc(Video.upload_at))
            .all()
        )

        if not videos:
            raise ValueError(f"비디오를 찾을 수 없습니다: keyword is {keyword}")

        VideoItems = [
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

        r_api_data.set(cache_key, jsonpickle.encode(VideoItems))
        logger.info(f"캐싱 데이터 생성 및 Redis 저장 완료 : API key is {cache_key}")

        return VideoItems

    @staticmethod
    def get_all_keywords(db: Session):

        cache_key = f"GET:video:keywords"
        cached_data = r_api_data.get(cache_key)

        if cached_data:
            return jsonpickle.decode(cached_data)

        logger.info(f"캐싱된 데이터가 없음 : API key is {cache_key}")

        #####################################
        keywords = [keyword[0] for keyword in db.query(Video.keyword).distinct().all()]

        r_api_data.set(cache_key, jsonpickle.encode(keywords))
        logger.info(f"캐싱 데이터 생성 및 Redis 저장 완료 : API key is {cache_key}")

        return keywords
