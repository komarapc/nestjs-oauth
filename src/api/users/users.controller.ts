import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserCreateSchema,
  UserQuerySchema,
  UserUpdateSchema,
} from './users.schema';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(@Query() query: UserQuerySchema, @Res() res: Response) {
    const result = await this.userService.getAll(query);
    res.status(result.status_code).json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.findOne(id);
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
