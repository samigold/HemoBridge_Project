import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
    
  statusCode!:number;
  status!:string;  

  constructor(message: string) {
    super(message || "There was a server error, please try again. If issue persists, please contact support.");
    this.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
    this.status = "ERROR:INTERNAL_SERVER_ERROR"
  }
}