#!/bin/sh

# Create logs directory if it doesn't exist
mkdir -p /app/logs

# Set up cron job based on environment variable
/app/setup-cron.sh

# Start cron in foreground with logging
crond -f -l 8 