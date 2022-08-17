import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { PostRepository } from './post.repository';
import { Comment } from 'src/database/entities/comment.entity';
import { Reaction } from 'src/database/entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Reaction])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
