import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetProfileQuery } from './dto/get-profile.dto';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('search')
  searchByUsername(@Query('inputname') inputname: string) {
    console.log('search by username', inputname);
    return this.userService.searchByUsername(inputname);
  }

  @Get('profile')
  async getProfile(
    @GetCurrentUID() uid: number,
    @Query() getProfileQuery: GetProfileQuery,
  ) {
    return this.userService.getProfile(+getProfileQuery.user_id, uid);
  }
}
