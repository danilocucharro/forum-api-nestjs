import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module.js'
import { PrismaService } from '../prisma/prisma.service.js'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'

describe('Create Question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Maria Doe',
        email: 'maria@email.com',
        password: 'maria123',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Nova question teste1',
        content: 'Conteudo da nova question teste',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDataBase = await prisma.question.findFirst({
      where: { title: 'Nova question teste1' },
    })

    expect(questionOnDataBase).toBeTruthy()
  })
})
