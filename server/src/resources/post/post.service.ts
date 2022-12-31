import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/entities/comment.entity';
import { Photo, PhotoType } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { Reaction } from 'src/database/entities/reaction.entity';
import { TypeDateTime } from 'src/types/enum-types/common.enum';
import { transformDateTime } from 'src/utils/transformer.util';
import { getManager, In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostQueryPaginate } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly postRepository: PostsRepository,
  ) {}

  private readonly errCreatePostMsg = 'error when save new post/photo';
  async createNewPost(uid, createPostDto: CreatePostDto, photo) {
    const newPost = new Post();
    newPost.owner_id = uid;
    newPost.privacy_mode = createPostDto.privacy_mode;
    newPost.text = createPostDto.text;
    if (!photo) {
      return await this.postRepo.save(newPost);
    }

    const newPhoto = new Photo();
    newPhoto.photo_url = photo.path.replace('public/', '');
    newPhoto.photo_type = PhotoType.Post;
    newPhoto.owner_id = uid;

    try {
      await this.postRepository.saveNewPost(newPost, newPhoto);
    } catch (err) {
      console.error('error when save new post/photo', err);
      throw new InternalServerErrorException('error when save new post/photo');
    }
    return 1;
  }

  async getAllPostByUserId(user_id: number) {
    const postRecs = await this.postRepo.find({
      where: { owner_id: user_id },
      relations: ['Photos', 'Comments', 'Reactions'],
    });
    console.log('post reccccc', postRecs);
    return postRecs;
  }

  async addNewProfilePhoto(uid: number, addNewDto: CreatePostDto, photoObj) {
    if (!photoObj) {
      throw new BadRequestException('update avatar required a photo');
    }

    console.log('add new profile photo', photoObj);

    const newPost = new Post();
    newPost.owner_id = uid;
    newPost.text = addNewDto.text;
    newPost.privacy_mode = addNewDto.privacy_mode;

    const newPhoto = new Photo();
    newPhoto.photo_url = photoObj.path.replace('public/', '');
    newPhoto.owner_id = uid;
    newPhoto.photo_type = addNewDto.photo_type;
    try {
      await this.postRepository.saveNewPost(newPost, newPhoto);
    } catch (err) {
      console.error(this.errCreatePostMsg, err);
      throw new InternalServerErrorException(this.errCreatePostMsg);
    }
    return 1;
  }

  async getNewsfeed(uid: number, getPostQuery: GetPostQueryPaginate) {
    const postRecs: Post[] = await this.postRepository.getPostForNewsfeed(
      uid,
      getPostQuery,
    );
    const result = postRecs.map((item) => {
      const self_reaction = item.Reactions.map(
        (item) => item.owner_id,
      ).includes(uid)
        ? item.Reactions.find((item) => item.owner_id == uid).reaction_type
        : 'nope';
      return {
        post_id: item.id,
        owner_id: item.owner_id,
        owner_name: item.Owner.given_name,
        owner_avatar: item.Owner.avatar_url,
        text: item.text,
        list_photo: item.Photos.map((photo) => photo.photo_url),
        count_reaction: item.count_reaction,
        count_comment: item.count_comment,
        seft_reaction: self_reaction,
        created_at: transformDateTime(item.createdAt, TypeDateTime.Relative),
      };
    });
    console.log('result..', result);
    return {
      response: result,
    };
  }
}
