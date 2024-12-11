import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import config from '@/config/app';

describe('AppController', () => {
  let appController: AppController;
  let cacheManager: Cache;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    cacheManager = app.get<Cache>(CACHE_MANAGER);
  });

  describe('getHello', () => {
    it('should return cached data if available', async () => {
      const cacheData = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: { app_name: 'NestJS OAuth', version: '1.0.0' },
      };
      mockCacheManager.get.mockResolvedValue(cacheData);

      const res = mockResponse();
      await appController.getHello(res);

      expect(cacheManager.get).toHaveBeenCalledWith('app_info');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(cacheData);
    });

    it('should return fresh data if cache is not available', async () => {
      mockCacheManager.get.mockResolvedValue(null);

      const res = mockResponse();
      await appController.getHello(res);

      const expectedData = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: { app_name: config().app.name, version: config().app.version },
      };

      expect(cacheManager.get).toHaveBeenCalledWith('app_info');
      expect(cacheManager.set).toHaveBeenCalledWith(
        'app_info',
        expectedData,
        60 * 60 * 1000,
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(expectedData);
    });
  });
});
