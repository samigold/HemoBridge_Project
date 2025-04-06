import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  statusCode!:number;
  status!:string;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY
    this.status = "ERROR:INVALID_PARAMETER"
  }
}