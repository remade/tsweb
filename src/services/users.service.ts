import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/index';
import { isEmpty } from '@utils/util';
import { RepositoryInterface } from '@/repository';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    protected repository: RepositoryInterface;

    constructor(repository: RepositoryInterface) {
        this.repository = repository;
    }

    public async findAllUser() {
        const users = await this.repository.users.getContext().select('*');
        return users;
    }

    public async findUserById(userId: string) {
        const findUser = await this.repository.users.findOne({
            id: userId,
        });
        if (!findUser) throw new HttpException(409, "You're not user");

        return findUser;
    }

    public async createUser(userData: CreateUserDto) {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser = await this.repository.users.getContext().where('email', '=', userData.email).first();
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const newUser = {
            id: uuidv4(),
            email: userData.email,
            password: hashedPassword,
        };
        await this.repository.users.create(newUser);
        return newUser;
    }
}
