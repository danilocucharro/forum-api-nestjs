import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { StudentsRepository } from "../../../../domain/forum/application/repositories/students-repository.js";
import { Student } from "../../../../domain/forum/enterprise/entities/student.js";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper.js";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(student: Student) {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data
    })
  }

  async findByEmail(email: string) {
    const student = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }
}
