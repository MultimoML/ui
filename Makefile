# https://makefiletutorial.com/

.PHONY: dev build serve ui test

dev:
	npm run dev

build:
	sudo docker build . -t multimoml/ui:latest

serve:
	node ./dist/server/entry.mjs

ui:
	sudo docker-compose -f docker-compose.yml --env-file .env up -d --force-recreate

performance-test:
	lighthouse https://multimo.ml --view
