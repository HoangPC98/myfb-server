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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const getUid_derator_1 = require("../../auth/decorators/getUid.derator");
const multerOption = {
    storage: (0, multer_1.diskStorage)({
        destination: './public/photo/posts',
        filename: (req, file, cb) => {
            const suffix = (0, path_1.extname)(file.originalname);
            console.log('ext', suffix);
            const fileName = `${new Date().getTime()}${suffix}`;
            cb(null, fileName);
        },
    }),
};
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async createNewPost(imgFile, createPostDto, uid) {
        console.log('file...', imgFile);
        console.log('dto', createPostDto);
        return await this.postService.createNewPost(uid, createPostDto, imgFile ? imgFile : false);
    }
    async getAllPostByUid(uid) {
        const result = await this.postService.getAllPostByUserId(uid);
        return {
            response: result,
        };
    }
};
__decorate([
    (0, common_1.Post)('new'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerOption)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, getUid_derator_1.GetCurrentUID)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createNewPost", null);
__decorate([
    (0, common_1.Get)('/all-for-one'),
    __param(0, (0, getUid_derator_1.GetCurrentUID)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPostByUid", null);
PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map