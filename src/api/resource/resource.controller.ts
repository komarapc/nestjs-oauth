import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceCreateSchema, ResourceQuery } from './resource.schema';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ResourceCreateDto, ResourceQueryDto } from './resource.openapi';
import { OpenApiResponses } from '@/decorators/openapi-response.decorator';
import { PermissionGuard } from '@/guards/permission/permission.guard';
import { JwtTokenGuard } from '@/guards/jwt-token/jwt-token.guard';

@Controller('resources')
@ApiBearerAuth()
@UseGuards(JwtTokenGuard)
@UseGuards(PermissionGuard)
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOperation({ summary: 'Get all resources' })
  @OpenApiResponses([200, 404, 500])
  @ApiQuery({ type: ResourceQueryDto })
  @Get()
  async getAll(@Query() query: ResourceQuery, @Res() res: Response) {
    const result = await this.resourceService.getAll(query);
    res.status(result.status_code).json(result);
  }

  @ApiOperation({ summary: 'Get a resource by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @OpenApiResponses([200, 404, 500])
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.resourceService.findOne(id);
    res.status(result.status_code).json(result);
  }

  @ApiBody({ type: ResourceCreateDto })
  @ApiOperation({ summary: 'Create a new resource' })
  @OpenApiResponses([201, 400, 500])
  @Post()
  async store(@Body() data: ResourceCreateSchema, @Res() res: Response) {
    const result = await this.resourceService.store(data);
    res.status(result.status_code).json(result);
  }

  @ApiBody({ type: ResourceCreateDto })
  @ApiOperation({ summary: 'Update a resource' })
  @OpenApiResponses([200, 400, 500])
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: ResourceCreateSchema,
    @Res() res: Response,
  ) {
    const result = await this.resourceService.update(id, body);
    res.status(result.status_code).json(result);
  }

  @ApiOperation({ summary: 'Delete a resource' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @OpenApiResponses([200, 404, 500])
  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const result = await this.resourceService.destroy(id);
    res.status(result.status_code).json(result);
  }

  @ApiOperation({ summary: 'Restore a resource' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @OpenApiResponses([200, 404, 500])
  @Put(':id/restore')
  async restore(@Param('id') id: string, @Res() res: Response) {
    const result = await this.resourceService.restore(id);
    res.status(result.status_code).json(result);
  }
}
