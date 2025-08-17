# Compose Development

.PHONY: compose-up-dev compose-down-dev compose-build-dev compose-logs-dev

compose-up-dev:
	docker compose -f compose.dev.yaml up --watch

compose-down-dev:
	docker compose -f compose.dev.yaml down

compose-build-dev:
	docker compose -f compose.dev.yaml build

compose-logs-dev:
	docker compose -f compose.dev.yaml logs -f