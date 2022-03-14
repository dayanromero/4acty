import { Module } from '@nestjs/common';
import { FormGroupController } from './form-group.controller';
import { FormGroupService } from './form-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormGroupApp } from './entity/form-group.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([FormGroupApp])
  ],
  controllers: [FormGroupController],
  providers: [FormGroupService]
})
export class FormGroupModule {}
