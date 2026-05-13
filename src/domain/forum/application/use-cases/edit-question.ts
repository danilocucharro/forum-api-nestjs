import { left, right, type Either } from '../../../../core/either.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.js'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentsList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const newQuestionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: new UniqueEntityId(questionId),
      })
    })

    questionAttachmentsList.update(newQuestionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentsList

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
