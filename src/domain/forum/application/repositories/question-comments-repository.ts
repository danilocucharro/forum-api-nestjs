import type { PaginationParams } from '../../../../core/repositories/pagination-params.js'
import type { QuestionComment } from '../../enterprise/entities/question-comment.js'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
}
