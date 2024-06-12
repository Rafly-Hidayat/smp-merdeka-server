import { Module } from '@nestjs/common';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
