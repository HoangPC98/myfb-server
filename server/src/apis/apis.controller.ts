import { Body, Headers, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { ApisService } from './apis.service';

@Controller('apis')
export class AuthController {
  constructor(private readonly apisService: ApisService) {}

  @Public()
  @Post('search')
  async loginGoogle(@Body() searchBody: {resource: string, key: string}, @Headers() headers): Promise<any> {
    console.log('login header>>>>', headers);
    return await this.apisService.search(
      searchBody.resource,
      searchBody.key
    );
    
  }
}