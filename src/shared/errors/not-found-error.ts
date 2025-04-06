import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    
  statusCode!:number;
  status!:string;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.NOT_FOUND
    this.status = "ERROR:NOT_FOUND"
  }
}