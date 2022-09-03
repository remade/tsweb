import { hash } from 'bcrypt';
import { CreateUserDto } from '@/api/dtos/users.dto';
import { RepositoryInterface } from '@/repository';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { RequestValidationError, ResourceNotFoundError } from '@/core/exceptions';

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
        if (!findUser) throw new ResourceNotFoundError();

        return findUser;
    }

    public async createUser(userData: CreateUserDto) {
        const [findUser, defaultRole] = await Promise.all([
            this.repository.users.getContext().where('email', '=', userData.email).first(),
            this.repository.roles.findOne({ slug: 'default' }),
        ]);
        if (findUser) throw new RequestValidationError({ message: `the email ${userData.email} already exists` });

        const hashedPassword = await hash(userData.password, 10);
        const newUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role_id: defaultRole?.id,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
        };
        await this.repository.users.create(newUser);
        return newUser;
    }
}
