import { Request, Response, NextFunction } from 'express';
import UserService from '../../services/UserService';
import User from '../../models/User';
import { generateJwt } from '../../utils/jwt';
import { onSuccess } from '../../utils/Response';
import errors from '../../utils/errors.json';

const userService: UserService = new UserService();
const propertyNoFound: object = JSON.parse(
  JSON.stringify(errors.propertyNoFound)
);
const routeError: object = JSON.parse(JSON.stringify(errors.routeError));

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    let email: string = req.body.email;
    let password: string = req.body.password;
    const user: User = userService.login(email, password);

    if (user) {
      const token = generateJwt(user.id);
      res.status(200).send(onSuccess(user, token));
    } else {
      next(propertyNoFound);
    }
  } catch (error) {
    next(routeError);
    console.log(error);
  }
};
