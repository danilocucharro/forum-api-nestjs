
import { Student } from "../../../../domain/forum/enterprise/entities/student.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import { User as PrismaStudent, Prisma } from "prisma/generated/prisma/client.js";

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Student{
    return Student.create({
      name: raw.name,
      email: raw.email,
      password: raw.password
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      email: student.email,
      name: student.name,
      password: student.password,
    }
  }
}
