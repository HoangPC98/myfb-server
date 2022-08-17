import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserDto: CreateUserDto): string;
    searchByUsername(inputString: string): Promise<any[]>;
}
