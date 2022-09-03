import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: `.env` });

import { config } from './src/utils/config';
const { connection, client } = config('databases.core');

module.exports = {
    connection,
    client,
    migrations: {
        directory: 'databases/migrations',
        tableName: 'migrations',
        // stub: 'src/databases/stubs',
    },
    seeds: {
        directory: 'databases/seeds',
        // stub: 'src/databases/stubs',
    },
};
