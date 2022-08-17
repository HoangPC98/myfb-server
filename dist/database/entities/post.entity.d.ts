import CustomBaseEntity from './base-entity';
import { Photo } from './photo.entity';
import { PrivacyMode } from './privacy.entity';
import { User } from './user.entity';
export declare class Post extends CustomBaseEntity {
    id: number;
    owner_id: number;
    Owner: User;
    privacy_mode: PrivacyMode;
    text: string;
    Photos: Photo[];
}
