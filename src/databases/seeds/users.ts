import * as Knex from 'knex';
import { hash } from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    const hashedPassword = await hash('password', 10);
    await knex('service.users').insert([
        {
            id: 'a63bb429-2440-428d-b50a-c67248c9281c',
            name: 'First User',
            email: 'test@mail.com',
            password: hashedPassword,
        },
    ]);
}
