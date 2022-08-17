import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare enum FriendShipStatus {
    Pending = "pending",
    BeFriended = "beFriended",
    Blocked = "blocked"
}
export declare class FriendShip extends CustomBaseEntity {
    id: string;
    sender_uid: number;
    receiver_uid: number;
    User: User;
    status: FriendShipStatus;
}
