import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factory/make-answer.js'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factory/make-question.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository.js'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: ChooseQuestionBestAnswerUseCase // System under test

describe('Delete Answer By ID', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose a best answer for a question', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      answerId: newAnswer.id.toValue(),
    })

    expect(
      inMemoryQuestionsRepository.items[0]?.bestAnswerId?.toValue(),
    ).toEqual(newAnswer.id.toValue())
  })

  it('should NOT be able to choose a best answer for a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: newAnswer.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
