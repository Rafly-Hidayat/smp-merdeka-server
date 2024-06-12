import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ClassModule,
    StudentModule,
    ValidationModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
