import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { searchByUserNameUnicode } from 'src/utils/search-engine.util';
import { getManager } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async searchByUsername(inputString: string) {
    const allUser = await this.userRepo.find();
    const filterUser = searchByUserNameUnicode(inputString, allUser);
    console.log('filer user', filterUser);
    return filterUser;
  }
}
