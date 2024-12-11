import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '@/services/token.service';
import { HasRoleRepository } from '@/api/has-roles/has-roles.repository';
import { RolesRepository } from '@/api/roles/roles.repository';
import { UsersRepository } from '@/api/users/users.repository';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthLocalLoginSchema } from './auth.schema';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    loginLocal: jest.fn(),
  };

  const mockTokenService = {
    setToken: jest.fn(),
  };

  const mockUsersRepository = {
    findOneById: jest.fn(),
  };

  const mockHasRoleRepository = {
    existUserRoles: jest.fn(),
  };

  const mockRolesRepository = {
    findOneById: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
        { provide: HasRoleRepository, useValue: mockHasRoleRepository },
        { provide: RolesRepository, useValue: mockRolesRepository },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('localLogin', () => {
    it('should return a successful login response', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: { token: 'some-token' },
      };

      mockAuthService.loginLocal.mockResolvedValue(result);

      const res = mockResponse();
      await controller.localLogin(loginDto, res);

      expect(authService.loginLocal).toHaveBeenCalledWith(loginDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should return an error response if login fails', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        status_code: HttpStatus.UNAUTHORIZED,
        status_message: 'Unauthorized',
        data: null,
      };

      mockAuthService.loginLocal.mockResolvedValue(result);

      const res = mockResponse();
      await controller.localLogin(loginDto, res);

      expect(authService.loginLocal).toHaveBeenCalledWith(loginDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });
});
