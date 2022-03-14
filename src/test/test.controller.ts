import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { CreateTestDto, EditTestDTO } from './dto';
import { TestService } from './test.service';
import { Auth } from 'src/common/decorators';


@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService,
    ){}

    @Auth()
    //verifica si el usuario tiene permisos para poder modificar el usuario
    @Get('module/:id')
    async getTestModules(
      @Param('id') id: number,

    ) {
      const data = await this.testService.getWhitModule(id)
      return { message: 'test created', data }
    }
   
    @Auth()
      //verifica si el usuario tiene permisos para poder modificar el usuario
      @Post()
      async createOne(
        @Body() dto: CreateTestDto
      ) {
        const data = await this.testService.createOne(dto)
        return { message: 'test created', data }
      }

      @Auth()
      //verifica si el usuario tiene permisos para poder modificar el usuario
      @Put(':id')
      async editOne(
        @Param('id') id: number,
        @Body() dto: EditTestDTO,
      ) {
        const data = await this.testService.editOne(id,dto);
        return { message: 'tets edited', data }
      }
}
