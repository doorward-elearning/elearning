export type ApiCall<T> = (...args: any[]) => Promise<T>;

export interface ApiError {
  message?: string;
  errors?: {
    [name: string]: string;
  };
}
