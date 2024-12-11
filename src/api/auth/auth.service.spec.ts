import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { TokenService } from '@/services/token.service';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { RolesRepository } from '../roles/roles.repository';
import { AuthLocalLoginSchema } from './auth.schema';
import * as bcrypt from 'bcrypt';
import {
  responseBadRequest,
  responseInternalServerError,
  responseNotFound,
  responseOk,
  responseUnauthorized,
} from '@/utils/response-data';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  let tokenService: TokenService;
  let hasRoleRepository: HasRoleRepository;

  const mockUsersRepository = {
    findOneByEmail: jest.fn(),
    findOneById: jest.fn(),
    store: jest.fn(),
  };

  const mockTokenService = {
    generateToken: jest.fn(),
    decodeToken: jest.fn(),
    getToken: jest.fn(),
  };

  const mockHasRoleRepository = {
    getByUserId: jest.fn(),
    existUserRoles: jest.fn(),
  };

  const mockRolesRepository = {
    findOneById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: TokenService, useValue: mockTokenService },
        { provide: HasRoleRepository, useValue: mockHasRoleRepository },
        { provide: RolesRepository, useValue: mockRolesRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    tokenService = module.get<TokenService>(TokenService);
    hasRoleRepository = module.get<HasRoleRepository>(HasRoleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginLocal', () => {
    it('should return a successful login response', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: '1',
        email: 'test@example.com',
        password: bcrypt.hashSync('password123', 10),
        deletedAt: null,
      };

      const token = 'some-token';
      const roles = [{ id: '1', name: 'Admin' }];

      mockUsersRepository.findOneByEmail.mockResolvedValue(user);
      mockTokenService.generateToken.mockReturnValue(token);
      mockHasRoleRepository.getByUserId.mockResolvedValue(roles);

      const result = await service.loginLocal(loginDto);

      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        { id: user.id },
        '5m',
      );
      expect(hasRoleRepository.getByUserId).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(
        responseOk({
          user: { id: user.id, email: user.email, deletedAt: null },
          avaliable_roles: roles,
          token,
        }),
      );
    });

    it('should return a not found response if user does not exist', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockUsersRepository.findOneByEmail.mockResolvedValue(null);

      const result = await service.loginLocal(loginDto);

      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
      expect(result).toEqual(responseNotFound('User not found'));
    });

    it('should return an unauthorized response if password does not match', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: '1',
        email: 'test@example.com',
        password: bcrypt.hashSync('wrongpassword', 10),
        deletedAt: null,
      };

      mockUsersRepository.findOneByEmail.mockResolvedValue(user);

      const result = await service.loginLocal(loginDto);

      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
      expect(result).toEqual(responseUnauthorized('Password not match'));
    });

    it('should return an internal server error response if an error occurs', async () => {
      const loginDto: AuthLocalLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const error = new Error('Something went wrong');
      mockUsersRepository.findOneByEmail.mockRejectedValue(error);

      const result = await service.loginLocal(loginDto);

      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
      expect(result).toEqual(responseInternalServerError(error.message));
    });
  });
});
