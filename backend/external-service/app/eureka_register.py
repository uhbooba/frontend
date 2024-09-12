import requests
import time

from .config.logger import setup_logger

logger = setup_logger("app")

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
                "name": "MyOwn"
            },
            "healthCheckUrl": "http://external-service:8083/health-check",
            "statusPageUrl": "http://external-service:8083/health-check",
        }
    }

    while True:
        try:
            response = requests.post(eureka_server, json=data, headers=headers)
            logger.warning(f"성공!!")
            if response.status_code == 204:
                break
        except Exception as e:
            logger.warning(f"Error registering with Eureka: {e}")
        time.sleep(10)  # 재시도 간격 설정

register_with_eureka()
