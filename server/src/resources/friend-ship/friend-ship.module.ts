import { Module } from '@nestjs/common';
import { FriendShipService } from './friend-ship.service';
import { FriendShipController } from './friend-ship.controller';
import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { FriendShipRepositoty } from './friend-ship.repository';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendShip]), NotificationModule],
  controllers: [FriendShipController],
  providers: [FriendShipService, FriendShipRepositoty],
})
export class FriendShipModule {}
