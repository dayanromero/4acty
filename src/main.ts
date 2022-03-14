import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET, SERVER_PORT } from 'src/config/constants';
import { setDefaultUser } from './config/default-user';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService)
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  
  const secret = config.get<string>(JWT_SECRET);
  
  
  initSwagger(app);
  setDefaultUser(config);
  
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    );
    
    app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
  await app.listen(port);
    
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();

