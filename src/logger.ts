import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import axios from 'axios';
import TransportStream from 'winston-transport';
import { WEBHOOK_URL } from './config.js';

// Generate timestamp for initial log filename
const startTime = new Date();

// Configure daily rotate file transport
const fileTransport = new DailyRotateFile({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD_HH_mm_ss',
    maxSize: '20m', // Rotate when file reaches 20MB
    maxFiles: '7d',
    zippedArchive: true, // Compress old log files
    auditFile: 'logs/audit.json' // Keep track of rotated files
});

// Custom Discord webhook transport
class DiscordWebhookTransport extends TransportStream {
    private webhookUrl: string;

    constructor(opts: any) {
        super(opts);
        this.webhookUrl = opts.webhookUrl;
    }

    log(info: any, callback: () => void) {
        const { level, message, ...meta } = info;
        
        // Format the message for Discord
        const discordMessage = {
            embeds: [{
                title: `[${level.toUpperCase()}] ${message}`,
                description: Object.keys(meta).length > 0 ? '```json\n' + JSON.stringify(meta, null, 2) + '\n```' : '',
                color: this.getColorForLevel(level),
                timestamp: new Date().toISOString()
            }]
        };

        if (!this.webhookUrl) {
            return;
        }

        // Send to Discord webhook
        axios.post(this.webhookUrl, discordMessage)
            .catch(error => {
                console.error('Failed to send log to Discord:', error);
            })
            .finally(() => {
                callback();
            });
    }

    private getColorForLevel(level: string): number {
        switch (level) {
            case 'error': return 0xFF0000; // Red
            case 'warn': return 0xFFA500;  // Orange
            case 'info': return 0x00FF00;  // Green
            case 'debug': return 0x0000FF; // Blue
            default: return 0x808080;      // Gray
        }
    }
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        fileTransport,
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new DiscordWebhookTransport({
            webhookUrl: WEBHOOK_URL,
            level: 'info'
        })
    ]
});

// Log the start time
logger.verbose('Application started', { startTime: startTime.toISOString() }); 