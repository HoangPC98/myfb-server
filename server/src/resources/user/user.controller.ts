import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Inject,
  forwardRef,
  ConsoleLogger,
  Render,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileQuery } from './dto/get-profile.dto';
import { GetCurrentUID } from 'src/auth/decorators/getRequest.decorator';
import { UpdateUserInfoDto } from './dto/update-user.dto';
import { OtpType, UserInfoType } from 'src/types/enum-types/common.enum';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { Response } from 'express';
import path from 'path'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  @Get('search')
  searchByUsername(@GetCurrentUID() uid: number, @Query() q: {keyword: string}) {
    console.log('>>>>>>>>>>>>>>search by', q);
    return this.userService.searchByUsername(uid, q.keyword);
  }

  @Patch('info')
  updateInfo(
    @GetCurrentUID() uid: number,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    return this.userService.updateUser(
      UserInfoType.BasicInfo,
      uid,
      updateUserDto,
    );
  }

  @Patch('profile')
  updateProfile(
    @GetCurrentUID() uid: number,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    return this.userService.updateUser(
      UserInfoType.Profile,
      uid,
      updateUserDto,
    );
  }

  @Patch('privacy')
  updatePrivacy(
    @GetCurrentUID() uid: number,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    return this.userService.updateUser(
      UserInfoType.Privacy,
      uid,
      updateUserDto,
    );
  }

  @Get('profile')
  async getProfile(
    @GetCurrentUID() uid: number,
    @Query() getProfileQuery: GetProfileQuery,
  ) {
    return this.userService.getProfile(+getProfileQuery.user_id, uid);
  }

  @Public()
  @Post('forgot-password/get-verification')
  async getForgotPasswordVerification(@Body() emailOrPhoneBody: {email_or_phone: string}) {
    return this.authService.sendOtpOrLinkVerification(emailOrPhoneBody.email_or_phone, OtpType.ForgotPassword )
  }

  @Public()
  @Get('forgot-password/form-fillout')
  async changePassword(@Query() queryObj: {link: string}, @Res() res: Response) {
    console.log('dirNname: ' + __dirname )
    let serverDomain = process.env.NODE_ENV === 'development' ? ('http://localhost:' + process.env.SERVER_PORT) : process.env.SERVER_HOST + ':' + process.env.SERVER_PORT
    return res.render(path.join(__dirname, '..', '..' ,'/assets/resetpassword-form.ejs'),{url: `${serverDomain}/users/forgot-password/form-submit`, token: queryObj.link})
  }

  @Public()
  @Post('forgot-password/form-submit')
  async resetPassword(@Body() changePswForm: {new_password: string, token: string}){
    return this.userService.changePasswordViaLinkEmail(changePswForm.new_password, changePswForm.token)
  }
}
