import { RepositoryInterface } from '@/repository';
import { NextFunction, Request, Response } from 'express';

export class IndexController {
    protected repository: RepositoryInterface;

    constructor(repository: RepositoryInterface) {
        this.repository = repository
    }

    public index = (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    };
}
