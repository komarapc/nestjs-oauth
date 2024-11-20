import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import config from '@/config/app';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: config().oauth.google.clientId,
      clientSecret: config().oauth.google.clientSecret,
      callbackURL: config().oauth.google.callbackURL,
      scope: config().oauth.google.scope,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUser({
      name: profile.displayName,
      email: profile.emails[0].value,
    });
    return user || null;
  }
}
