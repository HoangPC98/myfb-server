import { FriendShip } from 'src/database/entities/friend-ship.entity';
import { ReplyAddFrRequest } from 'src/types/enum-types/common.enum';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { FriendShipRepositoty } from './friend-ship.repository';
export declare class FriendShipService {
    private readonly friendShipRepo;
    private readonly notificationService;
    private readonly friendshipRepository;
    constructor(friendShipRepo: Repository<FriendShip>, notificationService: NotificationService, friendshipRepository: FriendShipRepositoty);
    private readonly notFoundAddFrErrMsg;
    addFriendRequest(addFriendDto: any): Promise<{
        message: string;
    }>;
    replyFriendRequest(this_uid: number, add_fr_request_id: number, option: ReplyAddFrRequest): Promise<FriendShip>;
    cancelFriendRequest(request_id: any, sender_uid: any): Promise<import("typeorm").UpdateResult>;
}
