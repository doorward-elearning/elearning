export type ApiCall<T> = (...args: any[]) => Promise<T>;

export type ApiError = {
  message?: string;
  errors?: {
    [name: string]: string;
  };
};

export type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
  errors?: ApiError;
  meta?: any;
};
