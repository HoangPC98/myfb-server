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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipService = void 0;
const common_1 = require("@nestjs/common");
const friend_ship_entity_1 = require("../../database/entities/friend-ship.entity");
const typeorm_1 = require("typeorm");
let FriendShipService = class FriendShipService {
    constructor(friendShipRepo) {
        this.friendShipRepo = friendShipRepo;
        this.notFoundAddFrErrMsg = 'Not Found Add Friend Request';
    }
    async addFriendRequest(addFriendDto) {
        let newAddFriendRequest = new friend_ship_entity_1.FriendShip();
        newAddFriendRequest = Object.assign(Object.assign({}, addFriendDto), { status: friend_ship_entity_1.FriendShipStatus.Pending });
        return await this.friendShipRepo.save(newAddFriendRequest);
    }
    async replyFriendRequest(request_id, receiver_uid) {
        try {
            return await this.friendShipRepo
                .createQueryBuilder()
                .update(friend_ship_entity_1.FriendShip)
                .set({ status: friend_ship_entity_1.FriendShipStatus.BeFriended })
                .where('id = :request_id AND receiver_uid = :receiver_uid', {
                request_id,
                receiver_uid,
            })
                .execute();
        }
        catch (err) {
            throw new common_1.BadRequestException(`${this.notFoundAddFrErrMsg}: ${request_id}`);
        }
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
    __metadata("design:paramtypes", [typeorm_1.Repository])
], FriendShipService);
exports.FriendShipService = FriendShipService;
//# sourceMappingURL=friend-ship.service.js.map