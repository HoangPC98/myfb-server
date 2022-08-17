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
exports.Reaction = exports.ReactionType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const user_entity_1 = require("./user.entity");
var ReactionType;
(function (ReactionType) {
    ReactionType["Like"] = "like";
    ReactionType["Love"] = "love";
    ReactionType["Haha"] = "haha";
    ReactionType["Sad"] = "Sad";
    ReactionType["Angry"] = "Angry";
})(ReactionType = exports.ReactionType || (exports.ReactionType = {}));
let Reaction = class Reaction extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Reaction.prototype, "subject_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Reaction.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.Posts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Reaction.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReactionType,
        default: ReactionType.Like,
        nullable: true,
    }),
    __metadata("design:type", String)
], Reaction.prototype, "reaction_type", void 0);
Reaction = __decorate([
    (0, typeorm_1.Entity)('reactions')
], Reaction);
exports.Reaction = Reaction;
//# sourceMappingURL=reaction.entity.js.map