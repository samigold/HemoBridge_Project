import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode!:number;
  status!:string;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.BAD_REQUEST
    this.status = "ERROR:NOT_FOUND"
  }
}