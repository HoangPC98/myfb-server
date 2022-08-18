import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
