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
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileQuery } from './dto/get-profile.dto';
import { GetCurrentUID } from 'src/auth/decorators/getRequest.decorator';
import { UpdateUserInfoDto } from './dto/update-user.dto';
import { OtpType, UserInfoType } from 'src/types/enum-types/common.enum';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorators/public-auth.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  @Get('search')
  searchByUsername(@Query('inputname') inputname: string) {
    console.log('search by username', inputname);
    return this.userService.searchByUsername(inputname);
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
  @Post('forgot-password')
  async getOtpForgotPassword(@Body() emailOrPhoneBody: {email_or_phone: string}) {
    return this.authService.sendOtpVerification(emailOrPhoneBody.email_or_phone, OtpType.ForgotPassword )
  }

  @Public()
  @Get('reset-password')
  async changePassword(@Query() queryObj: {link: string}) {
    console.log('change password', queryObj.link)
  }
}
