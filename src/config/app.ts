import * as dotenv from 'dotenv';
dotenv.config();
export default () => ({
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
  },
  port: +process.env.PORT || 3000,
  secret: {
    session: process.env.SESSION_SECRET,
  },
  database: {
    default: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      databaseName: process.env.DATABASE_NAME,
    },
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  salt_round: +process.env.SALT_ROUND || 12,
});
