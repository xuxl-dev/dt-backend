import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from "helmet";
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/AllExceptionFilter';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { FCAuthPlugins } from './modules/fasterCurd/gql/backend/plugins/Auth';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configure GQL Faster CRUD auth
  FCAuthPlugins.getInstance('main').init(app.get(AuthService))

  app.setGlobalPrefix('/dt-api');

  app.enableCors();

  // const config = new DocumentBuilder()
  //   .setTitle('Xlxu系统管理后台')
  //   .setDescription('管理后台接口文档')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('/apidoc', app, document); 
  // Logger.debug('Swagger is available on: http://localhost:3000/apidoc');
  // Logger.debug('Import json file from: http://localhost:3000/apidoc-json');
  Logger.debug('graphql is available on: http://localhost:3000/graphql');
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      // whitelist: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }
  ))
  app.use(helmet()); // for better security
  // global error handler
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
