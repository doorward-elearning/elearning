export type ApiCall<T> = (...args: any[]) => Promise<T>;

export type ApiError = {
  message?: string;
  errors?: {
    [name: string]: string;
  };
};
