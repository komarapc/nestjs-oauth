import { TokenServie } from '@/services/token.service';
import { responseUnauthorized } from '@/utils/response-data';
import {
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthBearerMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenServie) {}
  private readonly logger = new Logger(AuthBearerMiddleware.name);
  async use(@Req() req: Request, @Res() res: Response, next: () => void) {
    this.logger.log(AuthBearerMiddleware.name);
    const authorization = req.headers.authorization;
    const unauthorized = responseUnauthorized('Unauthorized');
    if (!authorization)
      return res.status(unauthorized.status_code).json(unauthorized);

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token)
      return res.status(unauthorized.status_code).json(unauthorized);
    const validateToken = this.tokenService.validateToken(token);
    if (!validateToken)
      return res.status(HttpStatus.UNAUTHORIZED).json(unauthorized);
    await this.tokenService.setToken(token);
    next();
  }
}
