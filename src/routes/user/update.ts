import { Response, NextFunction, Request } from 'express';
import UserService from '../../services/UserService';
import errors from '../../utils/errors.json';
import { onSuccess } from '../../utils/Response';
import { validateJwt } from '../../utils/jwt';
import User from '../../models/User';

const userService: UserService = new UserService();
const routeError: object = JSON.parse(JSON.stringify(errors.routeError));

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    let isValid: boolean = validateJwt(req, res, next);
    let user: User = req.body;
    user.modifiedDate = new Date();
    user.modifiedBy = user.name;

    if (isValid && !res.headersSent) {
      userService.update(user);
      res.status(200).send(onSuccess({ isUpdated: true }));
    }
  } catch (error) {
    next(routeError);
    console.log(error);
  }
};
