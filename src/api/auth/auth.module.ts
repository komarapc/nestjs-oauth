import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google-auth.strategy';
import { SessionSerializer } from './auth.serializer';
import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';
import { Repository } from 'typeorm';
import { TokenService } from '@/services/token.service';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Roles } from '@/entities/master/roles.entity';
import { RolesRepository } from '../roles/roles.repository';
import { AuthBearerMiddleware } from '@/middleware/auth-bearer/auth-bearer.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, HasRoles, Roles])],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionSerializer,
    GoogleStrategy,
    UsersRepository,
    Repository,
    TokenService,
    HasRoleRepository,
    RolesRepository,
  ],
})
export class AuthModule {}
