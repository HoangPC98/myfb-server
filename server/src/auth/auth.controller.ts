import { Body, Headers, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/getRequest.decorator';
import { Public } from './decorators/public-auth.decorator';
import { OtpGetNewDto } from './dto/ otp.dto';
import { LoginGoogleDto, LoginUsrPswDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login/google')
  async loginGoogle(@Body() loginGoogleBody: LoginGoogleDto, @Headers() headers): Promise<any> {
    console.log('login header>>>>', headers);

    return await this.authService.loginGoogle(
      loginGoogleBody.ggToken,
      headers.uuid,
      headers['user-agent']
    );
    
  }

  async logOut(@GetCurrentUser() user) {
    return await this.logOut(user);
  }

  @Public()
  @Post('login')
  async loginUsrPsw(@Body() usrpswBody: LoginUsrPswDto, @Headers() headers){
    return await this.authService.loginUsrPsw(usrpswBody.email_or_phone, usrpswBody.password, headers.uuid, headers['user-agent']);
  }

  @Public()
  @Post('signup/fillout-data')
  async signUp(@Body() signUpData: SignUpDto): Promise<any> {
    const result = await this.authService.signUpStep1(signUpData)
    return result
  }

  @Public()
  @Post('otp/get-new/na')
  async getNewOtp(@Body() otpGetNewBody: OtpGetNewDto): Promise<any> {
    return await this.authService.getNewOtp(otpGetNewBody.otp_type, otpGetNewBody.email_or_phone)
  } 

  @Public()
  @Post('otp/verify-submission')
  async verifyOtpSubmission(@Body() otpBodySubmission){
    const result = await this.authService.verifyOtpSubmission(otpBodySubmission.otp_code, otpBodySubmission.email_or_phone, otpBodySubmission.otp_type)
    return result
  }
}
