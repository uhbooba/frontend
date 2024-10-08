import json
from datetime import datetime, timedelta

import firebase_admin
from firebase_admin import credentials, messaging
from kafka import KafkaConsumer

from ..config.config import (
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID,
    FIREBASE_CLIENT_X509_CERT_URL,
)
from ..config.logger import setup_logger
from ..config.redis import r_signal_token, r_signal_log

# Constants
logger = setup_logger("app")
FIREBASE_CREDENTIALS = {
    "type": "service_account",
    "project_id": FIREBASE_PROJECT_ID,
    "private_key_id": FIREBASE_PRIVATE_KEY_ID,
    "private_key": FIREBASE_PRIVATE_KEY,
    "client_email": FIREBASE_CLIENT_EMAIL,
    "client_id": FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com",
}

# Firebase 초기화
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred)

# Kafka 컨슈머 설정
KAFKA_SERVERS = "uhbooba-kafka:9092"
notification_consumer = KafkaConsumer(
    "notification-topic",
    bootstrap_servers=KAFKA_SERVERS,
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
)
token_consumer = KafkaConsumer(
    "fcm-topic",
    bootstrap_servers=KAFKA_SERVERS,
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
)


##########################################
def send_fcm_notification(message):
    try:
        user_id = message["user_id"]
        title = message["title"]
        body = message["body"]

        # FCM 토큰 조회
        fcm_token = r_signal_token.get(user_id)
        if fcm_token is None:
            logger.debug(f"FCM token not found for user {user_id}")
            return

        # FCM 알림 메시지 생성
        fcm_message = messaging.Message(
            notification=messaging.Notification(title=title, body=body),
            token=fcm_token,
        )

        # FCM 메시지 전송
        try:
            response = messaging.send(fcm_message)
            logger.info(f"Successfully sent message: {response}")
            r_signal_log.lpush(
                user_id,
                {
                    "type": "notification",
                    "title": title,
                    "body": body,
                    "time": (datetime.utcnow() + timedelta(hours=9)).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                },
            )
        except Exception as e:
            logger.error(f"Error sending message: {e}")
    except KeyError as e:
        logger.info(f"Invalid message format: missing {e}")
    except Exception as e:
        logger.info(f"Error processing message: {e}")


def set_fcm_token(message):
    try:
        user_id = message["user_id"]
        fcm_token = message["token"]

        # 기존 FCM 토큰 조회
        old_token = r_signal_token.get(user_id)
        if old_token is not None and old_token != fcm_token:
            fcm_message = messaging.Message(
                notification=messaging.Notification(
                    title="로그인", body="새로운 기기에서 로그인되었습니다"
                ),
                token=old_token,
            )
            try:
                messaging.send(fcm_message)
            except Exception as send_error:
                logger.error(f"Error sending FCM notification: {send_error}")

        # 새 FCM 토큰 저장
        r_signal_token.set(user_id, fcm_token)

        # 로그인 기록 추가
        try:
            r_signal_log.lpush(
                user_id,
                {
                    "type": "login",
                    "title": "로그인",
                    "body": "fcm token 재발급",
                    "time": (datetime.utcnow() + timedelta(hours=9)).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                },
            )
        except Exception as log_error:
            logger.error(f"Error logging FCM token issuance: {log_error}")

    except KeyError as key_error:
        logger.error(f"Invalid message format: missing key {key_error}")
    except Exception as general_error:
        logger.error(f"Error processing message: {general_error}")


##########################################


def consume_notifications():
    for message in notification_consumer:
        logger.info(f"알람 도착: {message.value}")
        send_fcm_notification(message.value)


def consume_tokens():
    for message in token_consumer:
        logger.info(f"사용자 로그인: {message.value}")
        set_fcm_token(message.value)
