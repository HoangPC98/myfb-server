"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friend_ship_entity_1 = require("../../database/entities/friend-ship.entity");
const common_enum_1 = require("../../types/enum-types/common.enum");
const typeorm_2 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
const friend_ship_repository_1 = require("./friend-ship.repository");
let FriendShipService = class FriendShipService {
    constructor(friendShipRepo, notificationService, friendshipRepository) {
        this.friendShipRepo = friendShipRepo;
        this.notificationService = notificationService;
        this.friendshipRepository = friendshipRepository;
        this.notFoundAddFrErrMsg = 'Not Found Add Friend Request';
    }
    async addFriendRequest(addFriendDto) {
        const checkExistFriendShip = await this.friendshipRepository.getOneFriendship({
            sender_uid: addFriendDto.sender_uid,
            receiver_uid: addFriendDto.receiver_uid,
        });
        if (checkExistFriendShip) {
            throw new common_1.BadRequestException(`Friend Request have been existed`);
        }
        let newAddFriendRequest = new friend_ship_entity_1.FriendShip();
        newAddFriendRequest = Object.assign(Object.assign({}, addFriendDto), { status: friend_ship_entity_1.FriendShipStatus.Pending });
        try {
            console.log(newAddFriendRequest);
            const createdFriendShip = await this.friendShipRepo.save(newAddFriendRequest);
            this.notificationService.sendNotificationFromOneToOne(addFriendDto.sender_uid, addFriendDto.receiver_uid, createdFriendShip.id, common_enum_1.NotifyType.AddFriendRequest, common_enum_1.EntityType.FriendShip);
            return {
                message: 'ok',
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
    async replyFriendRequest(this_uid, add_fr_request_id, option) {
        const thisRequest = await this.friendshipRepository.getOneFriendship({
            id: add_fr_request_id,
        }, ['Sender', 'Receiver']);
        thisRequest.status =
            option === common_enum_1.ReplyAddFrRequest.Accept
                ? friend_ship_entity_1.FriendShipStatus.BeFriended
                : friend_ship_entity_1.FriendShipStatus.RejectFriend;
        if (option === common_enum_1.ReplyAddFrRequest.Accept) {
            thisRequest.status = friend_ship_entity_1.FriendShipStatus.BeFriended;
            const sender_uid = thisRequest.receiver_uid;
            const receiver_uid = thisRequest.sender_uid;
            const message = `${thisRequest.Receiver.given_name} has accept your friend request`;
            this.notificationService.sendNotificationFromOneToOne(sender_uid, receiver_uid, thisRequest.id, common_enum_1.NotifyType.AcceptFriendReq, common_enum_1.EntityType.FriendShip, message);
        }
        else {
            thisRequest.status = friend_ship_entity_1.FriendShipStatus.RejectFriend;
        }
        return await this.friendShipRepo.save(thisRequest);
    }
    async cancelFriendRequest(request_id, sender_uid) {
        try {
            return await this.friendShipRepo.softDelete({
                id: request_id,
                sender_uid: sender_uid,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException(`${this.notFoundAddFrErrMsg}: ${request_id}`);
        }
    }
};
FriendShipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friend_ship_entity_1.FriendShip)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notification_service_1.NotificationService,
        friend_ship_repository_1.FriendShipRepositoty])
], FriendShipService);
exports.FriendShipService = FriendShipService;
//# sourceMappingURL=friend-ship.service.js.map