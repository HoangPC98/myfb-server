"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipModule = void 0;
const common_1 = require("@nestjs/common");
const friend_ship_service_1 = require("./friend-ship.service");
const friend_ship_controller_1 = require("./friend-ship.controller");
const friend_ship_entity_1 = require("../../database/entities/friend-ship.entity");
const typeorm_1 = require("@nestjs/typeorm");
const notification_module_1 = require("../notification/notification.module");
const friend_ship_repository_1 = require("./friend-ship.repository");
const user_entity_1 = require("../../database/entities/user.entity");
let FriendShipModule = class FriendShipModule {
};
FriendShipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([friend_ship_entity_1.FriendShip, user_entity_1.User]), notification_module_1.NotificationModule],
        controllers: [friend_ship_controller_1.FriendShipController],
        providers: [friend_ship_service_1.FriendShipService, friend_ship_repository_1.FriendShipRepositoty],
    })
], FriendShipModule);
exports.FriendShipModule = FriendShipModule;
//# sourceMappingURL=friend-ship.module.js.map