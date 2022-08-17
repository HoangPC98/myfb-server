import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(data) {
    let newPost = new Post();
    newPost = { ...data };
    return await this.postRepo.save(newPost);
  }
}
