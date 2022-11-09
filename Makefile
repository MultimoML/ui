# https://makefiletutorial.com/

.PHONY: dev build serve

dev:
	npm run dev

build:
	npm run build

serve:
	node ./dist/server/entry.mjs

test: # Do not use
	make build
	docker build . -t rsocena/ui:latest
	docker run -it -p 3000:3000 --name ui rsocena/ui:latest
	docker ps -a
	curl -i localhost:3000
	docker kill ui
	docker rm ui --force

	docker image ls
	docker image prune -a

	cd deployments/ui/
	openssl req -newkey rsa:4096  -x509  -sha512  -days 365 -nodes -out cert.pem -keyout key.pem
	docker-compose pull && docker-compose up -d --remove-orphans
	docker logs ui

performance-test:
	lighthouse http://localhost:3000/ --view

portainer-on-podman:
	sudo podman run -d -p 9443:9443 --privileged -v /run/podman/podman.sock:/var/run/docker.sock:Z portainer/portainer-ce