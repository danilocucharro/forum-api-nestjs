import { DomainEvents } from '../../../../core/events/domain-events.js'
import type { EventHandler } from '../../../../core/events/event-handler.js'
import type { AnswersRepository } from '../../../forum/application/repositories/answers-repository.js'
import { QuestionBestAnswerChosenEvent } from '../../../forum/events/question-best-answer-chosen-event.js'
import type { SendNotificationUseCase } from '../use-cases/send-notification.js'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que voce envio em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
