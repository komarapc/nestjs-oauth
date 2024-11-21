import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import config from '@/config/app';
@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      status_message: 'OK',
      data: { app_name: config().app.name, version: config().app.version },
    });
  }
}
