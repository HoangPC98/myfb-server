import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FriendShip,
  FriendShipStatus,
} from 'src/database/entities/friend-ship.entity';
import { Photo } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { Privacy, PrivacyMode } from 'src/database/entities/privacy.entity';
import { Profile } from 'src/database/entities/profile.entity';
import { User } from 'src/database/entities/user.entity';
import {
  countEntityRecord,
  getEntity,
  getEntityPagination,
} from 'src/repository/common.repository';
import {
  EntityType,
  Order,
  QueryOption,
} from 'src/types/enum-types/common.enum';
import { getManager, In } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(Privacy)
    private readonly privacyRepo: Repository<Privacy>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<FriendShip>,
    @InjectRepository(FriendShip)
    private readonly friendshipRepo: Repository<FriendShip>,
    @InjectRepository(Photo)
    private readonly photoRepo: Repository<Photo>,
  ) {}

  private readonly PREVIEW_FRIEND_ITEM_NUM = 6;
  private readonly PREVIEW_PHOTO_ITEM_NUM = 9;
  private readonly POST_ITEM_NUM_ONPAGE = 5;

  async getUserByRepo(
    whereObj: any,
    relations: string[],
    oneOrMany?: QueryOption,
  ) {
    const userRecs = await this.userRepo.find({
      where: whereObj,
      relations: relations,
    });

    if (oneOrMany === QueryOption.GetOne || !oneOrMany) return userRecs[0];
    else return userRecs;
  }

  async getAllUser() {
    return await this.userRepo.find();
  }

  async updateUserByUID(entity_type: EntityType, uid: number, payload: any) {
    let whereString = 'user_id = :uid';

    if (entity_type === EntityType.User) {
      whereString = 'id = :uid';
    }
    return await getManager()
      .createQueryBuilder(entity_type, entity_type)
      .update(entity_type)
      .set(payload)
      .where(whereString, { uid })
      .execute();
  }

  async getListPostByUserId(user_id: number, isMine?: boolean) {
    const whereQuery = { owner_id: user_id };
    if (!isMine) whereQuery['privacy_mode'] = PrivacyMode.Public;
    const listPost: Post[] = await getEntityPagination(
      { use: QueryOption.UseRepository, repository: this.postRepo },
      EntityType.Post,
      whereQuery,
      {
        page_size: this.POST_ITEM_NUM_ONPAGE,
        page_number: 1,
        order_by: 'id',
        order: Order.DESC,
      },
      ['Photos'],
    );
    console.log('list post');
    return listPost;
  }

  async getListFriendByUserId(user_id: number, isMine?: boolean) {
    const whereQuery = `(sender_uid = ${user_id} OR receiver_uid = ${user_id}) AND  friendship_status = '${FriendShipStatus.BeFriended}'`;
    const listFriend: FriendShip[] = await getEntityPagination(
      { use: QueryOption.UseRepository, repository: this.friendshipRepo },
      EntityType.FriendShip,
      whereQuery,
      {
        page_size: this.PREVIEW_FRIEND_ITEM_NUM,
        page_number: 1,
        order_by: 'id',
        order: Order.DESC,
      },
      ['Sender', 'Receiver'],
    );

    const countAllFriend = await countEntityRecord(
      this.friendshipRepo,
      whereQuery,
    );

    console.log('LISTFRIEND', countAllFriend, listFriend);
    return { listFriend, countAllFriend };
  }

  async getListPhotosByUserId(user_id: number, isMine?: boolean) {
    const listPhoto: Photo[] = await getEntityPagination(
      { use: QueryOption.UseRepository, repository: this.photoRepo },
      EntityType.Photo,
      { owner_id: user_id },
      {
        page_size: this.PREVIEW_PHOTO_ITEM_NUM,
        page_number: 1,
        order_by: 'id',
        order: Order.DESC,
      },
    );
    console.log('LIST PHOTOOO', listPhoto);
    return listPhoto;
  }
}
