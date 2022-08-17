import { Injectable, Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class ResponseDataWithPagination {
  // constructor(public readonly dataArg: unknown) {}
  @ApiProperty()
  count: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  data: unknown;
}

@Injectable()
export class GetListResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Get list successfully' })
  message: string;

  @ApiProperty()
  data: ResponseDataWithPagination;
}
