import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Response } from 'express';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async getAll(@Query() query: any, @Res() res: Response) {}

  @Get(':/id')
  async findOne(@Param('id') id: string, @Res() res: Response) {}

  @Post()
  async store(@Body() body: any, @Res() res: Response) {}

  @Put(':/id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {}

  @Delete(':/id')
  async destroy(@Param('id') id: string, @Res() res: Response) {}

  @Patch(':/id')
  async restore(@Param('id') id: string, @Res() res: Response) {}
}
