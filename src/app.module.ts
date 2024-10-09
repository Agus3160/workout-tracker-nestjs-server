import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { EnvModule } from './env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envValidationSchema.parse(config),
      validationOptions: {
        allowUnknown: false,
      },
    }),
    EnvModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvModule], 
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        url: envService.get("DB_URL"),
        type: "postgres",
        synchronize: envService.get("NODE_ENV") === "development",
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule {}
