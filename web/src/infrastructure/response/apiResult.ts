export interface ApiResult<T> {
  isSuccess: boolean;
  errorMessage: string | null;
  data: T | null;
}