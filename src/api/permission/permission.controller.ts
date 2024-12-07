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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import {
  PermissionDto,
  PermissionQueryDto,
  PermissionUpdateDto,
} from './permission.openapi';
import { OpenApiResponses } from '@/decorators/openapi-response.decorator';
import {
  PermissionCreateSchema,
  PermissionQuerySchema,
  PermissionUpdateSchema,
} from './permission.schema';

@Controller('permission')
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiQuery({ type: PermissionQueryDto })
  @ApiOperation({ summary: 'Get all permission' })
  @OpenApiResponses([200, 400, 500])
  async getAll(@Query() query: PermissionQuerySchema, @Res() res: Response) {
    const result = await this.permissionService.getAll(query);
    res.status(result.status_code).json(result);
  }

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
  @ApiOperation({ summary: 'Create new permission or bulk update' })
  async store(@Body() body: any, @Res() res: Response) {
    const result = await this.permissionService.store(body);
    res.status(result.status_code).json(result);
  }

  @Put(':id')
  @OpenApiResponses([200, 400, 500])
  @ApiOperation({ summary: 'Update permission' })
  @ApiBody({ type: PermissionUpdateDto })
  async update(
    @Param('id') id: string,
    @Body() body: PermissionUpdateSchema,
    @Res() res: Response,
  ) {
    const result = await this.permissionService.update(id, body);
    res.status(result.status_code).json(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission - Soft delete' })
  @OpenApiResponses([204, 400, 500])
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const result = await this.permissionService.destroy(id);
    res.status(result.status_code).json(result);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore permission' })
  @OpenApiResponses([200, 400, 500])
  async restore(@Param('id') id: string, @Res() res: Response) {
    const result = await this.permissionService.restore(id);
    res.status(result.status_code).json(result);
  }
}
