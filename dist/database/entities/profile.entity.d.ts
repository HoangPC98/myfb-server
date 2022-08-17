import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';
export declare enum RelationshipStatus {
    Signle = "single",
    Dating = "dating",
    Married = "married"
}
export declare class Profile extends CustomBaseEntity {
    user_id: number;
    user: User;
    bio: string;
    dob: string;
    phone_number: string;
    come_from: string;
    work_place: string;
    relationship_status: RelationshipStatus;
    email: string;
    Posts: Post[];
}
