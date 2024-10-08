import sys
import time

from fastapi import FastAPI
from starlette.responses import Response
from prometheus_client import Counter, Histogram, Gauge, CONTENT_TYPE_LATEST, generate_latest

from .config.database import SessionLocal
from .config.database import engine, Base
from .controllers import (
    chat_controller,
    quiz_controller,
    tts_controller,
    video_controller,
    redis_controller,
    smishing_controller,
    kafka_controller,
)
from .eureka_register import register_with_eureka
from .services.signal_service import consume_notifications, consume_tokens

#####################################################################################
Base.metadata.create_all(bind=engine)
app = FastAPI(
    root_path="/external-service",
    openapi_url="/v3/api-docs",  # OpenAPI 문서 경로 설정
    docs_url="/docs",  # Swagger UI 경로 설정
)
#####################################################################################
app.include_router(chat_controller.router)
app.include_router(quiz_controller.router)
app.include_router(redis_controller.router)
app.include_router(tts_controller.router)
app.include_router(video_controller.router)
app.include_router(smishing_controller.router)
app.include_router(kafka_controller.router)


@app.get("/health-check")
def read_root():
    return {"Hello": "World"}

######################################################################################
# Prometheus 메트릭 설정
REQUEST_COUNT = Counter('http_requests_total', 'Total number of HTTP requests', ['method', 'endpoint'])
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'Histogram for the duration in seconds', ['method', 'endpoint'])
IN_PROGRESS = Gauge('http_inprogress_requests', 'Number of in progress HTTP requests')

# 요청 타이머 데코레이터
@app.middleware("http")
async def add_prometheus_metrics(request, call_next):
    method = request.method
    endpoint = request.url.path

    REQUEST_COUNT.labels(method=method, endpoint=endpoint).inc()  # 요청 카운터 증가
    start_time = time.time()  # 요청 시작 시간

    IN_PROGRESS.inc()  # 진행 중인 요청 증가
    response = await call_next(request)  # 요청 처리
    IN_PROGRESS.dec()  # 진행 중인 요청 감소

    latency = time.time() - start_time  # 요청 처리 시간 계산
    REQUEST_LATENCY.labels(method=method, endpoint=endpoint).observe(latency)

    return response

# Prometheus /metrics 엔드포인트
@app.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

import threading

# 병렬실행
notification_thread = threading.Thread(target=consume_notifications, daemon=True)
token_thread = threading.Thread(target=consume_tokens, daemon=True)

notification_thread.start()
token_thread.start()


#####################################################################################c
@app.on_event("startup")
def startup_event():
    if not app.openapi_schema:
        openapi_schema = app.openapi()
        openapi_schema["components"]["securitySchemes"] = {
            "API Header": {
                "type": "apiKey",
                "name": "access",
                "in": "header",
            }
        }
        openapi_schema["servers"] = [{"url": "/external-service"}]
        openapi_schema["security"] = [{"API Header": []}]
        app.openapi_schema = openapi_schema

    register_with_eureka()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#####################################################################################c
import signal
import uvicorn


def signal_handler(sig, frame):
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)

    config = uvicorn.Config("main:app", port=8000, log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()
