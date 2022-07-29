import App from '@/app';

import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import { Repository, RepositoryInterface } from './repository';
import { getDbConnection } from '@databases';

validateEnv();

const repository: RepositoryInterface = new Repository(getDbConnection('core'));

const app = new App([new IndexRoute(repository)]);

app.listen();
