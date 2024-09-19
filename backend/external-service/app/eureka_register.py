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
            # Eureka에 서비스 등록
            response = requests.post(eureka_server, json=data, headers=headers)
            logger.warning(f"성공!!")
            
            # Heartbeat 주기적으로 보내기
            if response.status_code == 204:
                instance_id = "external-service"  # eureka에서 고유 인스턴스 ID
                heartbeat_url = f"http://eureka-server:8761/eureka/apps/EXTERNAL-SERVICE/{instance_id}"
                while True:
                    try:
                        heartbeat_response = requests.put(heartbeat_url, headers=headers)
                        if heartbeat_response.status_code == 200:
                            logger.warning("Heartbeat 성공")
                        else:
                            logger.warning(f"Heartbeat 실패, 상태 코드: {heartbeat_response.status_code}")
                    except Exception as e:
                        logger.warning(f"Error sending heartbeat to Eureka: {e}")
                    
                    time.sleep(30)  # Heartbeat 간격 (기본 30초)
                
        except Exception as e:
            logger.warning(f"Error registering with Eureka: {e}")
        
        time.sleep(30)  # 재시도 간격 설정

register_with_eureka()
