import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/getUid.derator';
import { Public } from './decorators/public-auth.decorator';
import { LoginGoogleDto } from './dto/login-gg.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('google-login')
  async loginGoogle(@Body() loginGoogleBody: LoginGoogleDto): Promise<any> {
    console.log('login ggoogle>>>>');
    const data = await this.authService.loginGoogle(
      loginGoogleBody.ggToken,
      loginGoogleBody.uuid,
    );
    return {
      response: data,
    };
  }

  async logOut(@GetCurrentUser() user) {
    return await this.logOut(user);
  }
}
