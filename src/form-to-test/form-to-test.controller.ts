import { Controller, Put, Param, Body, Post, Get, UseInterceptors } from '@nestjs/common';
import { FormToTestService } from './form-to-test.service';
import { Auth, User } from 'src/common/decorators';
import { CreateFormToTestDTO } from './dto/create-form-to-test.dto';
import { EditFormToTestDTO } from './dto/edit-form-to-test.dto';
import { TestApp } from 'src/test/entity';
import { TransformInterceptor } from 'src/shared/http-response';

@UseInterceptors(TransformInterceptor)
@Controller('form-to-test')
export class FormToTestController {
    
    constructor(
        private readonly formToTestService: FormToTestService,
    ){}

    @Auth()
    @Get(':id/view/:view')
    async getMany(
      @Param('id') id,
      @Param('view') view,
    ) {
      
      const data = await this.formToTestService.getMany(id,view);
      return { data }

    }
    
    @Auth()
    //verifica si el usuario tiene permisos para poder modificar el usuario
    @Post()
    async createOne(
      @Body() dto: CreateFormToTestDTO
    ) {
      const data = await this.formToTestService.createOne(dto)
      return { message: 'test created', data }
    }

    @Auth()
    //verifica si el usuario tiene permisos para poder modificar el usuario
    @Put(':id')
    async editOne(
      @Param('id') id: number,
      @Body() dto: EditFormToTestDTO,
    ) {
      const data = await this.formToTestService.editOne(id,dto);
      return { message: 'tets edited', data }
    }
}
