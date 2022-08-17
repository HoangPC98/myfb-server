import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createNewPost(imgFile: any, createPostDto: CreatePostDto, uid: number): Promise<import("../../database/entities/post.entity").Post | {
        message: string;
    }>;
    getAllPostByUid(uid: number): Promise<{
        response: import("../../database/entities/post.entity").Post[];
    }>;
}
