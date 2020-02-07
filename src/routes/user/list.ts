import { NextFunction, Response, Request } from 'express';
import UserService from '../../services/UserService';
import { validateJwt } from '../../utils/jwt';
import User from '../../models/User';
import { onSuccess } from '../../utils/Response';
import errors from '../../utils/errors.json';

const userService: UserService = new UserService();
const routeError: object = JSON.parse(JSON.stringify(errors.routeError));

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    let isValid: boolean = validateJwt(req, res, next);
    if (isValid && !res.headersSent) {
      let users: Array<User> = userService.list();
      res.status(200).send(onSuccess(users));
    }
  } catch (error) {
    next(routeError);
    console.log(error);
  }
};
