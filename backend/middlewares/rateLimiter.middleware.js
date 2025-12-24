import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

/**
 * Strict rate limiter for auth endpoints - 20 requests per 15 minutes
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        throw new ApiError(429, 'Too many authentication attempts, please try again later.');
    }
});
