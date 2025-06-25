# Makefile for O.D.O. Mate - Art Detection App

#.PHONY: help setup build up down logs clean npm-install npm-build
.PHONY: help build up ps stop down logs clean npm-install npm-build

# Aide
help:
	@echo "🎨 O.D.O. Mate - Art Detection App - Available commands:"
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
	@echo "  init-ssl      - Initialize a SSL Certificate for frontend camera availability"

# Build containers
build:
	@echo "Building Docker containers..."
	docker compose build --no-cache
	@echo "✅ Build completed!"

# Start the application
up:
	@echo "Starting the application..."
	docker compose up -d --build
	@echo "🚀 Application started on:"
	@echo "   - Weaviate:        http://localhost:8080"
	@echo "   - Backend:         http://localhost:8000"
	@echo "   - Public Frontend: https://localhost:3443"
	@echo "   - Admin Frontend:  https://localhost:4443"

# Check status of the application
ps:
	docker compose ps

# Stop the application
stop:
	@echo "Stopping the application..."
	docker compose stop
	@echo "🛑 Application stopped."

# Stop the application and delete containers
down:
	@echo "Stopping and removing containers..."
	docker compose down
	@echo "🗑️ Application stopped and containers removed."

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

# Initialize Weaviate with schema and sample data
init-weaviate:
	docker compose exec backend bash -c "PYTHONPATH=/app python scripts/init_weaviate.py"

# Initialize SSL certificates for frontend
init-ssl:
	sudo apt install libnss3-tools
	curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
	chmod +x mkcert-v*-linux-amd64
	sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
	mkcert -install
	@echo "SSL initialization script executed. Check the backend logs for details."

	cd frontend && \
		mkdir -p certs && \
		mkcert -key-file certs/key.pem -cert-file certs/cert.pem localhost 127.0.1 ::1 && \
		cd ..
	@echo "SSL certificates generated in frontend/certs. You can now run the application with SSL support."
