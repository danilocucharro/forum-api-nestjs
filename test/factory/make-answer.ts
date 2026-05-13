import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Answer,
  type AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer.js'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
