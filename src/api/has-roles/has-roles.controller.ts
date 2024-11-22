import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { HasRolesService } from './has-roles.service';
import { Response } from 'express';
import { HasRolesCreateDto, HasRolesCreateSchema } from './has-roles.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('has-roles')
export class HasRolesController {
  constructor(private readonly hasRoleService: HasRolesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.hasRoleService.findOne(id);
    res.status(result.status_code).json(result);
  }

  @Post()
  @ApiBody({ type: HasRolesCreateDto })
  async store(@Body() body: HasRolesCreateSchema, @Res() res: Response) {
    const result = await this.hasRoleService.store(body);
    res.status(result.status_code).json(result);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const result = await this.hasRoleService.destroy(id);
    res.status(result.status_code).json(result);
  }
}
