import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendShipRepositoty {
  constructor(
    @InjectRepository(FriendShip)
    private readonly friendshipRepo: Repository<FriendShip>,
  ) {}

  async getOneFriendship(where_query?: any, relations?: string[]) {
    console.log('sender uid', where_query);
    const objectQuery = {};
    if (where_query) objectQuery['where'] = where_query;
    if (relations) objectQuery['relations'] = relations;
    const result = await this.friendshipRepo.findOne(objectQuery);
    console.log('ok', result);
    return result;
  }
}
