import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtUserPayload } from 'src/types/data-types/auth-user.type';
import { AuthService } from './auth.service';
import { GetCurrentUID, GetCurrentUser } from './decorators/getUid.derator';
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

  @Get('refresh-token')
  async getRefreshToken(@GetCurrentUser() user: JwtUserPayload) {
    return {
      response: await this.authService.getNewRefreshToken(user),
    };
  }

  @Get('logout')
  async logOut(@GetCurrentUser() user) {
    console.log(`LOGOGOGO UT`);
    return await this.authService.logOut(user);
  }
}
