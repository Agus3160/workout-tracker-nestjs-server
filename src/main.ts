import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { GlobalExceptionFilter } from './util/filter/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Get env variables
  const config = app.get(EnvService); 
  const port = config.get("PORT"); 

  //Config exceptionHandler
  app.useGlobalFilters(new GlobalExceptionFilter());

  //Start
  await app.listen(port);
}
bootstrap();
