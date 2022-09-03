import * as Knex from 'knex';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    const users = [
        {
            id: v4(),
            name: 'First User',
            email: 'test-default@mail.com',
            password: await hash('password', 10),
        },
    ];

    await knex('service.users').insert(users);
}
