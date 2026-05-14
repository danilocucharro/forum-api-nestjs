import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  create(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }
  delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
