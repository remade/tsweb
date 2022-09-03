const configuration = {
    app: {
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
    },
    databases: {
        core: {
            client: 'postgres',
            connection: {
                charset: 'utf8',
                timezone: 'UTC',
                host: process.env.DB_HOST || '127.0.0.1',
                port: process.env.DB_PORT || 5432,
                user: process.env.DB_USER || 'remi',
                password: process.env.DB_PASSWORD || 'root',
                database: process.env.DB_DATABASE,
            },
            pool: {
                min: 2,
                max: 10,
            },
        },
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT || 6379,
    },
    logging: {
        format: process.env.LOG_FORMAT || 'dev',
        directory: process.env.LOG_DIR || '../logs',
    },
    settings: {
        carts: {
            item_expiry: process.env.CART_ITEM_EXPIRY || 30, //minutes
        },
    },
};

/**
 * Get config values
 *
 * @param key
 */
export const config = (key: string) => {
    try {
        return key.split('.').reduce((config: any, element: string) => config[element], configuration);
    } catch (error) {
        return undefined;
    }
};
