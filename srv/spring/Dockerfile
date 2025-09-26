# -------- 1) Build stage: Gradle로 부트 JAR 빌드 --------
    FROM gradle:8.9-jdk17-alpine AS build
    WORKDIR /app
    # Gradle 캐시 최적화
    COPY build.gradle settings.gradle ./
    COPY gradle ./gradle
    RUN gradle --version
    
    # 소스 복사 후 빌드
    COPY src ./src
    # (필요시) QueryDSL Q-클래스 생성까지 포함
    RUN gradle clean bootJar --no-daemon
    
    # -------- 2) Runtime stage: JRE + FFmpeg --------
    FROM eclipse-temurin:17-jre-alpine
    WORKDIR /app
    
    # FFmpeg & 타임존 & OpenSSL
    RUN apk add --no-cache ffmpeg tzdata openssl
    
    # (옵션) 비루트 사용자
    RUN addgroup -S app && adduser -S app -G app
    USER app
    
    # 빌드 결과 복사
    COPY --from=build /app/build/libs/*.jar /app/app.jar
    
    EXPOSE 8080
    # 헬스/메모리 기본값은 운영에 맞춰 조절
    ENTRYPOINT ["java","-XX:+UseG1GC","-Xms256m","-Xmx512m","-jar","/app/app.jar","--server.port=8080"]