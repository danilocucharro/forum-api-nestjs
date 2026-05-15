import { Injectable } from '@nestjs/common'
import { left, right, type Either } from '../../../../core/either.js'
import { Student } from '../../enterprise/entities/student.js'
import { StudentsRepository } from '../repositories/students-repository.js'
import { HashGenerator } from '../cryptography/hash-generator.js'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error.js'
import { HashComparer } from '../cryptography/hash-comparer.js'
import { Encrypter } from '../cryptography/encrypter.js'
import { WrongCredentialsError } from './errors/wrong-credentials-error.js'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) { }

  async execute({
    email,
    password
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(password, student.password)

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })

    return right({ accessToken })
  }
}
