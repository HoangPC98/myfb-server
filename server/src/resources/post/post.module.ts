import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { Reaction } from 'src/database/entities/reaction.entity';
import { PostsRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostsRepository],
})
export class PostModule {}
