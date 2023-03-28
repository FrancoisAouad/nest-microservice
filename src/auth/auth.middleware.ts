import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // get the user credentials from the request body (assuming credentials are passed in the request body)
    const { username, password } = req.body;

    // perform authentication logic here...

    // if authentication is successful, add user credentials to the request object
    req['user'] = { username, password };

    next();
  }
}
