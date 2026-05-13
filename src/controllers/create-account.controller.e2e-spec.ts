import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module.js'
import { PrismaService } from '../prisma/prisma.service.js'
import request from 'supertest'

describe('Create Account (E2E)', () => {
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

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Maria2 Doe',
      email: 'Maria2@email.com',
      password: 'john123',
    })

    expect(response.statusCode).toBe(201)

    const userOnDataBase = await prisma.user.findUnique({
      where: { email: 'Maria2@email.com' },
    })

    expect(userOnDataBase).toBeTruthy()
  })
})
