import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
export declare class UserRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findUserBy(whereQuery: any, selection: any, getMany: boolean): Promise<any>;
    getAllUser(): Promise<User[]>;
}
