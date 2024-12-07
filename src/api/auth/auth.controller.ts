import { GoogleAuthGuard } from '@/guards/google-auth/google-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { OpenApiResponses } from '@/decorators/openapi-response.decorator';
import { AuthLocalLoginDto, AuthLocalLoginRolesDto } from './auth.openapi';
import { AuthLocalLoginRolesSchema, AuthLocalLoginSchema } from './auth.schema';
import { TokenServie } from '@/services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenServie: TokenServie,
  ) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return { message: 'Google login' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() request: Request, @Res() res: Response) {
    const result = await this.authService.callbackGoogleAuth(
      request?.user as Profile,
    );
    res.status(result.status_code).json(result);
  }

  @Post('local/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @OpenApiResponses([200, 400, 500])
  @ApiBody({ type: AuthLocalLoginDto })
  async localLogin(@Body() body: AuthLocalLoginSchema, @Res() res: Response) {
    const result = await this.authService.loginLocal(body);
    res.status(result.status_code).json(result);
  }

  @Post('local/login-roles')
  @ApiOperation({ summary: 'Login with email and password and roles' })
  @OpenApiResponses([200, 400, 500])
  @ApiBody({ type: AuthLocalLoginRolesDto })
  async localLoginRoles(
    @Body() body: AuthLocalLoginRolesSchema,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    await this.tokenServie.setToken(token);
    const result = await this.authService.loginLocalWithRoles(body);
    res.status(result.status_code).json(result);
  }
}
