# qBittorrent Port Fix

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/xmerr/qbittorrent-port-cycle)  [![Docker Hub](https://img.shields.io/badge/Docker%20Hub-Repository-blue)](https://hub.docker.com/r/xmer/qbittorrent-port-cycle)

This project automatically changes the listening port in qBittorrent at regular intervals to help maintain optimal connectivity and avoid potential port blocking issues.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `QBITTORRENT_HOST` | The host address of your qBittorrent Web UI (e.g., `http://localhost:8080`) | Yes | - |
| `QBITTORRENT_USERNAME` | Username for qBittorrent Web UI authentication | Yes | - |
| `QBITTORRENT_PASSWORD` | Password for qBittorrent Web UI authentication | Yes | - |
| `MIN_PORT` | Minimum port number to use | No | 49152 |
| `MAX_PORT` | Maximum port number to use | No | 65535 |
| `CHANGE_INTERVAL` | Time interval between port changes in minutes | No | 720 |
| `WEBHOOK_URL` | Discord webhook URL for logging notifications | No | - |

## Docker Usage

### Using Docker Run

```
docker run -d \
    --name=qbittorrent-port-cycle \
    -e QBITTORRENT_HOST=http://localhost:8080 \
    -e QBITTORRENT_USERNAME=admin \
    -e QBITTORRENT_PASSWORD=adminadmin \
    -e WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url \
    --restart unless-stopped \
    xmer/qbittorrent-port-cycle:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file with the following content:

```yaml
version: '3'
services:
  qbittorrent-port-cycle:
    image: xmer/qbittorrent-port-cycle:latest
    container_name: qbittorrent-port-cycle
    environment:
      - QBITTORRENT_HOST=http://localhost:8080
      - QBITTORRENT_USERNAME=admin
      - QBITTORRENT_PASSWORD=adminadmin
      # Optional variables
      - MIN_PORT=49152
      - MAX_PORT=65535
      - CHANGE_INTERVAL=360
      - WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
    restart: unless-stopped
```