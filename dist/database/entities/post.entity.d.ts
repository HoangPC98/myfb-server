import CustomBaseEntity from './base-entity';
import { Photo } from './photo.entity';
import { PrivacyMode } from './privacy.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
export declare class Post extends CustomBaseEntity {
    id: number;
    owner_id: number;
    Owner: User;
    privacy_mode: PrivacyMode;
    text: string;
    Photos: Photo[];
    Comments: Comment[];
    Reactions: Reaction[];
}
