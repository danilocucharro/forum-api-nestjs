import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment.js'
import { makeAnswerComment } from '../../../../../test/factory/make-answer-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete an answer comment', async () => {
    const newAnswerComment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete another answer comment', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
