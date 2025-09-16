# Compose Development

.PHONY: compose-up-dev compose-down-dev compose-build-dev compose-logs-dev

compose-up-dev:
  cat backend/.env frontend/.env > .env.tmp && docker compose --env-file .env.tmp -f compose.dev.yaml up --watch && rm .env.tmp

compose-down-dev:
	docker compose -f compose.dev.yaml down

compose-build-dev:
	docker compose -f compose.dev.yaml build

compose-logs-dev:
	docker compose -f compose.dev.yaml logs -f

# Compose Production

.PHONY: compose-up-prod compose-down-prod compose-build-prod compose-logs-prod

compose-up-prod:
	cat backend/.env frontend/.env > .env.tmp && docker compose --env-file .env.tmp -f compose.prod.yaml up -d && rm .env.tmp

compose-down-prod:
	docker compose -f compose.prod.yaml down

compose-build-prod:
	docker compose -f compose.prod.yaml build

compose-logs-prod:
	docker compose -f compose.prod.yaml logs -f