import type { UniqueEntityId } from '../../../core/entities/unique-entity-id.js'
import type { DomainEvent } from '../../../core/events/domain-event-.js'
import type { Question } from '../enterprise/entities/question.js'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.ocurredAt = new Date()
    this.question = question
    this.bestAnswerId = bestAnswerId
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
