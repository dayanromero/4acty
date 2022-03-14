import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldForm } from './entity';
import { CreateFieldsFormsDTO, EditFieldsFormsDTO } from './dto';

@Injectable()
export class FieldsFormsService {
    constructor(
        @InjectRepository(FieldForm)
        private readonly fieldForm: Repository<FieldForm>
      ) {}
    
      async getMany() {
        return await this.fieldForm.find()
      }

      async getOne(id: number) {
        const fieldForm = await this.fieldForm.findOne(id);
        if (!fieldForm) throw new NotFoundException('FieldForm does not exists')
        return fieldForm;
      }

      async createOne(dto: CreateFieldsFormsDTO) {
        const newField = this.fieldForm.create(dto)
        const field = await this.fieldForm.save(newField)
        return field;
      }

      async editOne(id: number, dto: EditFieldsFormsDTO) {
        const field = await this.getOne(id)   
        const editedField = Object.assign(field, dto);
        return await this.fieldForm.save(editedField);
      }
}
