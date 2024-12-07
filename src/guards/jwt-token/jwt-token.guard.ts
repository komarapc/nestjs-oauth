import { TokenService } from '@/services/token.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) return false;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) return false;
    this.tokenService.setToken(token);
    return true;
  }
}
