import { QBittorrent } from '@ctrl/qbittorrent';
import { QBITTORRENT_HOST, QBITTORRENT_USERNAME, QBITTORRENT_PASSWORD } from './config.js';
import { logger } from './logger.js';
import { getRandomPort } from './utils.js';

// Create qBittorrent client
const qbt = new QBittorrent({
    baseUrl: QBITTORRENT_HOST,
    username: QBITTORRENT_USERNAME,
    password: QBITTORRENT_PASSWORD
});

export async function changeQBittorrentPort(): Promise<Number> {
    try {
        logger.verbose('Attempting to connect to qBittorrent...');
        
        // Get current preferences
        const preferences = await qbt.getPreferences();
        const currentPort = preferences.listen_port;

        // Generate new random port
        const newPort = getRandomPort();

        // Set new port
        await qbt.setPreferences({ listen_port: newPort });

        logger.info(`Successfully changed port from ${currentPort} to ${newPort}`);
        return newPort;

    } catch (error: any) {
        logger.error('Error changing qBittorrent port:', error);
        logger.error('Connection details:', {
            host: QBITTORRENT_HOST,
            username: QBITTORRENT_USERNAME,
            error: error.message
        });
    }
    return -1;
} 

export default changeQBittorrentPort;