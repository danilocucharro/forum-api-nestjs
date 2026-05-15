import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository.js'
import { FakeHasher } from 'test/cryptography/fake-hasher.js'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter.js'
import { AuthenticateStudentUseCase } from './authenticate-student.js'
import { makeStudent } from 'test/factory/make-student.js'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase // System under test

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able to authenticate a Student', async () => {
    const student = makeStudent({
      email: 'john@email.com',
      password: await fakeHasher.hash('123456')
    })
    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'john@email.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    console.log(result.value)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })
})
