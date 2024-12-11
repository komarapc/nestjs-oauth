import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  PermissionQuerySchema,
  PermissionUpdateSchema,
} from './permission.schema';
import { TokenService } from '@/services/token.service';
import { PermissionRepository } from './permission.repository';
import { HasRoleRepository } from '../has-roles/has-roles.repository';

describe('PermissionController', () => {
  let controller: PermissionController;
  let permissionService: PermissionService;

  const mockPermissionService = {
    getAll: jest.fn(),
    findOne: jest.fn(),
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const mockTokenService = {
    setToken: jest.fn(),
  };
  const mockPermissionRepo = {
    getByRole: jest.fn(),
  };
  const mockHasRoleRepo = {
    existUserRoles: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        { provide: PermissionService, useValue: mockPermissionService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: PermissionRepository, useValue: mockPermissionRepo },
        { provide: HasRoleRepository, useValue: mockHasRoleRepo },
      ],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
    permissionService = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all permissions', async () => {
      const query: PermissionQuerySchema = { page: 1, limit: 10 };
      const result = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: [],
      };

      mockPermissionService.getAll.mockResolvedValue(result);

      const res = mockResponse();
      await controller.getAll(query, res);

      expect(permissionService.getAll).toHaveBeenCalledWith(query);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe('findOne', () => {
    it('should return one permission', async () => {
      const id = '1';
      const result = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: {},
      };

      mockPermissionService.findOne.mockResolvedValue(result);

      const res = mockResponse();
      await controller.findOne(id, res);

      expect(permissionService.findOne).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe('store', () => {
    it('should create a new permission', async () => {
      const body = {};
      const result = {
        status_code: HttpStatus.CREATED,
        status_message: 'Created',
        data: {},
      };

      mockPermissionService.store.mockResolvedValue(result);

      const res = mockResponse();
      await controller.store(body, res);

      expect(permissionService.store).toHaveBeenCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe('update', () => {
    it('should update a permission', async () => {
      const id = '1';
      const body: PermissionUpdateSchema = {};
      const result = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: {},
      };

      mockPermissionService.update.mockResolvedValue(result);

      const res = mockResponse();
      await controller.update(id, body, res);

      expect(permissionService.update).toHaveBeenCalledWith(id, body);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe('destroy', () => {
    it('should delete a permission', async () => {
      const id = '1';
      const result = {
        status_code: HttpStatus.NO_CONTENT,
        status_message: 'No Content',
      };

      mockPermissionService.destroy.mockResolvedValue(result);

      const res = mockResponse();
      await controller.destroy(id, res);

      expect(permissionService.destroy).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });
});
