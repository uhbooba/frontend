from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from ..models.smishing_model import SmishingStatus, SmishingMessage


# Schemas


class MessageInfo(BaseModel):
    scenario: str
    sender: str
    message: str
    time: str
    sender_img: str
    remain: int

    model_config = ConfigDict(from_attributes=True)


class SmishingService:

    # 사용자별 스미싱 상태를 가져옴
    @staticmethod
    def get_message_list(user_key: int, db: Session):
        status = (
            db.query(SmishingStatus).filter(SmishingStatus.user_id == user_key).first()
        )
        if status is None:
            new_status = SmishingStatus(user_id=user_key)

            db.add(new_status)
            db.commit()
            status = new_status
        #######################################
        scenarios = [
            status.case_A,
            status.case_B,
            status.case_C,
            status.case_D,
            status.case_E,
            status.case_F,
            status.case_G,
        ]
        messages = (
            db.query(SmishingMessage)
            .filter(SmishingMessage.scenario.in_(scenarios))
            .all()
        )

        message_list = [MessageInfo.model_validate(msg) for msg in messages]

        remain_count = sum(1 for msg in message_list if msg.remain > 0)

        return message_list, remain_count

    # 스미싱 상태를 업데이트함
    @staticmethod
    def set_user_status(user_key: int, new_scenario: str, db: Session):
        case = f"case_{new_scenario[0]}"
        rows_updated = (
            db.query(SmishingStatus)
            .filter(SmishingStatus.user_id == user_key)
            .update({case: new_scenario})
        )

        db.commit()

        if rows_updated == 0:
            raise ValueError(f"User not found with user_id: {user_key}")
