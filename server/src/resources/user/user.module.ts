import { forwardRef, Module } from '@nestjs/common';
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
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Privacy, Post, FriendShip, Photo]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService]
})
export class UserModule {}
