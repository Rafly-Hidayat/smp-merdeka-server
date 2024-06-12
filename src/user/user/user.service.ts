import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const schema = z.object({
      username: z.string().min(1).max(100),
      email: z.string().min(1).max(100).email(),
      password: z.string().min(1).max(100),
    });
    this.validationService.validate(schema, { username, email, password });

    const getUser = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (getUser) {
      throw new HttpException('Username already exist!', 401);
    }

    password = await bcrypt.hash(password, 10);
    return this.prismaService.user.create({
      data: { username, password, email },
      select: { username: true, email: true },
    });
  }

  async login(username: string, password?: string): Promise<User> {
    const schema = z.object({
      username: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
    });
    this.validationService.validate(schema, { username, password });

    const getUser = await this.prismaService.user.findFirst({
      where: { username },
    });
    console.log(getUser, password);
    if (!getUser) {
      throw new HttpException('Username or password is wrong!', 401);
    }

    const validate = await bcrypt.compare(password, getUser.password);
    console.log(validate);
    if (!validate) {
      throw new HttpException('Username or password is wrong!', 401);
    }
    delete getUser.password;

    return getUser;
  }
}
