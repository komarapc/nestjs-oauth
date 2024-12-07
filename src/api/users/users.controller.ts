import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserCreateSchema,
  UserQuerySchema,
  UserUpdateSchema,
} from './users.schema';
import { Response, Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGuard } from '@/guards/permission/permission.guard';
import { OpenApiResponses } from '@/decorators/openapi-response.decorator';

@ApiBearerAuth()
@Controller('users')
@UseGuards(PermissionGuard)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get()
  @OpenApiResponses([200, 400, 401, 403, 500])
  async getAll(
    @Query() query: UserQuerySchema,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const cacheKey = req.originalUrl;
    const dataCache: any = await this.cacheManager.get(cacheKey);
    if (dataCache) return res.status(HttpStatus.OK).json(dataCache);
    const result = await this.userService.getAll(query);
    await this.cacheManager.set(cacheKey, result, 15 * 1000);
    res.status(result.status_code).json(result);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const cacheKey = req.originalUrl;
    const dataCache = await this.cacheManager.get(cacheKey);
    if (dataCache) return res.status(HttpStatus.OK).json(dataCache);
    const result = await this.userService.findOne(id);
    await this.cacheManager.set(cacheKey, result, 15 * 1000);
    res.status(result.status_code).json(result);
  }

  @Post()
  async store(@Body() body: UserCreateSchema, @Res() res: Response) {
    const result = await this.userService.store(body);
    res.status(result.status_code).json(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateSchema,
    @Res() res: Response,
  ) {
    const result = await this.userService.update(id, body);
    res.status(result.status_code).json(result);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.destroy(id);
    res.status(result.status_code).json(result);
  }
}
