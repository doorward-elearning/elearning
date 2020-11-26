import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiPaginationQuery = () =>
  applyDecorators(
    ApiQuery({
      name: 'page',
      type: 'number',
      required: false,
    }),
    ApiQuery({
      name: 'limit',
      type: 'number',
      required: false,
    }),
    ApiQuery({
      name: 'noPagination',
      type: 'boolean',
      required: false,
    })
  );

export interface PaginationQuery {
  page?: number;
  limit?: number;
  noPagination?: boolean;
}
