import CustomBaseEntity from './base-entity';
import { LoginSession } from './login-session.entity';
import { NotificationReceive } from 'src/database/entities/notification-receive.entity';
import { Post } from './post.entity';
import { Privacy } from './privacy.entity';
import { Profile } from './profile.entity';
export declare enum UserStatus {
    Active = "active",
    Inactive = "inactive",
    Locked = "locked"
}
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export declare class User extends CustomBaseEntity {
    id: number;
    status: UserStatus;
    first_name: string;
    last_name: string;
    given_name: string;
    gender: Gender;
    avatar_url: string;
    email: string;
    Profile: Profile;
    Privacy: Privacy;
    Posts: Post[];
    LoginSessions: LoginSession[];
    NotificationReceives: NotificationReceive[];
}
