import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationMetaData {
  @ApiProperty()
  @Expose()
  pages: number;

  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty()
  @Expose()
  page: number;
}

export default class DApiResponse {
  @ApiProperty()
  @Expose()
  success?: boolean;

  @ApiProperty()
  @Expose()
  statusCode?: number;

  @ApiProperty()
  @Expose()
  timestamp?: Date;

  @ApiProperty()
  @Expose()
  message?: string;

  @ApiProperty()
  @Expose()
  errors?: Array<{ [name: string]: string }>;

  @ApiProperty()
  @Expose()
  pagination?: PaginationMetaData;
}
