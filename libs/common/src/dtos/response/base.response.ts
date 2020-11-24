import { Expose } from 'class-transformer';

export type Paginatedmodels<Model> = {
  models: Array<Model>;
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
  errors?: Array<{ [name: string]: string }>;
}

export class PaginatedResponse extends DApiResponse {
  @Expose()
  pagination: PaginationMetaData;
}
