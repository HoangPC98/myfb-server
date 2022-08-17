import { EntityType, ReactionType } from 'src/types/enum-types/common.enum';
import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';
export declare class Reaction extends CustomBaseEntity {
    entity_id: number;
    reactor_id: number;
    User: User;
    entity_type: EntityType;
    reaction_type: ReactionType;
    Post: Post;
}
