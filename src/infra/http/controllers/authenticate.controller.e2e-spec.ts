import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../app.module.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import request from 'supertest'
import { hash } from 'bcryptjs'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /authenticate', async () => {
    await prisma.user.create({
      data: {
        name: 'Maria Doe',
        email: 'Maria@email.com',
        password: await hash('maria123', 8),
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'Maria@email.com',
      password: 'maria123',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
