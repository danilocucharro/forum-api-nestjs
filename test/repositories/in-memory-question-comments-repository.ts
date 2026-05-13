import type { PaginationParams } from '../../src/core/repositories/pagination-params.js'
import type { QuestionCommentsRepository } from '../../src/domain/forum/application/repositories/question-comments-repository.js'
import type { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment.js'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toValue() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
