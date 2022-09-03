import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { RepositoryInterface } from '@/repository';
import validateRequestMiddleware from '@/api/middlewares/validatesRequest.middleware';

import { validator } from '@/core/utils';
import { UsersController } from '@/api/controllers/users.controller';

class UsersRoute implements Routes {
    public path = '/users';
    public router = Router();

    protected controller: UsersController;
    protected repository: RepositoryInterface;

    protected validationSchemas = {
        createUser: () => {
            return validator.object({
                email: validator.string().required().email(),
                password: validator.string().required(),
                name: validator.string(),
            });
        },
    };

    constructor(repository: RepositoryInterface) {
        this.repository = repository;
        this.controller = new UsersController(this.repository);

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', validateRequestMiddleware(this.validationSchemas.createUser), this.controller.createUser);
    }
}

export default UsersRoute;
