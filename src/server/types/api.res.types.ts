export interface ErrorResponse {
  isSuccess: false;
  Message: string;
}

export interface SuccessResponse {
  isSuccess: true;
  Message: string;
}
