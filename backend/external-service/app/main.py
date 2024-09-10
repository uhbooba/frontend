from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#####################################################################################
import logging

logging.basicConfig(level=logging.DEBUG)
#####################################################################################c



from config.database import SessionLocal, engine, Base
from fastapi import FastAPI
from config.database import engine, Base
from controllers import quiz

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(quiz.router)

@app.get("/health-check")
def read_root():
    return {"Hello": "World"}

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