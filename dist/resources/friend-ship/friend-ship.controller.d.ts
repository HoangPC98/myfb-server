import { AddFriendDto } from './dto/add-fr.dto';
import { ReplyRequestDto } from './dto/reply-request.dto';
import { FriendShipService } from './friend-ship.service';
export declare class FriendShipController {
    private readonly friendShipService;
    constructor(friendShipService: FriendShipService);
    addFriendRequest(sender_uid: number, addFriendDto: AddFriendDto): Promise<{
        message: string;
    }>;
    replyFriendRequest(this_uid: number, replyFriendDto: ReplyRequestDto): Promise<import("../../database/entities/friend-ship.entity").FriendShip>;
    cancelFriendRequest(sender_uid: number, request_id: number): Promise<import("typeorm").UpdateResult>;
}
