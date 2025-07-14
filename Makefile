# Makefile for O.D.O. Mate - Art Detection App

#.PHONY: help setup build up down logs clean npm-install npm-build
.PHONY: help build start up ps stop down logs clean init-weaviate admin-npm-install admin-npm-build admin-init-ssl admin-sh

# Help command
help:
	@echo "🎨 O.D.O. Mate - Art Detection App - Available commands:"
	@echo "  build              - Build Docker containers"
	@echo "  start              - Start the application without rebuilding containers"
	@echo "  up                 - Start the application after rebuilding containers"
	@echo "  ps                 - Check status of the application"
	@echo "  stop               - Stop the application"
	@echo "  down               - Stop the application and delete containers"
	@echo "  logs               - Watch logs of the application"
	@echo "  clean              - Clean up containers and volumes"
	@echo "  init-weaviate      - Initialize Weaviate with the schema and data"
	@echo "  admin-npm-install  - Install npm dependencies in the admin frontend"
	@echo "  admin-npm-build    - Build the production version of the admin frontend"
	@echo "  admin-init-ssl     - Initialize a SSL Certificate for admin frontend"
	@echo "  admin-sh           - Open a shell in the admin frontend container"
	@echo "  public-npm-install  - Install npm dependencies in the public frontend"
	@echo "  public-npm-build    - Build the production version of the public frontend"
	@echo "  public-init-ssl     - Initialize a SSL Certificate for public frontend"
	@echo "  public-sh           - Open a shell in the public frontend container"

# Build containers
build:
	@echo "Building Docker containers..."
	docker compose build --no-cache
	@echo "✅ Build completed!"

# Start the application without rebuilding containers
start:
	@echo "Starting the application..."
	UID=$(id -u) GID=$(id -g) docker compose up -d
	@echo "🚀 Application started on:"
	@echo "   - Weaviate:        http://localhost:8080"
	@echo "   - Backend:         http://localhost:8000"
	@echo "   - Public Frontend: https://localhost:3443"
	@echo "   - Admin Frontend:  https://localhost:4443"

# Start the application after rebuilding containers
up:
	@echo "Starting the application..."
	UID=$(id -u) GID=$(id -g) docker compose up -d --build
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

# Initialize Weaviate with schema and sample data
init-weaviate:
	docker compose exec backend bash -c "PYTHONPATH=/app python scripts/init_weaviate.py"

# NPM install
admin-npm-install:
	docker run --rm -v $$(pwd)/frontend-admin:/app -w /app node:24-alpine npm install

# NPM build
admin-npm-build:
	docker run --rm -v $$(pwd)/frontend-admin:/app -w /app node:24-alpine npm run build

# Initialize SSL certificates for admin frontend
admin-init-ssl:
	sudo apt install libnss3-tools
	curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
	chmod +x mkcert-v*-linux-amd64
	sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
	mkcert -install
	@echo "SSL initialization script executed. Check the backend logs for details."

	cd frontend-admin && \
		mkdir -p certs && \
		mkcert -key-file certs/key.pem -cert-file certs/cert.pem localhost 127.0.1 ::1 && \
		cd ..
	@echo "SSL certificates generated in frontend-admin/certs. You can now run the application with SSL support."

# Open a shell in the public frontend container
admin-sh:
	docker compose exec frontend-public sh

# NPM install
public-npm-install:
	docker run --rm -v $$(pwd)/frontend-public:/app -w /app node:24-alpine npm install

# NPM build
public-npm-build:
	docker run --rm -v $$(pwd)/frontend-public:/app -w /app node:24-alpine npm run build

# Initialize SSL certificates for public frontend
public-init-ssl:
	sudo apt install libnss3-tools
	curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
	chmod +x mkcert-v*-linux-amd64
	sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
	mkcert -install
	@echo "SSL initialization script executed. Check the backend logs for details."

	cd frontend-public && \
		mkdir -p certs && \
		mkcert -key-file certs/key.pem -cert-file certs/cert.pem localhost 127.0.1 ::1 && \
		cd ..
	@echo "SSL certificates generated in frontend-public/certs. You can now run the application with SSL support."

# Open a shell in the admin frontend container
public-sh:
	docker compose exec frontend-public sh
