import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FriendShip,
  FriendShipStatus,
} from 'src/database/entities/friend-ship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendShipService {
  constructor(private readonly friendShipRepo: Repository<FriendShip>) {}
  private readonly notFoundAddFrErrMsg = 'Not Found Add Friend Request';

  async addFriendRequest(addFriendDto) {
    let newAddFriendRequest = new FriendShip();
    newAddFriendRequest = { ...addFriendDto, status: FriendShipStatus.Pending };
    return await this.friendShipRepo.save(newAddFriendRequest);

    // push notification
  }

  async replyFriendRequest(request_id: number, receiver_uid: number) {
    try {
      return await this.friendShipRepo
        .createQueryBuilder()
        .update(FriendShip)
        .set({ status: FriendShipStatus.BeFriended })
        .where('id = :request_id AND receiver_uid = :receiver_uid', {
          request_id,
          receiver_uid,
        })
        .execute();
    } catch (err) {
      throw new BadRequestException(
        `${this.notFoundAddFrErrMsg}: ${request_id}`,
      );
    }

    // push notification
  }

  async cancelFriendRequest(request_id, sender_uid) {
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
