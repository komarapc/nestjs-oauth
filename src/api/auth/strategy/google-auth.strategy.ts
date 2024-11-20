import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import config from '@/config/app';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: config().oauth.google.clientId,
      clientSecret: config().oauth.google.clientSecret,
      callbackURL: config().oauth.google.callbackURL,
      scope: config().oauth.google.scope,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    done(null, profile);
  }
}
