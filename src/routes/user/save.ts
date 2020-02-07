import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../../utils/jwt';
import UserService from '../../services/UserService';
import User from '../../models/User';
import errors from '../../utils/errors.json';
import { onSuccess } from '../../utils/Response';

const userService: UserService = new UserService();
const routeError: object = JSON.parse(JSON.stringify(errors.routeError));

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    let isValid: boolean = validateJwt(req, res, next);
    let user: User = req.body;
    user.createdDate = new Date();
    user.modifiedDate = new Date();
    user.createdBy = user.name;
    user.modifiedBy = user.name;

    if (isValid && !res.headersSent) {
      user = userService.save(user);
      res.status(200).send(onSuccess(user));
    }
  } catch (error) {
    next(routeError);
    console.log(error);
  }
};
