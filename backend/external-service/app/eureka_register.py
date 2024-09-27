import threading
import time

import requests

from .config.logger import setup_logger

logger = setup_logger("app")


def send_heartbeat(eureka_server, instance_id, headers):
    heartbeat_url = f"{eureka_server}/{instance_id}"
    while True:
        try:
            heartbeat_response = requests.put(heartbeat_url, headers=headers)
            if heartbeat_response.status_code == 200:
                hello = "world"
                # logger.warning("Heartbeat 성공")
            else:
                logger.warning(
                    f"Heartbeat 실패, 상태 코드: {heartbeat_response.status_code}"
                )
        except Exception as e:
            logger.warning(f"Error sending heartbeat to Eureka: {e}")
        time.sleep(30)  # 30초마다 Heartbeat 전송


def register_with_eureka():
    eureka_server = "http://eureka-server:8761/eureka/apps/EXTERNAL-SERVICE"
    headers = {"Content-Type": "application/json"}
    data = {
        "instance": {
            "hostName": "external-service",
            "app": "EXTERNAL-SERVICE",
            "ipAddr": "external-service",
            "vipAddress": "external-service",
            "port": {"$": 8083, "@enabled": "true"},
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn",
            },
            "healthCheckUrl": "http://external-service:8083/health-check",
            "statusPageUrl": "http://external-service:8083/health-check",
        }
    }

    try:
        # Eureka에 서비스 등록
        response = requests.post(eureka_server, json=data, headers=headers)
        if response.status_code in [204, 200]:  # 성공적인 등록
            logger.warning("Eureka에 서비스 성공적으로 등록됨")

            # Heartbeat 주기적으로 보내기 위해 스레드 시작
            instance_id = "external-service"  # Eureka에서 고유 인스턴스 ID
            heartbeat_thread = threading.Thread(
                target=send_heartbeat, args=(eureka_server, instance_id, headers)
            )
            heartbeat_thread.daemon = True
            heartbeat_thread.start()

        else:
            logger.warning(f"Eureka에 등록 실패, 상태 코드: {response.status_code}")
    except Exception as e:
        logger.warning(f"Eureka 등록 중 에러 발생: {e}")


register_with_eureka()
