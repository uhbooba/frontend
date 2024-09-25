# from config.database import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, Date
from sqlalchemy.sql import func

from ..config.database import Base


class Video(Base):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True)
    keyword = Column(String(20))
    title = Column(String(255))
    url = Column(Text, unique=True)
    description = Column(Text, nullable=True)
    upload_at = Column(Date)
    bring_at = Column(DateTime, server_default=func.now())
