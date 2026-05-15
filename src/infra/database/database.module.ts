import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service.js";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository.js";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository.js";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository.js";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository.js";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository.js";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository.js";
import { QuestionsRepository } from "../../domain/forum/application/repositories/questions-repository.js";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository.js";
import { StudentsRepository } from "../../domain/forum/application/repositories/students-repository.js";

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository
    }
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    StudentsRepository
  ],
})
export class DatabaseModule { }
