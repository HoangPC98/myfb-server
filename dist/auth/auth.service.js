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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const login_session_entity_1 = require("../database/entities/login-session.entity");
const user_entity_1 = require("../database/entities/user.entity");
let AuthService = AuthService_1 = class AuthService {
    constructor(configService, userRepository, loginSessionRepo, jwtService) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.loginSessionRepo = loginSessionRepo;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
        const { clientId, clientSecret } = this.configService.get('ggAuth');
        this.oAuth2Client = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
    }
    async loginGoogle(ggToken, uuid) {
        const { clientId, authorizedDomain } = this.configService.get('ggAuth');
        let ggLoginTicket;
        try {
            ggLoginTicket = await this.oAuth2Client.verifyIdToken({
                idToken: ggToken,
                audience: clientId,
            });
        }
        catch (error) {
            this.logger.error(`Google verify token on google failure: ${error}`);
            throw new common_1.UnauthorizedException(`Google verify token on google failure`);
        }
        const { hd: domain, email_verified, email, name, picture, } = ggLoginTicket.getPayload();
        console.log('...', ggLoginTicket.getPayload());
        if (!email_verified) {
            this.logger.error(` domain ${domain} not authorized or email ${email} not verified`);
            throw new common_1.UnauthorizedException();
        }
        let foundExistingUser;
        foundExistingUser = await this.userRepository.findOne({
            where: { email: email },
        });
        let userInfo = foundExistingUser;
        const nameSplit = name.split(' ');
        const firstName = nameSplit.shift();
        const lastName = nameSplit.join(' ');
        console.log('name,,,', firstName, lastName);
        if (!foundExistingUser) {
            console.log(`foundExistingUser`);
            const newUser = new user_entity_1.User();
            newUser.email = email;
            newUser.given_name = name;
            newUser.first_name = firstName;
            newUser.last_name = lastName;
            newUser.avatar_url = picture;
            newUser.gender = user_entity_1.Gender.Other;
            newUser.avatar_url = picture;
            console.log('user....', newUser);
            const getNewUser = await this.userRepository.save(newUser);
            foundExistingUser = getNewUser;
            userInfo = await this.userRepository.findOne({
                where: { id: getNewUser.id },
                relations: ['Profile'],
            });
            this.logger.log(`Create a new User with id = ${userInfo.id}`);
        }
        else {
            this.logger.log(`user ${foundExistingUser.id} : ${foundExistingUser.given_name} has login`);
        }
        const checkUserLoginNewDevice = await this.loginSessionRepo.findOne({
            where: { user_id: foundExistingUser.id, uuid: uuid },
            withDeleted: true,
        });
        if (!checkUserLoginNewDevice) {
            const newLoginUserNewDevice = new login_session_entity_1.LoginSession();
            newLoginUserNewDevice.user_id = foundExistingUser.id;
            newLoginUserNewDevice.uuid = uuid;
            await this.loginSessionRepo.save(newLoginUserNewDevice);
        }
        else {
            checkUserLoginNewDevice.deletedAt = null;
            this.loginSessionRepo.save(checkUserLoginNewDevice);
        }
        const payload = await this.getJwtPayload(foundExistingUser, uuid);
        const tokens = await this.getToken(payload);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async getToken(payload) {
        this.logger.debug('Start Get new Token...');
        const payloadRefreshToken = {
            sub: payload.sub,
            email: payload.email,
            uuid: payload.uuid,
        };
        try {
            this.logger.debug('begin sign token...');
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(payload, {
                    secret: this.configService.get('jwtAuth').jwt_token_secret,
                    expiresIn: this.configService.get('jwtAuth').access_token_ttl,
                }),
                this.jwtService.signAsync(payloadRefreshToken, {
                    secret: this.configService.get('jwtAuth').jwt_token_secret,
                    expiresIn: this.configService.get('jwtAuth').refresh_token_ttl,
                }),
            ]);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (err) {
            this.logger.error(err.message);
            throw new Error(`Error when sign Token ${err.message}`);
        }
    }
    async getJwtPayload(userRec, uuid) {
        return {
            uid: userRec.id,
            email: userRec.email,
            given_name: userRec.give_name,
            first_name: userRec.first_name,
            last_name: userRec.last_name,
            uuid: uuid,
            avatar_url: userRec.avatar_url,
            iat: Math.floor(Date.now() / 1000),
        };
    }
    async logOut(userlogin) {
        try {
            console.log(`User ${userlogin.given_name} has logout`);
            return await this.loginSessionRepo.delete({ user_id: userlogin.uid });
        }
        catch (err) {
            this.logger.error('Logout Error: ', err.message);
            throw new Error(err.message);
        }
    }
    async updateUser(user, payload) {
        const { given_name } = payload;
        let isModified = false;
        if (given_name !== user.given_name) {
            user.given_name = given_name;
            isModified = true;
        }
        isModified && this.loginSessionRepo.save(user);
        return user;
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(login_session_entity_1.LoginSession)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map