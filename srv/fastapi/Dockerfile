# -------- Build stage --------
    FROM python:3.13.7-slim AS base
    WORKDIR /app
    
    ENV PYTHONDONTWRITEBYTECODE=1 \
        PYTHONUNBUFFERED=1 \
        PIP_NO_CACHE_DIR=1
    
    # 빌드 툴 & DB 드라이버용 패키지 (필요에 맞춰 추가)
    RUN apt-get update && apt-get install -y \
        build-essential \
        default-libmysqlclient-dev \
        pkg-config \
        && rm -rf /var/lib/apt/lists/*
    
    # requirements 설치
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    # -------- Runtime stage --------
    FROM python:3.13.7-slim
    WORKDIR /app
    
    # base 스테이지에서 설치한 패키지 복사
    COPY --from=base /usr/local /usr/local
    
    # 앱 소스 복사
    COPY ./app ./app
    
    # 비루트 사용자 권장
    RUN useradd -m appuser
    USER appuser
    
    EXPOSE 8000
    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]