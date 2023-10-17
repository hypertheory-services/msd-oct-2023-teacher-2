docker-compose -f dev-environment/docker-compose.dev.yml down
docker volume rm dev-environment_db_data
docker-compose -f dev-environment/docker-compose.dev.yml up -d