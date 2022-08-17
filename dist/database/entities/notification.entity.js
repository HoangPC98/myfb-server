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
exports.Notifications = void 0;
const common_enum_1 = require("../../types/enum-types/common.enum");
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const notification_receive_entity_1 = require("./notification-receive.entity");
let Notifications = class Notifications extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notifications.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Notifications.prototype, "entity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: common_enum_1.EntityType,
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], Notifications.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: common_enum_1.NotifyType,
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], Notifications.prototype, "notify_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notifications.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_receive_entity_1.NotificationReceive, (notificationReceive) => notificationReceive.Notification, { cascade: true }),
    __metadata("design:type", Array)
], Notifications.prototype, "NotificationReceives", void 0);
Notifications = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notifications);
exports.Notifications = Notifications;
//# sourceMappingURL=notification.entity.js.map