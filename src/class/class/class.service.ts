import { HttpException, Injectable } from '@nestjs/common';
import { Class } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class ClassService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(className: string): Promise<Class> {
    const schema = z.string().min(1).max(100);
    this.validationService.validate(schema, className);

    const getClass = await this.prismaService.class.findFirst({
      where: { class_name: className },
    });

    if (getClass) {
      throw new HttpException('Class Name already exist!', 401);
    }

    return this.prismaService.class.create({
      data: { class_name: className },
    });
  }

  async getAll(): Promise<Class[]> {
    return this.prismaService.class.findMany({
      include: { Students: true },
    });
  }

  async update(id: number, className: string): Promise<Class> {
    const schema = z.string().min(1).max(100);
    this.validationService.validate(schema, className);

    const getClass = await this.prismaService.class.findUnique({
      where: { id },
    });
    if (!getClass) {
      throw new HttpException('Class Not Found', 404);
    }

    const getClassByName = await this.prismaService.class.findFirst({
      where: { class_name: className },
    });
    if (getClassByName) {
      throw new HttpException('Class Name already exist!', 401);
    }

    return this.prismaService.class.update({
      data: { class_name: className },
      where: { id },
    });
  }

  async delete(id: number): Promise<Class> {
    const getClass = await this.prismaService.class.findUnique({
      where: { id },
    });
    if (!getClass) {
      throw new HttpException('Class Not Found', 404);
    }

    return this.prismaService.class.delete({
      where: { id },
    });
  }
}
