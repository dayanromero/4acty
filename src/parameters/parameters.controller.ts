import { Controller, UseInterceptors, Get } from '@nestjs/common';
import { Auth } from '../common/decorators/auth.decorator';
import { TransformInterceptor } from '../shared/http-response';
import { ParametersService } from './parameters.service';
import ParamterType from './factory/enum/paramater-type';
import { Parameter } from './entity/parameter.entity';

@Controller('parameters')
@UseInterceptors(TransformInterceptor)
export class ParametersController {
    constructor(
        private readonly parametersService: ParametersService
    ){}
    @Get('antecendent')
    async getCategorys(
      ) {
         
        const antecendentsList = await this.parametersService.create(ParamterType.Antecendent)
        const antecendentsNew = antecendentsList.map((antecendent) => {
          const antecendentNew = {id:antecendent.value,name:antecendent.name}  ;
          return antecendentNew;
        })
        return await {data:antecendentsNew};
      }
      @Get('habits')
      async getHabits(
        ) {
           
          const antecendentsList = await this.parametersService.create(ParamterType.Habit)
          const antecendentsNew = antecendentsList.map((antecendent) => {
            const antecendentNew = {id:antecendent.value,name:antecendent.name}  ;
            return antecendentNew;
          })
          return await {data:antecendentsNew};
        }
}
