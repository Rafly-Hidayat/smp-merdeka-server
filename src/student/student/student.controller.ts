import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('/api/students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('classId') classId: number,
  ): Promise<any> {
    const result = await this.studentService.create(name, address, classId);
    return {
      message: 'Successfully create student',
      data: result,
    };
  }

  @Get()
  async getAll(): Promise<any> {
    const result = await this.studentService.getAll();
    return {
      message: 'Successfully get all students',
      data: result,
    };
  }

  @Post('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('classId') classId: number,
  ): Promise<any> {
    const result = await this.studentService.update(id, name, address, classId);
    return {
      message: 'Successfully update student',
      data: result,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.studentService.delete(id);
    return {
      message: 'Successfully delete student',
      data: result,
    };
  }
}
