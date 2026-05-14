import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper.js";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(question: Question) {
    // const newQuestion = await this.prisma.question.create({
    //   data: {

    //   }
    // })
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
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
