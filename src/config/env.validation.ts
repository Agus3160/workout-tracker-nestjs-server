import { z } from 'zod';

export const envValidationSchema = z.object({
  //ENV
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.number().default(8000),
  
  //DB 
  DB_URL: z.string(),
  
  //CORS

  //JWT 
  JWT_SECRET: z.string().default('secret'),
  JWT_EXPIRES_IN: z.string().default('1d'),

});

export type EnvType = z.infer<typeof envValidationSchema>;
