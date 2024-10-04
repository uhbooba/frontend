from sqlalchemy import Column, Integer, String, Text, SmallInteger

from ..config.database import Base


class SmishingMessage(Base):
    __tablename__ = "smishing_message"

    scenario = Column(String(10), primary_key=True, nullable=False)
    sender = Column(String(20))
    message = Column(Text)
    time = Column(String(20))
    sender_img = Column(Text)
    remain = Column(SmallInteger)


class SmishingStatus(Base):
    __tablename__ = "smishing_status"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, unique=True, nullable=False)
    case_A = Column(String(10), default="A0000")
    case_B = Column(String(10), default="B0000")
    case_C = Column(String(10), default="C0000")
    case_D = Column(String(10), default="D0000_F")
    case_E = Column(String(10), default="E0000")
    case_F = Column(String(10), default="F0000_F")
    case_G = Column(String(10), default="G0000_F")
