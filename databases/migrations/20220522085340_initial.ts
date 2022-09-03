import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .withSchema('service')

        .createTable('users', function (table) {
            table.uuid('id').primary().unique().notNullable();

            table.string('name');
            table.string('email').unique().notNullable();
            table.string('password');

            table.timestamps(true, true);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .withSchema('service')
        .dropTable('users');
}
