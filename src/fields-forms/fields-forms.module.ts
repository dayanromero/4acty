import { Module } from '@nestjs/common';
import { FieldForm } from './entity';
import { FieldsFormsController } from './fields-forms.controller';
import { FieldsFormsService } from './fields-forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([FieldForm])
],
  controllers: [FieldsFormsController],
  providers: [FieldsFormsService]
})
export class FieldsFormsModule {}
