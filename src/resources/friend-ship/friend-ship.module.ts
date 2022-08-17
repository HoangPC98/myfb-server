import { Module } from '@nestjs/common';
import { FriendShipService } from './friend-ship.service';
import { FriendShipController } from './friend-ship.controller';

@Module({
  controllers: [FriendShipController],
  providers: [FriendShipService],
})
export class FriendShipModule {}
