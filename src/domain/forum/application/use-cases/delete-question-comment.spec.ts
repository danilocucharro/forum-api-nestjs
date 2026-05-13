import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js'
import { makeQuestionComment } from '../../../../../test/factory/make-question-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete another question comment', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
