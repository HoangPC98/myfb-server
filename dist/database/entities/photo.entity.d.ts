import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
export declare enum PhotoType {
    Avatar = "avatar",
    CoverPhoto = "cover",
    PostPhoto = "post"
}
export declare class Photo extends CustomBaseEntity {
    id: number;
    post_id: number;
    Post: Post;
    photo_type: PhotoType;
    photo_url: string;
}
