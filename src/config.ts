// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// qBittorrent connection settings
export const QBITTORRENT_HOST = process.env.QBITTORRENT_HOST;
export const QBITTORRENT_USERNAME = process.env.QBITTORRENT_USERNAME;
export const QBITTORRENT_PASSWORD = process.env.QBITTORRENT_PASSWORD;

// Port range settings (standard port range for BitTorrent)
export const MIN_PORT = parseInt(process.env.MIN_PORT || '49152', 10);
export const MAX_PORT = parseInt(process.env.MAX_PORT || '65535', 10);

// Time between port changes (in hours)
export const CHANGE_INTERVAL = parseInt(process.env.CHANGE_INTERVAL || '3', 10);
