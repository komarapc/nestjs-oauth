import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google-auth.strategy';
import { SessionSerializer } from './auth.serializer';
import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';
import { Repository } from 'typeorm';
import { TokenServie } from '@/services/token.service';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { HasRoles } from '@/entities/master/has-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HasRoles])],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionSerializer,
    GoogleStrategy,
    UsersRepository,
    Repository,
    TokenServie,
    HasRoleRepository,
  ],
})
export class AuthModule {}
