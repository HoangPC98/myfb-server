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
exports.NotificationReceive = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const notification_entity_1 = require("./notification.entity");
const user_entity_1 = require("./user.entity");
let NotificationReceive = class NotificationReceive extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NotificationReceive.prototype, "notification_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.Notifications, (notification) => notification.NotificationReceives),
    (0, typeorm_1.JoinColumn)({ name: 'notification_id' }),
    __metadata("design:type", notification_entity_1.Notifications)
], NotificationReceive.prototype, "Notification", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NotificationReceive.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], NotificationReceive.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], NotificationReceive.prototype, "is_seen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.NotificationReceives),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], NotificationReceive.prototype, "User", void 0);
NotificationReceive = __decorate([
    (0, typeorm_1.Entity)('notification_receives')
], NotificationReceive);
exports.NotificationReceive = NotificationReceive;
//# sourceMappingURL=notification-receive.entity.js.map