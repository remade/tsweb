import { Router } from 'express';
import { IndexController } from '@/api/controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();

    protected controller: IndexController;

    constructor() {
        this.controller = new IndexController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.index);
    }
}

export default IndexRoute;
