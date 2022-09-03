import Knex from 'knex';

import { TABLES } from './constants';
import { UsersRepository, UsersRepositoryInterface } from './users.repository';

export interface RepositoryInterface {
    readonly users: UsersRepositoryInterface;

    getDbConnection(): Knex;
}

export class Repository implements RepositoryInterface {
    protected dbConnection: Knex;

    public readonly users: UsersRepositoryInterface;

    constructor(dbConnection: Knex) {
        this.dbConnection = dbConnection;

        this.users = new UsersRepository(TABLES.USERS, this.dbConnection);
    }

    getDbConnection(): Knex<any, unknown[]> {
        return this.dbConnection;
    }
}
