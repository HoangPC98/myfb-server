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
exports.User = exports.Gender = exports.UserStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const login_session_entity_1 = require("./login-session.entity");
const notification_receive_entity_1 = require("./notification-receive.entity");
const post_entity_1 = require("./post.entity");
const privacy_entity_1 = require("./privacy.entity");
const profile_entity_1 = require("./profile.entity");
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "active";
    UserStatus["Inactive"] = "inactive";
    UserStatus["Locked"] = "locked";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
let User = class User extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.Active,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "given_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender, default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "Profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => privacy_entity_1.Privacy),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", privacy_entity_1.Privacy)
], User.prototype, "Privacy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.Owner, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "Posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => login_session_entity_1.LoginSession, (loginSession) => loginSession.User),
    __metadata("design:type", Array)
], User.prototype, "LoginSessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_receive_entity_1.NotificationReceive, (notificationReceive) => notificationReceive.User),
    __metadata("design:type", Array)
], User.prototype, "NotificationReceives", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map