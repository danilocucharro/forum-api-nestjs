import type { PaginationParams } from '../../src/core/repositories/pagination-params.js'
import type { AnswerCommentsRepository } from '../../src/domain/forum/application/repositories/answer-comments-repository.js'
import type { AnswerComment } from '../../src/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(questionId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toValue() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
