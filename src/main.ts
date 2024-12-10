import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@/config/app';
import * as session from 'express-session';
import * as passport from 'passport';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppClusterService } from './services/clusterize.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const configOpenApi = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doumentFactory = () => SwaggerModule.createDocument(app, configOpenApi);
  SwaggerModule.setup('docs', app, doumentFactory, {
    customSiteTitle: 'API Documentation',
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
    customCss: `.swagger-ui .topbar { display: none }`,
    customCssUrl: '/css/dark-theme.css',
  });
  await app.listen(config().port);
}
AppClusterService.clusterize(bootstrap);
