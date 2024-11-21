import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesCreateSchema, RolesQuerySchema } from './roles.schema';
import { Response } from 'express';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAll(@Query() query: RolesQuerySchema, @Res() res: Response) {
    const result = await this.rolesService.getAll(query);
    res.status(result.status_code).json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.rolesService.findOne(id);
    res.status(result.status_code).json(result);
  }

  @Post()
  async store(@Body() body: RolesCreateSchema, @Res() res: Response) {
    const result = await this.rolesService.store(body);
    res.status(result.status_code).json(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: RolesCreateSchema,
    @Res() res: Response,
  ) {
    const result = await this.rolesService.update(id, body);
    res.status(result.status_code).json(result);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const result = await this.rolesService.destroy(id);
    res.status(result.status_code).json(result);
  }
}
