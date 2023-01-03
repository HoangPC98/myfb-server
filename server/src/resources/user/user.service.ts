import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from 'src/database/entities/user.entity';
import { EntityType, UserInfoType, UserStatus } from 'src/types/enum-types/common.enum';

import { searchResourceUnicode } from 'src/utils/search-engine.util';

import { UsersRepository } from './user.repository';
import { updateEntityByField_Value } from 'src/repository/common.repository'
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendShipStatus } from 'src/database/entities/friend-ship.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoty: UsersRepository,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
 
  private readonly PREVIEW_FRIEND_ITEM_NUM = 6;
  private readonly PREVIEW_PHOTO_ITEM_NUM = 9;

  async searchByUsername(uid: number, keyword: string) {
    const allUsers= await this.userRepo.query(`
    SELECT users.id, users.given_name, users.avatar_url, friend_ships.receiver_uid, friend_ships.sender_uid, friend_ships.friendship_status
    FROM users 
    JOIN friend_ships
    ON users.id IN (friend_ships.sender_uid, friend_ships.receiver_uid)
    WHERE users.id <> ${uid}
    ORDER BY users.id
    `)
    const reqUserFriends = await this.userRepo.query(`
    SELECT users.id, friend_ships.receiver_uid, friend_ships.sender_uid, friend_ships.friendship_status
    FROM users 
    JOIN friend_ships
    ON users.id IN (friend_ships.sender_uid, friend_ships.receiver_uid)
    WHERE users.id = ${uid}
    `)
    console.log('Current IAID',reqUserFriends)
    var reqUserFriendship = {
      id: reqUserFriends[0].id,
      friends: []
    }
    reqUserFriends.forEach(item=>{
      if(item.friendship_status === FriendShipStatus.BeFriended)
        reqUserFriendship.friends.push(
          item.id === item.receiver_uid ? item.sender_uid : item.receiver_uid,
        )
    })
    console.log('reqUserFriendship',reqUserFriendship)

    let transfromResult = [];
    var listUid : number[] = [];
    var listUser = [];
    allUsers.forEach(user => {
      let thisFriendUid = user.id === user.sender_uid ? user.receiver_uid : user.sender_uid
      if(!listUid.includes(user.id)){
        if(user.friendship_status === FriendShipStatus.BeFriended){
          listUser.push({
            id: user.id,
            given_name: user.given_name,
            avatar_url: user.avatar_url,
            friends: [thisFriendUid]
          });
          listUid.push(user.id)
        }
      }
      else{
       listUser[listUser.length-1].friends.push(thisFriendUid)
      }
    })
    const filterUser = searchResourceUnicode(keyword, listUser, 'given_name');
    console.log('LIST FILTER',filterUser);
    let reulst = filterUser.map(user =>{
      return {
        ...user,
        mutual_friend: user.friends.reduce((acc, friend)=>{
          if(reqUserFriendship.friends.includes(friend))
            acc.push(friend);
            return acc;
        }, [])
      }
    })
    console.log('>>>>>>reulst',reulst)
    return {
      code: 200,
      data: filterUser,
    }
  }

  async updateUser(type: UserInfoType, uid: number, payload: any) {
    let result;
    let entity_type: EntityType;
    if (type === UserInfoType.BasicInfo) {
      entity_type = EntityType.User;
      payload['given_name'] = this.setGivenName(
        payload.first_name,
        payload.last_name,
      );
      result = await updateEntityByField_Value(
        EntityType.User,
        { id: uid },
        payload,
      );
    }
    return result;
  }

  async getProfile(user_id: number, uid: number): Promise<any> {
    console.log('LIST FRIEND', user_id);

    const isMine = user_id === uid ? true : false;

    const userInfo = await this.userRepositoty.getUserByRepo({ id: user_id }, [
      'Profile',
      'Privacy',
    ]);

    console.log('USERINFO', userInfo);

    const { listFriend, countAllFriend } =
      await this.userRepositoty.getListFriendByUserId(user_id, isMine);
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

    const listPhoto = await this.userRepositoty.getListPhotosByUserId(user_id);
    const listPhotoMaping = listPhoto.map((item) => {
      return {
        photo_id: item.id,
        photo_url: item.photo_url,
      };
    });

    const listPost = await this.userRepositoty.getListPostByUserId(
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

    const result = await {
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

  private setGivenName(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  async changeUserStatus(queryObj: object, status: UserStatus) {
    try {
      return await updateEntityByField_Value(EntityType.User, queryObj, { status: status })
    } catch (error) {
      throw new BadRequestException('Error updating user status')
    }
  }

  async changePasswordViaLinkEmail(newPassword: string, token: string) {
    try {
      const checkToken = await this.jwtService.verify(token, { secret: process.env.JWT_RESET_PSW_TOKEN_SECRET });
      console.log('>>>changePasswordViaLinkEmail', checkToken, newPassword)
      if (checkToken) {
        const newHashPwd = await bcrypt.hash(newPassword, +process.env.HASH_PSW_SALTROUND || 10);
        const reulstChangePsw = await this.userRepo.createQueryBuilder()
          .update(User)
          .set({ password: newHashPwd })
          .where({ email: checkToken.email })
          .execute();
        // return {code: 201, result: reulstChangePsw};
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

}
