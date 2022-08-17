import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo, PhotoType } from 'src/database/entities/photo.entity';
import { Post } from 'src/database/entities/post.entity';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { getManager, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}
  async createNewPost(uid, createPostDto: CreatePostDto, photo) {
    const newPost = new Post();
    newPost.owner_id = uid;
    newPost.privacy_mode = PrivacyMode.Public;
    newPost.text = createPostDto.text;
    if (!photo) {
      newPost.id = Date.now();
      return await this.postRepo.save(newPost);
    }

    newPost.id = +photo.filename.split('.')[0];

    const newPhoto = new Photo();
    newPhoto.photo_url = photo.path;
    newPhoto.photo_type = PhotoType.PostPhoto;
    newPhoto.post_id = newPost.id;

    try {
      await getManager().transaction(async (transactionManager) => {
        await transactionManager.save(newPost);

        await transactionManager.save(newPhoto);
      });
    } catch (err) {
      console.error('error when save new post/photo', err);
      throw new InternalServerErrorException('error when save new post/photo');
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
