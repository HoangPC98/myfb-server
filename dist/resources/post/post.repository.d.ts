import { Post } from 'src/database/entities/post.entity';
import { Repository } from 'typeorm/repository/Repository';
export declare class PostRepository {
    private readonly postRepo;
    constructor(postRepo: Repository<Post>);
    createPost(data: any): Promise<Post>;
}
