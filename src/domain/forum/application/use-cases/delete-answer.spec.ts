import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factory/make-answer.js'
import { DeleteAnswerUseCase } from './delete-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'
import { makeAnswerAttachment } from '../../../../../test/factory/make-answer-attachment.js'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: DeleteAnswerUseCase // System under test

describe('Delete Answer By ID', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a question by an ID', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({ authorId: 'author-1', answerId: 'question-1' })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete a question', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'question-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
