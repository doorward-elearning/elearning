import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExceptionCause } from '@doorward/backend/exceptions/exception.cause';

export type PaginatedEntities<Entity> = {
  entities: Array<Entity>;
  pagination: PaginationMetaData;
};

export class PaginationMetaData {
  @Expose()
  totalPages: number;

  @Expose()
  totalCount: number;

  @Expose()
  page: number;

  @Expose()
  count: number;
}

export default class DApiResponse {
  @Expose()
  success?: boolean;

  @Expose()
  statusCode?: number;

  @Expose()
  timestamp?: Date;

  @Expose()
  message?: string;

  @Expose()
  cause?: ExceptionCause;

  @Expose()
  errors?: Array<{ [name: string]: string }>;
}

export class PaginatedResponse extends DApiResponse {
  @Expose()
  pagination: PaginationMetaData;
}
