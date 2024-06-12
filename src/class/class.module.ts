import { Module } from '@nestjs/common';
import { ClassController } from './class/class.controller';
import { ClassService } from './class/class.service';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
