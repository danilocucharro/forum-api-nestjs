import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '../../prisma/generated/prisma/client.js'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env.js'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService<Env, true>) {
    const databaseURL = new URL(config.get('DATABASE_URL', { infer: true }))

    const adapter = new PrismaPg(
      { connectionString: databaseURL.toString() },
      { schema: 'public' },
    )
    super({
      adapter,
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}
