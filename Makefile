# Makefile for O.D.O. Mate - Art Detection App

#.PHONY: help setup build up down logs clean npm-install npm-build
.PHONY: help build up ps stop down logs clean npm-install npm-build

# Aide
help:
	@echo "🎨 O.D.O. Mate - Art Detection App - Available commands:"
#	@echo "  setup        - Full project initialization"
	@echo "  build         - Build Docker containers"
	@echo "  up            - Start the application"
	@echo "  ps            - Check status of the application"
	@echo "  stop          - Stop the application"
	@echo "  down          - Stop the application and delete containers"
	@echo "  logs          - Watch logs of the application"
	@echo "  clean         - Clean up containers and volumes"
	@echo "  npm-install   - Install npm dependencies"
	@echo "  npm-build     - Build the production version of the frontend"
	@echo "  init-weaviate - Initialize Weaviate with the schema and data"

## Initialisation du projet
#setup:
#	@echo "📁 Création des dossiers..."
#	mkdir -p frontend backend database uploads logs
#	@echo "📦 Installation des dépendances npm..."
#	docker run --rm -v $$(pwd)/frontend:/app -w /app node:18-alpine npm install
#	@echo "✅ Setup terminé!"

# Build containers
build:
	docker compose build

# Start the application
up:
	docker compose up -d
	@echo "🚀 Application started on:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8000"
	@echo "  Weaviate: http://localhost:8080"

# Check status of the application
ps:
	docker compose ps

# Stop the application
stop:
	docker compose stop

# Stop the application and delete containers
down:
	docker compose down
	#docker volume rm odomate_weaviate_data

# Watch logs
logs:
	docker compose logs -f

# Clean up containers and volumes
clean:
	docker compose down -v
	docker system prune -f

# NPM install
npm-install:
	docker run --rm -v $$(pwd)/frontend:/app -w /app node:24-alpine npm install

# NPM build
npm-build:
	docker run --rm -v $$(pwd)/frontend:/app -w /app node:24-alpine npm run build

## Commandes de développement
#dev-frontend:
#	docker run --rm -it -v $$(pwd)/frontend:/app -w /app -p 3000:3000 node:18-alpine npm start
#
#dev-backend:
#	docker compose up backend postgres redis

init-weaviate:
	docker compose exec backend bash -c "PYTHONPATH=/app python scripts/init_weaviate.py"
