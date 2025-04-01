#!/bin/bash

# Default values for environment and action
ENVIRONMENT=${1:-local} # Default to 'local' if no environment is specified
ACTION=${2:-start}      # Default to 'start' if no action is specified

echo "Environment: $ENVIRONMENT"

# Load environment variables from .env file
source .env

# Function to check if Azurite is running
check_azurite() {
  if nc -z 127.0.0.1 10000 && nc -z 127.0.0.1 10001 && nc -z 127.0.0.1 10002; then
    echo "Azurite is already running."
  else
    echo "Starting Azurite..."
    azurite > /dev/null 2>&1 & # Start Azurite in the background and suppress output
    sleep 2 # Wait for Azurite to start
  fi
}

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
npm run build -- --configuration=$ENVIRONMENT

# Deploy or start the Static Web App based on the action
if [ "$ACTION" == "start" ]; then
  echo "Starting SWA in environment: $ENVIRONMENT"

  # Ensure Azurite is running for local development
  if [ "$ENVIRONMENT" == "local" ]; then
    check_azurite
  fi

  # Start the SWA CLI
  DEBUG=swa:* swa start \
    --config swa-cli.config.json \
    --config-name $ENVIRONMENT \
    --app-location $APP_LOCATION \
    --api-location $API_LOCATION \
    --output-location $OUTPUT_LOCATION \
    --func-path $FUNC_PATH
else
  echo "Deploying to environment: $ENVIRONMENT"
  swa deploy \
    --config swa-cli.config.json \
    --app-location $APP_LOCATION \
    --api-location $API_LOCATION \
    --config-name $ENVIRONMENT \
    --output-location $OUTPUT_LOCATION \
    --env $ENVIRONMENT \
    --deployment-token $AZURE_STATIC_WEB_APPS_API_TOKEN \
    --app-name gita-app-rg/gita-app
fi