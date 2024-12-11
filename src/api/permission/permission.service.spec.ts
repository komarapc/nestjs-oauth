import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import {
  PermissionQuerySchema,
  PermissionCreateSchema,
  PermissionUpdateSchema,
} from './permission.schema';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';

describe('PermissionService', () => {
  let service: PermissionService;
  let permissionRepository: PermissionRepository;

  const mockPermissionRepository = {
    getAll: jest.fn(),
    findOne: jest.fn(),
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        { provide: PermissionRepository, useValue: mockPermissionRepository },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    permissionRepository =
      module.get<PermissionRepository>(PermissionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
