import { Request, Response, NextFunction } from 'express';
import errors from './errors.json';

const noFound: object = JSON.parse(JSON.stringify(errors.noFound));

export default class ErrorHandler {
  errorResponse(error, req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      res.status(error.status).send({
        success: false,
        status: error.status,
        error: error.message || 'Unknown error in the server'
      });
    }
  }

  public noFoundError(req: Request, res: Response, next: NextFunction): void {
    next(noFound);
  }
}
