import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Notification,
  type NotificationProps,
} from '../../src/domain/notification/enterprise/entities/notification.js'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      recipientId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return notification
}
