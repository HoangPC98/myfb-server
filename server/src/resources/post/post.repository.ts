import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepo: Repository<Post>,
  ) {}

  async getOnePost(where_query?: any, relations?: string[]) {
    console.log('sender uid', where_query);
    const objectQuery = {};
    if (where_query) objectQuery['where'] = where_query;
    if (relations) objectQuery['relations'] = relations;
    const result = await this.PostRepo.findOne(objectQuery);
    console.log('ok', result);
    return result;
  }
}
