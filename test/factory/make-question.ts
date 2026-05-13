import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Question,
  type QuestionProps,
} from '../../src/domain/forum/enterprise/entities/question.js'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      bestAnswerId: undefined,
      ...override,
    },
    id,
  )

  return question
}
