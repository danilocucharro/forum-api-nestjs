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
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data
    })
  }

  async findBySlug(slug: string) {
    const question = await this.prisma.question.findUnique({
      where: { slug }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
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

  async findManyRecent({ page }: PaginationParams) {
    const questions = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async delete(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: { id: data.id }
    })
  }

  async save(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.update({
      where: { id: data.id },
      data
    })
  }

}
