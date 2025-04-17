import { MIN_PORT, MAX_PORT } from './config.js';

export function getRandomPort(): number {
    return Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
} 