import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities/reaction.entity';
import { NotificationModule } from '../notification/notification.module';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { Photo } from 'src/database/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction, Post, Comment, Photo]),
    NotificationModule,
  ],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
