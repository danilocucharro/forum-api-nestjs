import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository.js'
import { ReadNotificationUseCase } from './read-notification.js'
import { makeNotification } from '../../../../../test/factory/make-notification.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should NOT be able to read a notification', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniqueEntityId('recipient-1'),
      },
      new UniqueEntityId('notification-1'),
    )
    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      recipientId: 'author-2',
      notificationId: 'notification-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
