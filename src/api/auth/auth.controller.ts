import { GoogleAuthGuard } from '@/guards/google-auth/google-auth.guard';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
