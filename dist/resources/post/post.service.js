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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("../../database/entities/comment.entity");
const photo_entity_1 = require("../../database/entities/photo.entity");
const post_entity_1 = require("../../database/entities/post.entity");
const privacy_entity_1 = require("../../database/entities/privacy.entity");
const reaction_entity_1 = require("../../database/entities/reaction.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepo, commentRepo, reactionRepo) {
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.reactionRepo = reactionRepo;
    }
    async createNewPost(uid, createPostDto, photo) {
        const newPost = new post_entity_1.Post();
        newPost.owner_id = uid;
        newPost.privacy_mode = privacy_entity_1.PrivacyMode.Public;
        newPost.text = createPostDto.text;
        if (!photo) {
            return await this.postRepo.save(newPost);
        }
        const newPhoto = new photo_entity_1.Photo();
        newPhoto.photo_url = photo.path;
        newPhoto.photo_type = photo_entity_1.PhotoType.PostPhoto;
        try {
            await (0, typeorm_2.getManager)().transaction(async (transactionManager) => {
                const createPost = await transactionManager.save(newPost);
                newPhoto.post_id = createPost.id;
                await transactionManager.save(newPhoto);
            });
            return {
                message: 'ok',
            };
        }
        catch (err) {
            console.error('error when save new post/photo', err);
            throw new common_1.InternalServerErrorException('error when save new post/photo');
        }
    }
    async getAllPostByUserId(user_id) {
        const postRecs = await this.postRepo.find({
            where: { owner_id: user_id },
            relations: ['Photos', 'Comments', 'Reactions'],
        });
        console.log('post reccccc', postRecs);
        return postRecs;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(2, (0, typeorm_1.InjectRepository)(reaction_entity_1.Reaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map