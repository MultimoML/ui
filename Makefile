# https://makefiletutorial.com/

.PHONY: dev build-deploy build deploy

dev:
	npm run dev

build-deploy:
	make build && \
	make deploy

build:
	sudo docker build -t multimoml/ui:latest .

deploy:
	sudo docker-compose -f docker-compose.yml --env-file .env up -d --force-recreate
