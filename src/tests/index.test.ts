import request from 'supertest';
import { Repository, RepositoryInterface } from '../repository';
import App from './../app';
import IndexRoute from './../routes/index.route';
import db from '@databases'

jest.mock('./../databases')
jest.mock('./../middlewares/auth.middleware.ts', () => jest.fn((req, res, next) => {
    res.locals.user = testUser
    next()
}));
jest.mock('./../middlewares/validatesrequests.middleware.ts', () => jest.fn(() =>{
    return (req, res, next) =>  next()
})


const repository: RepositoryInterface = new Repository(db);
const quizRoute = new QuizRoute(repository);
const app = new App([quizRoute]);

describe('Testing Index', () => {

    afterAll(async () => {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const indexRoute = new IndexRoute();
            const app = new App([indexRoute]);
            return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
        });
    });
});
