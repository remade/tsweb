const configuration = {
    app: {
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
    },
    database: {
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
    logging: {
        format: process.env.LOG_FORMAT || 'dev',
        directory: process.env.LOG_DIR || '../logs',
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
