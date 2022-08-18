import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/entities/comment.entity';
import { Photo, PhotoType } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { Reaction } from 'src/database/entities/reaction.entity';
import { getManager, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Reaction)
    private readonly reactionRepo: Repository<Reaction>,
  ) {}
  async createNewPost(uid, createPostDto: CreatePostDto, photo) {
    const newPost = new Post();
    newPost.owner_id = uid;
    newPost.privacy_mode = PrivacyMode.Public;
    newPost.text = createPostDto.text;
    if (!photo) {
      return await this.postRepo.save(newPost);
    }

    const newPhoto = new Photo();
    newPhoto.photo_url = photo.path;
    newPhoto.photo_type = PhotoType.PostPhoto;

    try {
      await getManager().transaction(async (transactionManager) => {
        const createPost = await transactionManager.save(newPost);
        newPhoto.post_id = createPost.id;
        await transactionManager.save(newPhoto);
      });
      return {
        message: 'ok',
      };
    } catch (err) {
      console.error('error when save new post/photo', err);
      throw new InternalServerErrorException('error when save new post/photo');
    }
  }

  async getAllPostByUserId(user_id: number) {
    const postRecs = await this.postRepo.find({
      where: { owner_id: user_id },
      relations: ['Photos', 'Comments', 'Reactions'],
    });
    console.log('post reccccc', postRecs);
    return postRecs;
  }
}
