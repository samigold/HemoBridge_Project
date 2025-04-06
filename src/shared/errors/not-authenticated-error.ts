import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotAuthenticatedError extends CustomError {
    
  statusCode!:number;
  status!:string;

  constructor(message: string) {
    super(message ?? "Unauthorized access");
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
    this.status = "ERROR:UNAUTHORIZED"
  }
}