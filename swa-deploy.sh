#!/bin/bash

# Default values for environment and action
ENVIRONMENT=${1:-development}
ACTION=${2:-start}

# Load environment variables from .env file
source .env

# Build the application
npm run build -- --configuration=$ENVIRONMENT

# Deploy or start the Static Web App based on the action
if [ "$ACTION" == "start" ]; then
  echo "Starting SWA in environment: $ENVIRONMENT"
  swa start \
    --config swa-cli.config.json \
    --config-name $ENVIRONMENT \
    --app-location src \
    --output-location dist/gita-app/browser
else
  echo "Deploying to environment: $ENVIRONMENT"
  swa deploy \
    --config swa-cli.config.json \
    --app-location src \
    --config-name $ENVIRONMENT \
    --output-location dist/gita-app/browser \
    --env $ENVIRONMENT \
    --deployment-token $AZURE_STATIC_WEB_APPS_API_TOKEN \
    --app-name gita-app-rg/gita-app
fi