import type { PaginationParams } from '../../../../core/repositories/pagination-params.js'
import type { Answer } from '../../enterprise/entities/answer.js'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(question: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}
