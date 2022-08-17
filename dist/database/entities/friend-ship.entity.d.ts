import CustomBaseEntity from './base-entity';
import { User } from './user.entity';
export declare enum FriendShipStatus {
    Pending = "pending",
    BeFriended = "beFriended",
    Blocked = "blocked",
    RejectFriend = "rejectFriend"
}
export declare class FriendShip extends CustomBaseEntity {
    id: number;
    sender_uid: number;
    receiver_uid: number;
    status: FriendShipStatus;
    Sender: User;
    Receiver: User;
}
