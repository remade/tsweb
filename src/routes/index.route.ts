import { Router } from 'express';
import { IndexController } from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { RepositoryInterface } from '@/repository';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();

    protected controller: IndexController;
    protected repository: RepositoryInterface;

    constructor(repository: RepositoryInterface) {
        this.repository = repository;
        this.controller = new IndexController(this.repository);

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.index);
    }
}

export default IndexRoute;
