import { expect, describe, it, beforeEach } from 'vitest'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js'
import { makeAnswerComment } from '../../../../../test/factory/make-answer-comment.js'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments.js'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase // System under test

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch all question comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('question-1'),
      }),
    )

    const { value } = await sut.execute({ answerId: 'question-1', page: 1 })

    expect(value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('question-1') }),
      )
    }

    const { value } = await sut.execute({ answerId: 'question-1', page: 2 })

    expect(value?.answerComments).toHaveLength(2)
  })
})
