import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller.js";
import { AuthenticateController } from "./controllers/authenticate-controller.js";
import { CreateQuestionController } from "./controllers/create-question.controller.js";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller.js";
import { DatabaseModule } from "../database/database.module.js";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ]
})
export class HttpModule { }
