FROM node:20-alpine

# Environment variables
ENV QBITTORRENT_HOST=
ENV QBITTORRENT_USERNAME=
ENV QBITTORRENT_PASSWORD=
ENV MIN_PORT=49152
ENV MAX_PORT=65535
ENV CHANGE_INTERVAL=3

# Install cron
RUN apk add --no-cache dcron

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Delete unnecessary files
RUN rm -rf ./logs .env dist

# Build TypeScript
RUN npm run build

# Delete unnecessary files
RUN rm -rf ./src

# Create cron job script
RUN echo '#!/bin/sh' > /app/run-cron.sh && \
    echo 'cd /app' >> /app/run-cron.sh && \
    echo 'node dist/index.js' >> /app/run-cron.sh && \
    chmod +x /app/run-cron.sh

# Create cron tab
RUN echo '#!/bin/sh' > /app/setup-cron.sh && \
    echo 'INTERVAL=${CHANGE_INTERVAL:-3}' >> /app/setup-cron.sh && \
    echo 'HOURS=$((INTERVAL / 60))' >> /app/setup-cron.sh && \
    echo 'MINUTES=$((INTERVAL % 60))' >> /app/setup-cron.sh && \
    echo 'if [ "$HOURS" -gt 0 ]; then' >> /app/setup-cron.sh && \
    echo '  echo "$MINUTES */$HOURS * * * /app/run-cron.sh >> /app/logs/cron.log 2>&1" > /etc/crontabs/root' >> /app/setup-cron.sh && \
    echo 'else' >> /app/setup-cron.sh && \
    echo '  echo "*/$MINUTES * * * * /app/run-cron.sh >> /app/logs/cron.log 2>&1" > /etc/crontabs/root' >> /app/setup-cron.sh && \
    echo 'fi' >> /app/setup-cron.sh && \
    chmod +x /app/setup-cron.sh

# Create logs directory
RUN mkdir -p /app/logs

# Set up entrypoint
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"] 