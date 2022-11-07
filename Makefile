# https://makefiletutorial.com/

.PHONY: dev build serve

dev:
	npm run dev

build:
	npm run build

serve:
	node ./dist/server/entry.mjs
