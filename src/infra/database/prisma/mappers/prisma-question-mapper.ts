import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.js";
import { Question as PrismaQuestion } from "prisma/generated/prisma/client.js";

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question{
    return Question.create({
      title: raw.title,
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityId(raw.bestAnswerId) : null,
      slug: Slug.create(raw.slug),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityId(raw.id))
  }
}
