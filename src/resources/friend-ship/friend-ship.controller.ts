import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { AddFriendDto } from './dto/add-fr.dto';
import { FriendShipService } from './friend-ship.service';

@Controller('friendship')
export class FriendShipController {
  constructor(private readonly friendShipService: FriendShipService) {}

  @Post('new')
  async addFriendRequest(
    @GetCurrentUID() sender_uid: number,
    @Body() addFriendDto: AddFriendDto,
  ) {
    return await this.friendShipService.addFriendRequest(addFriendDto);
  }

  @Patch('request-acpt/:request_id')
  async replyFriendRequest(
    @GetCurrentUID() receiver_uid: number,
    @Param() request_id: number,
  ) {
    return await this.friendShipService.replyFriendRequest(
      request_id,
      receiver_uid,
    );
  }

  @Delete('request-cancel/:request_id')
  async cancelFriendRequest(
    @GetCurrentUID() sender_uid: number,
    @Param() request_id: number,
  ) {
    return await this.friendShipService.cancelFriendRequest(
      request_id,
      sender_uid,
    );
  }
}
