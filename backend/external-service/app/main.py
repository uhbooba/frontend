# import os
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#####################################################################################
import sys

from fastapi import FastAPI

from .config.database import SessionLocal
from .config.database import engine, Base
from .controllers import (
    chat_controller,
    quiz_controller,
    tts_controller,
    video_controller,
    redis_controller,
)
from .eureka_register import register_with_eureka

#####################################################################################
Base.metadata.create_all(bind=engine)
app = FastAPI(
    root_path="externals",
    openapi_url="/v3/api-docs",  # OpenAPI 문서 경로 설정
    docs_url="/docs",  # Swagger UI 경로 설정
)
#####################################################################################
app.include_router(chat_controller.router)
app.include_router(quiz_controller.router)
app.include_router(redis_controller.router)
app.include_router(tts_controller.router)
app.include_router(video_controller.router)


@app.get("/health-check")
def read_root():
    return {"Hello": "World"}


#####################################################################################c
@app.on_event("startup")
def startup_event():
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
