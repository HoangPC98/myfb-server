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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShip = exports.FriendShipStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const user_entity_1 = require("./user.entity");
var FriendShipStatus;
(function (FriendShipStatus) {
    FriendShipStatus["Pending"] = "pending";
    FriendShipStatus["BeFriended"] = "beFriended";
    FriendShipStatus["Blocked"] = "blocked";
    FriendShipStatus["RejectFriend"] = "rejectFriend";
})(FriendShipStatus = exports.FriendShipStatus || (exports.FriendShipStatus = {}));
let FriendShip = class FriendShip extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FriendShip.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FriendShip.prototype, "sender_uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FriendShip.prototype, "receiver_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FriendShipStatus,
        default: 'pending',
        nullable: true,
    }),
    __metadata("design:type", String)
], FriendShip.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'sender_uid' }),
    __metadata("design:type", user_entity_1.User)
], FriendShip.prototype, "Sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'receiver_uid' }),
    __metadata("design:type", user_entity_1.User)
], FriendShip.prototype, "Receiver", void 0);
FriendShip = __decorate([
    (0, typeorm_1.Entity)('friend_ships')
], FriendShip);
exports.FriendShip = FriendShip;
//# sourceMappingURL=friend-ship.entity.js.map