
import * as dotenv from 'dotenv';
dotenv.config()

import App from '@/app';

import IndexRoute from '@/api/routes/index.route';
import validateEnv from '@/core/utils/validateEnv';
import { Repository, RepositoryInterface } from './repository';
import { getDbConnection } from './core/utils';
import UsersRoute from './api/routes/users.route';

validateEnv();

const repository: RepositoryInterface = new Repository(getDbConnection('core'));

const app = new App([
    new IndexRoute(),
    new UsersRoute(repository),
]);

app.listen();
