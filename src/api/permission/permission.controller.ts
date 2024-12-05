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
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { PermissionCreateDto, PermissionDto } from './permission.openapi';
import { OpenApiResponses } from '@/decorators/openapi-response.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permission' })
  @OpenApiResponses([200, 400, 500])
  async getAll(@Query() query: any, @Res() res: Response) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one permission' })
  @OpenApiResponses([200, 400, 500])
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.permissionService.findOne(id);
    res.status(result.status_code).json(result);
  }

  @Post()
  @ApiBody({ type: [PermissionDto] })
  @OpenApiResponses([201, 400, 500])
  @ApiOperation({ summary: 'Create new permission' })
  async store(@Body() body: any, @Res() res: Response) {
    const result = await this.permissionService.store(body);
    res.status(result.status_code).json(result);
  }

  @Put(':id')
  @OpenApiResponses([200, 400, 500])
  @ApiOperation({ summary: 'Update permission' })
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission' })
  @OpenApiResponses([204, 400, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Restore permission' })
  @OpenApiResponses([200, 400, 500])
  async restore(@Param('id') id: string, @Res() res: Response) {}
}
