import { NextFunction, Response, Request } from 'express';
import UserService from '../../services/UserService';
import errors from '../../utils/errors.json';
import { onSuccess } from '../../utils/Response';
import { validateJwt } from '../../utils/jwt';

const userService: UserService = new UserService();
const routeError: object = JSON.parse(JSON.stringify(errors.routeError));

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    let isValid: boolean = validateJwt(req, res, next);
    let id: number = req.body.id;

    if (isValid && !res.headersSent) {
      userService.remove(id);
      res.status(200).send(onSuccess({ isRemoved: true }));
    }
  } catch (error) {
    next(routeError);
    console.log(error);
  }
};
