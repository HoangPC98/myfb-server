import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare class Comment extends CustomBaseEntity {
    subject_id: number;
    user_id: number;
    User: User;
    text: string;
}
