import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { FieldsFormsService } from './fields-forms.service';
import { Auth } from 'src/common/decorators';
import { CreateFieldsFormsDTO } from './dto/create-fields-forms.dto';

@Controller('fields-forms')
export class FieldsFormsController {
    constructor(
        private readonly fieldsFormsService: FieldsFormsService,
    ){}
    
    @Auth()
      //verifica si el usuario tiene permisos para poder modificar el usuario
      @Post()
      async createOne(
        @Body() dto: CreateFieldsFormsDTO
      ) {
        const data = await this.fieldsFormsService.createOne(dto)
        return { message: 'field created', data }
      }

      @Auth()
      //verifica si el usuario tiene permisos para poder modificar el usuario
      @Put(':id')
      async editOne(
        @Param('id') id: number,
        @Body() dto: CreateFieldsFormsDTO,
      ) {
        const data = await this.fieldsFormsService.editOne(id,dto);
        return { message: 'field created', data }
      }
}
