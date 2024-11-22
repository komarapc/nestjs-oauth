import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import config from '@/config/app';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@ApiTags('/')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getHello(@Res() res: Response) {
    const cacheKey = 'app_info';
    const cacheData = await this.cacheManager.get(cacheKey);
    if (cacheData) {
      res.status(HttpStatus.OK).json(cacheData);
    } else {
      const data = {
        status_code: HttpStatus.OK,
        status_message: 'OK',
        data: { app_name: config().app.name, version: config().app.version },
      };
      await this.cacheManager.set(cacheKey, data, 60 * 60 * 1000);
      res.status(HttpStatus.OK).json(data);
    }
  }
}
