import Knex from 'knex';
import { config } from '@/core/utils';

export const getDbConnection = connectionName => {
    const { connection, client } = config(`databases.${connectionName}`);
    return Knex({ connection, client });
};
