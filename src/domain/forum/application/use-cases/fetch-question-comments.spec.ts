import { expect, describe, it, beforeEach } from 'vitest'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { makeQuestionComment } from '../../../../../test/factory/make-question-comment.js'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments.js'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase // System under test

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch all question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { value } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { value } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(value?.questionComments).toHaveLength(2)
  })
})
