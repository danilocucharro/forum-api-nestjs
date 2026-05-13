import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateAccountController } from "./controllers/create-account.controller.js";
import { AuthenticateController } from "./controllers/authenticate-controller.js";
import { CreateQuestionController } from "./controllers/create-question.controller.js";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller.js";


@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService]
})
export class HttpModule { }
