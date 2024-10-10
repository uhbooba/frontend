import json

from fastapi import APIRouter
from kafka import KafkaProducer
from pydantic import BaseModel
from starlette.responses import JSONResponse

# Setup
router = APIRouter(prefix="/kafka", tags=["(개발용)kafka"])

# Constants
producer = KafkaProducer(
    bootstrap_servers="uhbooba-kafka:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)


# Schemas
class NotificationRequest(BaseModel):
    user_id: str
    title: str
    body: str


class TokenRequest(BaseModel):
    user_id: str
    token: str


@router.post("/notification-topic")
def send_notification(request: NotificationRequest):
    """알림 생성"""
    try:
        producer.send("notification-topic", request.dict())
        producer.flush()
        return {"status": "success", "message": "Notification request sent to Kafka"}
    except Exception as e:
        error_response = {"status": "error", "message": str(e)}
        return JSONResponse(status_code=500, content=error_response)


@router.post("/fcm-topic")
def store_user_token(request: TokenRequest):
    """사용자 별 FCM 토큰 저장"""
    try:
        producer.send("fcm-topic", request.dict())
        producer.flush()
        return {
            "status": "success",
            "message": f"FCM Token stored successfully : user_id is {request.user_id} ",
        }
    except Exception as e:
        error_response = {"status": "error", "message": str(e)}
        return JSONResponse(status_code=500, content=error_response)
