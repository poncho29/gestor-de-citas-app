export type ErrorResult = {
  ok: boolean;
  data: null;
  error: string
}

export type SuccessResult<T> = {
  ok: boolean;
  data: T;
  error: null;
}

export type Result<T> = SuccessResult<T> | ErrorResult;