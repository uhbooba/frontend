# import sys
# import os
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#####################################################################################
from .config.database import SessionLocal, engine, Base
from .eureka_register import register_with_eureka
from fastapi import FastAPI
from .config.database import engine, Base
from .controllers import quiz, tts
#####################################################################################c
Base.metadata.create_all(bind=engine)
app = FastAPI(
    openapi_url="/external-service/v3/api-docs",  # OpenAPI 문서 경로 설정
    docs_url="/external-service/docs",            # Swagger UI 경로 설정
)
#####################################################################################c
app.include_router(quiz.router)
app.include_router(tts.router)


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
    print('You pressed Ctrl+C!')
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)

    config = uvicorn.Config("main:app", port=8000, log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()