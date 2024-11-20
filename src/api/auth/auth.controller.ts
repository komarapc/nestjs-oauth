import { GoogleAuthGuard } from '@/guards/google-auth/google-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return { message: 'Google login' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback() {
    return { message: 'Google callback' };
  }
}
