import { Comment } from 'src/database/entities/comment.entity';
import { Post } from 'src/database/entities/post.entity';
import { Reaction } from 'src/database/entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private readonly postRepo;
    private readonly commentRepo;
    private readonly reactionRepo;
    constructor(postRepo: Repository<Post>, commentRepo: Repository<Comment>, reactionRepo: Repository<Reaction>);
    createNewPost(uid: any, createPostDto: CreatePostDto, photo: any): Promise<Post | {
        message: string;
    }>;
    getAllPostByUserId(user_id: number): Promise<Post[]>;
}
