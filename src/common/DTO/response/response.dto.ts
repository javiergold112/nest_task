export class ResponseDto<T> {
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;

  constructor(statusCode: number, data?: T, message?: string, error?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
