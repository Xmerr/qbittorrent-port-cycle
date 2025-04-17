#!/bin/sh

# Set up cron job based on environment variable
/app/setup-cron.sh

# Start cron in foreground
crond -f -l 8 