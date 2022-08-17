import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare class LoginSession extends CustomBaseEntity {
    user_id: number;
    User: User;
    uuid: string;
    fcm_token: string;
}
