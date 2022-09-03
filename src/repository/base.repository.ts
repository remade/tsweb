import Knex from 'knex';

export interface BaseRepositoryInterface<TModel> {
    getContext(schema?: string);
    create(data: TModel);
    bulkCreate(data: any[]);
    exists(where: any);
    find(where: any);
    findOne(where: any);
    findById(id: number | string);
    findByIdIn(values: string[]);
    update(id: string, data: TModel);
    updateBy(where: any, data: TModel);
    delete(where: any);
}

export abstract class BaseRepository<TModel> {
    protected dbConnection: Knex;
    protected table: string;

    constructor(table: string, dbConnection: Knex) {
        this.table = table;
        this.dbConnection = dbConnection;
    }

    getContext(schema?: string) {
        return this.dbConnection(schema || this.table);
    }

    async create(data: TModel) {
        return this.getContext().insert(data);
    }

    async bulkCreate(data: any[]) {
        return this.dbConnection.batchInsert(this.table, data);
    }

    async exists(where: any = {}) {
        const rows = await this.getContext().where(where).select('id');
        return rows.length > 0;
    }

    async find(where: any = {}) {
        return this.getContext().where(where).select('*');
    }

    async findOne(where: any = {}) {
        return this.getContext().where(where).first('*');
    }

    async findById(id: number | string) {
        return this.getContext().where('id', id).first('*');
    }

    async findByIdIn(values: string[]) {
        return this.getContext().whereIn('id', values).select('*');
    }

    async update(id: number | string, data: TModel) {
        return this.getContext().where('id', id).update(data);
    }

    updateBy(where: any, data: TModel) {
        return this.getContext().where(where).update(data);
    }

    delete(where: any) {
        return this.getContext().where(where).delete();
    }
}
