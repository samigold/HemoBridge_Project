import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
    
  statusCode!:number;
  status!:string;

  constructor(message: string) {
    super(message ?? "Unauthorized access");
    this.statusCode = HTTP_STATUS.FORBIDDEN;
    this.status = "ERROR:UNAUTHORIZED"
  }
}