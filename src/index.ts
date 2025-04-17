import { logger } from './logger.js';
import { changeQBittorrentPort } from './changeQBittorrentPort.js';

async function main(): Promise<void> {
    logger.verbose('Starting qBittorrent Port Changer');
    try {
        await changeQBittorrentPort();
        logger.verbose('Port change completed successfully');
    } catch (error) {
        logger.error('Error changing port:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    logger.info('Port changer stopped by user');
    process.exit(0);
});

main().catch(error => {
    logger.error('Fatal error:', error);
    process.exit(1);
}); 