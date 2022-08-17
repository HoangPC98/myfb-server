import { Post } from 'src/database/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly postRepo;
    constructor(postRepo: Repository<Post>);
    createNewPost(uid: any, createPostDto: CreatePostDto, photo: any): Promise<Post>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
