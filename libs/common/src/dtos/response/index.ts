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

export * from './groups.responses';
export * from './courses.responses';
export * from './modules.responses';
export * from './organization.responses';
export * from './students.responses';
export * from './auth.responses';
export * from './module.items.responses';
export * from './course.managers.responses';
export * from './users.responses';
