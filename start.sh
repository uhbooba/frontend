#!/bin/bash

# 변경된 컨테이너 실행
docker compose -f docker-compose.base.yml -f docker-compose.services.yml -f docker-compose.db.yml -f docker-compose.monitoring.yml -f docker-compose.message-broker.yml -f docker-compose.sonarqube.yml up -d --build
