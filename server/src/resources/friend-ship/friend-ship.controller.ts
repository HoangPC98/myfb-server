import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { AddFriendDto } from './dto/add-fr.dto';
import { ReplyRequestDto } from './dto/reply-request.dto';
import { FriendShipService } from './friend-ship.service';

@Controller('friendship')
export class FriendShipController {
  constructor(private readonly friendShipService: FriendShipService) {}

  @Post('new')
  async addFriendRequest(
    @GetCurrentUID() sender_uid: number,
    @Body() addFriendDto: AddFriendDto,
  ) {
    return await this.friendShipService.addFriendRequest(
      +sender_uid,
      addFriendDto.receiver_uid,
    );
  }

  @Patch('request-reply')
  async replyFriendRequest(
    @GetCurrentUID() this_uid: number,
    @Body() replyFriendDto: ReplyRequestDto,
  ) {
    return await this.friendShipService.replyFriendRequest(
      this_uid,
      replyFriendDto.request_id,
      replyFriendDto.reply_option,
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
