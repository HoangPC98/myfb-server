import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare enum ReactionType {
    Like = "like",
    Love = "love",
    Haha = "haha",
    Sad = "Sad",
    Angry = "Angry"
}
export declare class Reaction extends CustomBaseEntity {
    subject_id: number;
    user_id: number;
    User: User;
    reaction_type: ReactionType;
}
