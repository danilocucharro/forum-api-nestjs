import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions.js'
import { makeQuestion } from '../../../../../test/factory/make-question.js'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

let sut: FetchRecentQuestionsUseCase // System under test

describe('Fetch Recent Questions By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 23) }),
    )

    const { value } = await sut.execute({ page: 1 })

    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { value } = await sut.execute({ page: 2 })

    expect(value?.questions).toHaveLength(2)
  })
})
