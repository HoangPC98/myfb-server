import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { Photo } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, FriendShip, Photo])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
