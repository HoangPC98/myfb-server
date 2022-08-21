import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileQuery } from './dto/get-profile.dto';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { UpdateUserInfoDto } from './dto/update-user.dto';
import { UserInfoType } from 'src/types/enum-types/common.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
