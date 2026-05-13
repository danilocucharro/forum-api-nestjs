import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  AnswerComment,
  type AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answer-comment.js'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
