import { EntityType } from 'src/types/enum-types/common.enum';
import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';
export declare class Comment extends CustomBaseEntity {
    id: number;
    entity_id: number;
    user_id: number;
    entity_type: EntityType;
    User: User;
    text: string;
    Post: Post;
}
