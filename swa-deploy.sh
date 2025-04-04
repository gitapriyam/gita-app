#!/bin/bash

# Default values for environment and action
ENVIRONMENT=${1:-local} # Default to 'local' if no environment is specified
ACTION=${2:-start}      # Default to 'start' if no action is specified

echo "Environment: $ENVIRONMENT"

# Load environment variables from .env file
source .env

# Set environment-specific configurations
case $ENVIRONMENT in
  local)
    API_LOCATION="api"
    APP_LOCATION="src"
    OUTPUT_LOCATION="dist/gita-app/browser"
    FUNC_PATH="/usr/local/bin/func"
    ;;
  development)
    API_LOCATION="api"
    APP_LOCATION="src"
    OUTPUT_LOCATION="dist/gita-app/browser"
    FUNC_PATH="/usr/local/bin/func"
    ;;
  production)
    API_LOCATION="api"
    APP_LOCATION="src"
    OUTPUT_LOCATION="dist/gita-app/browser"
    FUNC_PATH="/usr/local/bin/func"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# Build the application
npm run build:frontend
npm run build:api

# Deploy or start the Static Web App based on the action
if [ "$ACTION" == "start" ]; then
  echo "Starting SWA in environment: $ENVIRONMENT"
  export NODE_ENV=development
  # Start the SWA CLI
  swa --verbose=silly start \
    --config swa-cli.config.json \
    --config-name $ENVIRONMENT \
    --app-location $APP_LOCATION \
    --api-location $API_LOCATION \
    --output-location $OUTPUT_LOCATION 
else
  echo "Deploying to environment: $ENVIRONMENT"
  export NODE_ENV=production
  swa --verbose=silly deploy \
    --config swa-cli.config.json \
    --app-location $APP_LOCATION \
    --api-location $API_LOCATION \
    --config-name $ENVIRONMENT \
    --output-location $OUTPUT_LOCATION \
    --env $ENVIRONMENT \
    --deployment-token $AZURE_STATIC_WEB_APPS_API_TOKEN \
    --app-name gita-app-rg/gita-appa \
    --swa-config-location src \
    --api-language node \
    --api-version 18
fi