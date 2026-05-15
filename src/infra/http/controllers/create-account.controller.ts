import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js'
import { z } from 'zod'
import { RegisterStudentUseCase } from '../../../domain/forum/application/use-cases/register-student.js'
import { StudentAlreadyExistsError } from '../../../domain/forum/application/use-cases/errors/student-already-exists-error.js'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name,
      email,
      password
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
        throw new BadRequestException(error.message)
      }
    }
  }
}
