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
exports.Comment = void 0;
const common_enum_1 = require("../../types/enum-types/common.enum");
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let Comment = class Comment extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "entity_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: common_enum_1.EntityType,
        nullable: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.Comments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'entity_id' }),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "Post", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)('comments')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map