import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('/api/classes')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post()
  async create(@Body('className') className: string): Promise<any> {
    const result = await this.classService.create(className);
    return {
      message: 'Successfully create class',
      data: result,
    };
  }

  @Get()
  async getAll(): Promise<any> {
    const result = await this.classService.getAll();
    return {
      message: 'Successfully get all classes',
      data: result,
    };
  }

  @Post('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('className') className: string,
  ): Promise<any> {
    const result = await this.classService.update(id, className);
    return {
      message: 'Successfully update class',
      data: result,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.classService.delete(id);
    return {
      message: 'Successfully delete class',
      data: result,
    };
  }
}
