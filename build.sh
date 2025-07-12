#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# 1. Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# 2. Clean up old static files in the backend
echo "Cleaning up old backend static files..."
rm -rf backend/static
mkdir -p backend/static

# 3. Move frontend build to backend static folder
echo "Moving frontend build to backend..."
mv frontend/dist/* backend/static/

echo "Build complete."
