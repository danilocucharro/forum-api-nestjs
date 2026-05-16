import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env.js'
import { AuthModule } from './auth/auth.module.js'
import { HttpModule } from './http/http.module.js'
import { EnvService } from './env/env.service.js'
import { EnvModule } from './env/env.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule
  ],
})
export class AppModule {}
