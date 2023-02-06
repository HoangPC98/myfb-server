import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FriendShip,
  FriendShipStatus,
} from 'src/database/entities/friend-ship.entity';
import { EntityType, NotifyType, ReplyAddFrRequest } from 'src/types/enum-types/common.enum';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { FriendShipRepositoty } from './friend-ship.repository';

@Injectable()
export class FriendShipService {
  constructor(
    @InjectRepository(FriendShip)
    private readonly friendShipRepo: Repository<FriendShip>,
    private readonly friendshipRepository: FriendShipRepositoty,
    private readonly notificationService: NotificationService,
  ) {}
  private readonly notFoundAddFrErrMsg = 'Not Found Add Friend Request';

  async addFriendRequest(sender_uid: number, receiver_uid: number) {
    const checkExistFriendShip =
      await this.friendshipRepository.getOneFriendship({
        sender_uid: sender_uid,
        receiver_uid: receiver_uid,
      });
    if (checkExistFriendShip) {
      throw new BadRequestException(`Friend Request have been existed`);
    }

    let newAddFriendRequest = new FriendShip();
    newAddFriendRequest.receiver_uid = receiver_uid;
    newAddFriendRequest.sender_uid = sender_uid;
    newAddFriendRequest.status = FriendShipStatus.Pending;
    try {
      console.log('ADD FRIEND...',newAddFriendRequest);
      const createdFriendShip = await this.friendShipRepo.save(
        newAddFriendRequest,
      );

      // push notification
      await this.notificationService.sendNotificationFromOneToOne(
        sender_uid,
        receiver_uid,
        createdFriendShip.id,
        NotifyType.AddFriendRequest,
        EntityType.FriendShip,
      );
      return {
        message: 'ok',
      };
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async replyFriendRequest(
    this_uid: number,
    add_fr_request_id: number,
    option: ReplyAddFrRequest,
  ) {
    const thisRequest = await this.friendshipRepository.getOneFriendship(
      {
        id: add_fr_request_id,
      },
      ['Sender', 'Receiver'],
    );
    thisRequest.status =
      option === ReplyAddFrRequest.Accept
        ? FriendShipStatus.BeFriended
        : FriendShipStatus.UnFriend;

    if (option === ReplyAddFrRequest.Accept) {
      thisRequest.status = FriendShipStatus.BeFriended;
      const sender_uid = thisRequest.receiver_uid;
      const receiver_uid = thisRequest.sender_uid;

      const message = `${thisRequest.Receiver.given_name} has accept your friend request`;
      await this.notificationService.sendNotificationFromOneToOne(
        sender_uid,
        receiver_uid,
        thisRequest.id,
        NotifyType.AcceptFriendReq,
        EntityType.FriendShip,
        message,
      );
    } else {
      thisRequest.status = FriendShipStatus.UnFriend;
    }
    return await this.friendShipRepo.save(thisRequest);

    // push notification
  }

  async cancelFriendRequest(request_id: number, sender_uid: number) {
    try {
      return await this.friendShipRepo.softDelete({
        id: request_id,
        sender_uid: sender_uid,
      });
    } catch (err) {
      throw new BadRequestException(
        `${this.notFoundAddFrErrMsg}: ${request_id}`,
      );
    }
  }

 
}
