"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    env: process.env.NODE_ENV || 'develop',
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
        type: 'mysql',
        database: process.env.DATABASE_NAME || 'fb',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME || 'hoangpc',
        password: process.env.DATABASE_PASSWORD || 'hoangpc',
        logging: true,
    },
    ggAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    jwtAuth: {
        access_token_ttl: process.env.JWT_ACCESS_TOKEN_TTL || '15m',
        refresh_token_ttl: process.env.JWT_REFRESH_TOKEN_TTL || '7d',
        jwt_token_secret: process.env.JWT_TOKEN_SECRET,
    },
    redis: {
        host: process.env.REDIS_HOST || 'fb-redis',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    caching: {
        ttl: parseInt(process.env.CACHE_TTL, 10) || -1,
        cache_refresh_token_ttl: parseInt(process.env.CACHE_REFRESH_TOKEN_TTL, 10) || -1,
    },
});
//# sourceMappingURL=configuration.js.map