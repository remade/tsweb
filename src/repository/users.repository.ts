import { User } from "@/interfaces/models.interface";
import { BaseRepository, BaseRepositoryInterface } from "./base.repository";

export interface UsersRepositoryInterface extends BaseRepositoryInterface<User> {
}

export class UsersRepository extends BaseRepository<User> implements UsersRepositoryInterface {
}
