# ohgood-db/mariadb/Dockerfile
FROM mariadb:11.4

# 문자셋/콜레이션 등 실행 옵션 지정
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci", "--max-connections=200"]

# 초기화 SQL 폴더 복사 (컨테이너 최초 실행 시 적용됨)
COPY ./init.sql /docker-entrypoint-initdb.d

EXPOSE 3306