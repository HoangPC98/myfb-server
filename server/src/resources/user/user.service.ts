import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FriendShip,
  FriendShipStatus,
} from 'src/database/entities/friend-ship.entity';
import { Photo } from 'src/database/entities/photo.entity';
import { User } from 'src/database/entities/user.entity';
import { getEntityPagination } from 'src/repository/common.repository';
import {
  EntityType,
  Order,
  QueryOption,
} from 'src/types/enum-types/common.enum';
import { searchByUserNameUnicode } from 'src/utils/search-engine.util';
import { getManager } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { GetProfileQuery } from './dto/get-profile.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  private readonly PREVIEW_FRIEND_ITEM_NUM = 6;
  private readonly PREVIEW_PHOTO_ITEM_NUM = 9;

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async searchByUsername(inputString: string) {
    const allUser = await this.userRepository.getAllUser();
    const filterUser = searchByUserNameUnicode(inputString, allUser);
    console.log('filer uccccser', filterUser);
    return {
      response: filterUser,
    };
  }

  async getProfile(user_id: number, uid: number): Promise<any> {
    console.log('LIST FRIEND', user_id);

    const isMine = user_id === uid ? true : false;

    const userInfo = await this.userRepository.getUserByRepo({ id: user_id }, [
      'Profile',
      'Privacy',
    ]);

    console.log('USERINFO', userInfo);

    const { listFriend, countAllFriend } =
      await this.userRepository.getListFriendByUserId(user_id, isMine);
    const listFriendMaping = listFriend.map((item) => {
      let thisFriend: User;
      if (user_id === item.sender_uid) thisFriend = item.Receiver;
      else thisFriend = item.Sender;

      const newItem = {
        friend_name: thisFriend.given_name,
        avatar_url: thisFriend.avatar_url,
      };
      return newItem;
    });

    console.log('listFrined', listFriend);

    const listPhoto = await this.userRepository.getListPhotosByUserId(user_id);
    const listPhotoMaping = listPhoto.map((item) => {
      return {
        photo_id: item.id,
        photo_url: item.photo_url,
      };
    });

    const listPost = await this.userRepository.getListPostByUserId(
      user_id,
      isMine,
    );
    const listPostMaping = listPost.map((post) => {
      return {
        post_id: post.id,
        text: post.text,
        count_reaction: post.count_reaction,
        count_comment: post.count_comment,
        Photos: post.Photos.map((photo) => {
          return {
            id: photo.id,
            url: photo.photo_url,
            count_reaction: photo.count_reaction,
            count_comment: photo.count_comment,
          };
        }),
        createdAt: post.createdAt,
      };
    });

    const result = {
      userInfo,
      friends: {
        count_all: countAllFriend,
        list: listFriendMaping,
      },
      photos: {
        count: listPhotoMaping.length,
        list: listPhotoMaping,
      },
      posts: listPostMaping,
    };
    return { response: result };
  }
}
