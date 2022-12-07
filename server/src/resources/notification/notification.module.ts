import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepositoty } from './notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from 'src/database/entities/user-session.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession, User])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepositoty],
  exports: [NotificationService, NotificationRepositoty],
})
export class NotificationModule {}
