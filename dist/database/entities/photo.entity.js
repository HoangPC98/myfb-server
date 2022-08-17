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
exports.Photo = exports.PhotoType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base-entity"));
const post_entity_1 = require("./post.entity");
var PhotoType;
(function (PhotoType) {
    PhotoType["Avatar"] = "avatar";
    PhotoType["CoverPhoto"] = "cover";
    PhotoType["PostPhoto"] = "post";
})(PhotoType = exports.PhotoType || (exports.PhotoType = {}));
let Photo = class Photo extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photo.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.Photos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], Photo.prototype, "Post", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PhotoType, default: null, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "photo_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "photo_url", void 0);
Photo = __decorate([
    (0, typeorm_1.Entity)('photos')
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=photo.entity.js.map