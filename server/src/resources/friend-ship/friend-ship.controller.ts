import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUID } from 'src/auth/decorators/getRequest.decorator';
import { AddFriendDto } from './dto/add-fr.dto';
import { ReplyRequestDto } from './dto/reply-request.dto';
import { FriendShipService } from './friend-ship.service';

@Controller('friendship')
export class FriendShipController {
  constructor(private readonly friendShipService: FriendShipService) {}

  @Post('/request/new')
  async addFriendRequest(
    @GetCurrentUID() sender_uid: number,
    @Body() addFriendDto: AddFriendDto,
  ) {
    return await this.friendShipService.addFriendRequest(sender_uid, addFriendDto.receiver_uid);
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

  @Delete('request-cancel/:receiver_uid')
  async cancelFriendRequest(
    @GetCurrentUID() sender_uid: number,
    @Param() receiver_uid: number,
  ) {
    return await this.friendShipService.cancelFriendRequest(
      receiver_uid,
      sender_uid,
    );
  }
}
