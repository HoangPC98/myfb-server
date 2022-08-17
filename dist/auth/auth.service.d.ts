import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginSession } from 'src/database/entities/login-session.entity';
import { User } from 'src/database/entities/user.entity';
import { JwtUserPayload } from 'src/types/data-types/auth-user.type';
export declare class AuthService {
    private readonly configService;
    private readonly userRepository;
    private loginSessionRepo;
    private readonly jwtService;
    private readonly logger;
    private readonly oAuth2Client;
    constructor(configService: ConfigService, userRepository: Repository<User>, loginSessionRepo: Repository<LoginSession>, jwtService: JwtService);
    loginGoogle(ggToken: string, uuid: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private getToken;
    private getJwtPayload;
    logOut(userlogin: JwtUserPayload): Promise<any>;
    updateUser(user: User, payload: any): Promise<User>;
}
