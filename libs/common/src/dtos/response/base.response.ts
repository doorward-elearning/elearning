import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export type PaginatedEntities<Entity> = {
  entities: Array<Entity>;
  pagination: PaginationMetaData;
};

export class PaginationMetaData {
  @ApiProperty()
  @Expose()
  totalPages: number;

  @ApiProperty()
  @Expose()
  totalCount: number;

  @ApiProperty()
  @Expose()
  page: number;

  @ApiProperty()
  @Expose()
  count: number;
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
}

export class PaginatedResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  pagination: PaginationMetaData;
}
