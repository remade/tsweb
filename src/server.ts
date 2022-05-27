import App from '@/app';

import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import { Repository, RepositoryInterface } from './repository';
import db from '@databases'

validateEnv();

const repository: RepositoryInterface = new Repository(db)

const app = new App([
    new IndexRoute(repository), 
]);

app.listen();
