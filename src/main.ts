import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@/config/app';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: config().secret.session,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const configOpenApi = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const doumentFactory = () => SwaggerModule.createDocument(app, configOpenApi);
  SwaggerModule.setup('docs', app, doumentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      syntaxHighlight: {
        activate: true,
        theme: 'arta',
      },
    },
  });
  await app.listen(config().port);
}
bootstrap();
