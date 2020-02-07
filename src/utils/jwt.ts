import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import errors from './errors.json';

const jwtNoFound: object = JSON.parse(JSON.stringify(errors.jwtNoFound));
const jwtFailed: object = JSON.parse(JSON.stringify(errors.jwtFailed));

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): boolean => {
  let token = req.headers['x-access-token'];

  if (!token && !res.headersSent) {
    next(jwtNoFound);
    return false;
  } else if (token && !res.headersSent) {
    jwt.verify(token, 'secretPassword', err => {
      if (err) {
        next(jwtFailed);
        return false;
      }
    });
  }
  return true;
};

export const generateJwt = userId =>
  jwt.sign({ userId: userId.toString() }, 'secretPassword');
