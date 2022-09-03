import { CreateUserDto } from '@/api/dtos/users.dto';
import { RepositoryInterface } from '@/repository';
import { UserService } from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

export class UsersController {
    protected repository: RepositoryInterface;
    protected userService: UserService;

    constructor(repository: RepositoryInterface) {
        this.repository = repository;
        this.userService = new UserService(this.repository);
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateUserDto = req.body;

            const { password, ...userdata } = await this.userService.createUser(data);

            return res.status(201).json({
                data: userdata,
            });
        } catch (error) {
            next(error);
        }
    };
}
