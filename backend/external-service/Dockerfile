FROM python:3.10

WORKDIR /code

COPY ./app/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

ENV PYTHONIOENCODING=utf-8

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8083", "--proxy-headers", "--root-path", "/external-service"]
