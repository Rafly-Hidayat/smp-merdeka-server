import { HttpException, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class StudentService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    name: string,
    address: string,
    classId: number,
  ): Promise<Student> {
    const schema = z.object({
      name: z.string().min(1).max(100),
      address: z.string().min(1).max(100),
      classId: z.number(),
    });
    this.validationService.validate(schema, { name, address, classId });

    const getClass = await this.prismaService.class.findUnique({
      where: { id: classId },
    });
    if (!getClass) {
      throw new HttpException('Class Not Found', 404);
    }

    return this.prismaService.student.create({
      data: { name, address, classId },
    });
  }

  async getAll(): Promise<Student[]> {
    return this.prismaService.student.findMany({
      include: { class: true },
    });
  }

  async update(
    id: number,
    name: string,
    address: string,
    classId: number,
  ): Promise<Student> {
    const schema = z.object({
      name: z.string().min(1).max(100),
      address: z.string().min(1).max(100),
      classId: z.number(),
    });
    this.validationService.validate(schema, { name, address, classId });

    const getStudent = await this.prismaService.student.findUnique({
      where: { id },
    });
    if (!getStudent) {
      throw new HttpException('Student Not Found', 404);
    }

    const getClass = await this.prismaService.class.findUnique({
      where: { id: classId },
    });
    if (!getClass) {
      throw new HttpException('Class Not Found', 404);
    }

    return this.prismaService.student.update({
      data: { name, address, classId },
      where: { id },
    });
  }

  async delete(id: number): Promise<Student> {
    const getStudent = await this.prismaService.student.findUnique({
      where: { id },
    });
    if (!getStudent) {
      throw new HttpException('Student Not Found', 404);
    }

    return this.prismaService.student.delete({
      where: { id },
    });
  }
}
