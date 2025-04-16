import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

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
        })
    ]
});

// Log the start time
logger.info('Application started', { startTime: startTime.toISOString() }); 