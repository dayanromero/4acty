import { Module } from '@nestjs/common';
import { FormToTestService } from './form-to-test.service';
import { FormToTestController } from './form-to-test.controller';
import { FormToTest } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([FormToTest])
  ],
  providers: [FormToTestService],
  controllers: [FormToTestController]
})
export class FormToTestModule {}
