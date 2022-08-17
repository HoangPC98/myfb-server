import { AuthService } from './auth.service';
import { LoginGoogleDto } from './dto/login-gg.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginGoogle(loginGoogleBody: LoginGoogleDto): Promise<any>;
    logOut(user: any): any;
}
