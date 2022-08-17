import { AddFriendDto } from './dto/add-fr.dto';
import { FriendShipService } from './friend-ship.service';
export declare class FriendShipController {
    private readonly friendShipService;
    constructor(friendShipService: FriendShipService);
    addFriendRequest(sender_uid: number, addFriendDto: AddFriendDto): Promise<import("../../database/entities/friend-ship.entity").FriendShip>;
    replyFriendRequest(receiver_uid: number, request_id: number): Promise<import("typeorm").UpdateResult>;
    cancelFriendRequest(sender_uid: number, request_id: number): Promise<import("typeorm").UpdateResult>;
}
