export interface PaginationMetaData {
  pagination: {
    pages: number;
    total: number;
    page: number;
  };
}

export default class DApiResponse {
  success?: boolean;
  statusCode?: number;
  timestamp?: Date;
  message?: string;
  errors?: Array<{ [name: string]: string }>;
  meta?: PaginationMetaData;
  [name: string]: any;
}
