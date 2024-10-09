import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Get env variables
  const config = app.get(EnvService); 
  const port = config.get("PORT"); 

  //Start
  await app.listen(port);
}
bootstrap();
