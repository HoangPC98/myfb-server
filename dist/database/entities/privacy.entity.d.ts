import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare enum PrivacyMode {
    Public = "public",
    Friend = "friend",
    Private = "private"
}
export declare class Privacy extends CustomBaseEntity {
    user_id: number;
    view_post: Privacy;
    comment_post: Privacy;
    share_post: Privacy;
    User: User;
}
