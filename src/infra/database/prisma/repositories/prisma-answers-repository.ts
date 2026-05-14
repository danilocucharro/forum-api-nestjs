import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.js";
import { Answer } from "@/domain/forum/enterprise/entities/answer.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  create(answer: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Answer | null> {
    throw new Error("Method not implemented.");
  }
  delete(answer: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(question: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]> {
    throw new Error("Method not implemented.");
  }
}
