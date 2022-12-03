# https://makefiletutorial.com/

ver =

all: help

.PHONY: help run build compose build-deploy tag release

help: ## Prints the help menu
	@echo Usage: make [command]
	@echo
	@echo Commands:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf"  \033[36m%-30s\033[0m%s\n", $$1, $$2}'


run: ## Runs the microservice
	npm run dev

build: ## Builds the Docker image
    ifeq (, $(shell groups | grep docker))
		sudo docker build -t multimoml/ui:latest .
    else
		docker build -t multimoml/ui:latest .
    endif

compose: ## Deploy the microservice using Docker Compose
    ifeq (, $(shell groups | grep docker))
		sudo docker-compose -f docker-compose.yml --env-file .env up -d --force-recreate
    else
		docker-compose -f docker-compose.yml --env-file .env up -d --force-recreate
    endif

build-deploy: build compose ## Builds and deploys the microservice

tag: ## Updates the project version and creates a Git tag with a changelog
    ifndef ver
		git tag -l
    else
		sed -i 's/:v[0-9.]*/:v'$(ver)'/' .github/workflows/publish.yml

		# Commit all changed files
		git add .

		# Creates a new Git tag with a changelog
		git commit -qm "Bump project version to $(ver)"
		printf "Release v$(ver)\n\nChangelog:\n" > changelog.txt
		git log $(shell git describe --tags --abbrev=0)..HEAD~1 --pretty=format:"  - %s" >> changelog.txt
		git tag -asF changelog.txt v$(ver)
		rm changelog.txt
    endif

release: tag ## Create a new release and push it
	git push --follow-tags