import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findUserBy(whereQuery: any, selection: any, getMany: boolean) {
    const stringQuery = Object.keys(whereQuery);
    const paramQuery = Object.values(whereQuery);
    const queryResult = await this.userRepo
      .createQueryBuilder('user')
      .where(stringQuery, paramQuery)
      .select(selection)
      .execute();

    if (getMany) return queryResult;
    else return queryResult[0];
  }

  async getAllUser() {
    return await this.userRepo.find();
  }
}
