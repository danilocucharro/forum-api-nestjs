import { left, right, type Either } from '../../../../core/either.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js'
import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.js'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  attachmentsIds: string[]
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>

export class EditAnswerUseCase {
  constructor(
    private questionsRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.questionsRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentsList = new AnswerAttachmentList(
      currentQuestionAttachments,
    )

    const newAnswerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: new UniqueEntityId(answerId),
      })
    })

    answerAttachmentsList.update(newAnswerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentsList

    await this.questionsRepository.save(answer)

    return right({ answer })
  }
}
