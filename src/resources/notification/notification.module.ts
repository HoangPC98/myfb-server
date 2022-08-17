import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepositoty } from './notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginSession } from 'src/database/entities/login-session.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginSession, User])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepositoty],
  exports: [NotificationService, NotificationRepositoty],
})
export class NotificationModule {}
