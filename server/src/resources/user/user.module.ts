import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { Photo } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { Profile } from 'src/database/entities/profile.entity';
import { Privacy } from 'src/database/entities/privacy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Privacy, Post, FriendShip, Photo]),
  ],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UsersRepository],
})
export class UserModule {}
