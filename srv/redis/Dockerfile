# ohgood-db/redis/Dockerfile
FROM redis:7.4-alpine

# AOF 모드 활성화 (데이터 영속성)
CMD ["redis-server", "--appendonly", "yes"]

EXPOSE 6379