import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/getUid.derator';
import { Public } from './decorators/public-auth.decorator';
import { LoginGoogleDto } from './dto/login-gg.dto';
import { SignUpDto } from './dto/sign-up.dto';

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

  @Public()
  @Post('signup/fillout-data')
  async signUp(@Body() signUpData: SignUpDto): Promise<any> {
    const result = await this.authService.signUpStep1(signUpData)
    return {
      code: 201,
      result: `OTP has been sent to ${signUpData.email_or_phone}`
    };
  }

  @Public()
  @Post('otp/verify-submission')
  async verifyOtpSubmission(@Body() otpBodySubmission){
    const response = await this.authService.verifyOtpSubmission(otpBodySubmission.otp_code, otpBodySubmission.email_or_phone, otpBodySubmission.otp_type)
    return {
      code: 200,
      result: response || 'ok'
    }
  }
}
