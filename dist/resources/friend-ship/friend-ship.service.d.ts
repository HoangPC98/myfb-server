import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { Repository } from 'typeorm';
export declare class FriendShipService {
    private readonly friendShipRepo;
    constructor(friendShipRepo: Repository<FriendShip>);
    private readonly notFoundAddFrErrMsg;
    addFriendRequest(addFriendDto: any): Promise<FriendShip>;
    replyFriendRequest(request_id: number, receiver_uid: number): Promise<import("typeorm").UpdateResult>;
    cancelFriendRequest(request_id: any, sender_uid: any): Promise<import("typeorm").UpdateResult>;
}
