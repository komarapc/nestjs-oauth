import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { HasRolesModule } from './has-roles/has-roles.module';
import { PermissionModule } from './permission/permission.module';
import { ResourceModule } from './resource/resource.module';
import { AuthBearerMiddleware } from '@/middleware/auth-bearer/auth-bearer.middleware';
import { TokenService } from '@/services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    HasRolesModule,
    PermissionModule,
    ResourceModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [TokenService, UsersRepository],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthBearerMiddleware)
      .exclude(
        { path: 'auth/google/login', method: RequestMethod.GET },
        { path: 'auth/google/callback', method: RequestMethod.GET },
        { path: 'auth/local/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
