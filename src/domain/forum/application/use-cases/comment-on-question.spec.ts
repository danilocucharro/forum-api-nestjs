import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'
import { makeQuestion } from '../../../../../test/factory/make-question.js'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository.js'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      content: newQuestion.content,
    })

    expect(inMemoryQuestionCommentsRepository.items[0]?.id).toBeTruthy()
  })
})
