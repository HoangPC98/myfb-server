import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { getManager, In, Repository } from 'typeorm';
import { UsersRepository } from '../user/user.repository';
import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { GetPostQueryPaginate } from './dto/get-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly userRepository: UsersRepository,
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

  async getPostForNewsfeed(
    uid: number,
    getPostQuery: GetPostQueryPaginate,
  ): Promise<Post[]> {
    const { listFriend } = await this.userRepository.getListFriendByUserId(uid);
    console.log('list friend', listFriend);

    if (listFriend.length === 0) return;
    const listFriendUid: number[] = listFriend.map((item) => {
      if (uid === item.receiver_uid) return item.sender_uid;
      else if (uid === item.sender_uid) return item.receiver_uid;
    });
    console.log('list friend', listFriendUid);
    return this.postRepo.find({
      where: { owner_id: In(listFriendUid) },
      relations: ['Owner', 'Photos', 'Reactions'],
      take: getPostQuery.page_size
        ? getPostQuery.page_size
        : this.DEFAULT_POST_ITEM_ONLOAD,
      skip: getPostQuery.page_number
        ? (getPostQuery.page_number - 1) * getPostQuery.page_size
        : 0,
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
