import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './custom-error';

export class ConflictError extends CustomError {
    
  statusCode!:number;
  status!:string;  

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_STATUS.CONFLICT;
    this.status = "ERROR:CONFLICT"
  }
}