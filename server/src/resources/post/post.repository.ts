import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  private readonly DEFAULT_POST_ITEM_ONLOAD = 9;

  async getOnePost(where_query?: any, relations?: string[]) {
    console.log('sender uid', where_query);
    const objectQuery = {};
    if (where_query) objectQuery['where'] = where_query;
    if (relations) objectQuery['relations'] = relations;
    const result = await this.postRepo.findOne(objectQuery);
    console.log('ok', result);
    return result;
  }

  async getManyPost(
    where: any,
    page_number: number,
    page_size?: number,
    relations?: string[],
  ) {
    const [postRecs, count] = await this.postRepo.findAndCount({
      where: where,
      relations: relations,
      take: page_size ? page_size : 9,
      skip: page_number,
    });
  }

  async saveNewPost(post: Post, photo?: Photo) {
    return await getManager().transaction(async (transactionManager) => {
      const createdPost = await transactionManager.save(post);
      photo.post_id = createdPost.id;
      await transactionManager.save(photo);
    });
  }
}
