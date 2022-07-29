import Knex from 'knex';
import { config } from '@config';

export const getDbConnection = connectionName => Knex(config(`databases.${connectionName}`));
