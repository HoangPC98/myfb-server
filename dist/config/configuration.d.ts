declare const _default: () => {
    env: string;
    port: number;
    database: {
        type: string;
        database: string;
        host: string;
        port: number;
        username: string;
        password: string;
        logging: boolean;
    };
    ggAuth: {
        clientId: string;
        clientSecret: string;
    };
    jwtAuth: {
        access_token_ttl: string;
        refresh_token_ttl: string;
        jwt_token_secret: string;
    };
    redis: {
        host: string;
        port: number;
    };
    caching: {
        ttl: number;
        cache_refresh_token_ttl: number;
    };
};
export default _default;
