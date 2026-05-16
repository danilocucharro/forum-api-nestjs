import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator.js'
import type { UserPayload } from '../../auth/jwt.strategy.js'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js'
import z from 'zod'
import { CreateQuestionUseCase } from '../../../domain/forum/application/use-cases/create-question.js'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: []
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
