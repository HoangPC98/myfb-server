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
exports.FriendShipController = void 0;
const common_1 = require("@nestjs/common");
const getUid_derator_1 = require("../../auth/decorators/getUid.derator");
const add_fr_dto_1 = require("./dto/add-fr.dto");
const reply_request_dto_1 = require("./dto/reply-request.dto");
const friend_ship_service_1 = require("./friend-ship.service");
let FriendShipController = class FriendShipController {
    constructor(friendShipService) {
        this.friendShipService = friendShipService;
    }
    async addFriendRequest(sender_uid, addFriendDto) {
        return await this.friendShipService.addFriendRequest(addFriendDto);
    }
    async replyFriendRequest(this_uid, replyFriendDto) {
        return await this.friendShipService.replyFriendRequest(this_uid, replyFriendDto.request_id, replyFriendDto.reply_option);
    }
    async cancelFriendRequest(sender_uid, request_id) {
        return await this.friendShipService.cancelFriendRequest(request_id, sender_uid);
    }
};
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, getUid_derator_1.GetCurrentUID)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_fr_dto_1.AddFriendDto]),
    __metadata("design:returntype", Promise)
], FriendShipController.prototype, "addFriendRequest", null);
__decorate([
    (0, common_1.Patch)('request-reply'),
    __param(0, (0, getUid_derator_1.GetCurrentUID)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reply_request_dto_1.ReplyRequestDto]),
    __metadata("design:returntype", Promise)
], FriendShipController.prototype, "replyFriendRequest", null);
__decorate([
    (0, common_1.Delete)('request-cancel/:request_id'),
    __param(0, (0, getUid_derator_1.GetCurrentUID)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FriendShipController.prototype, "cancelFriendRequest", null);
FriendShipController = __decorate([
    (0, common_1.Controller)('friendship'),
    __metadata("design:paramtypes", [friend_ship_service_1.FriendShipService])
], FriendShipController);
exports.FriendShipController = FriendShipController;
//# sourceMappingURL=friend-ship.controller.js.map