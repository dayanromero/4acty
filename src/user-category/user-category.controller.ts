import { Controller, Body, Get, Post, UseInterceptors, Param } from '@nestjs/common';
import { UserCategoryService } from './user-category.service';
import { Auth,User } from 'src/common/decorators';
import { User as UserEntity} from 'src/user/entity';
import { TransformInterceptor } from 'src/shared/http-response';
import { ModuleAppService } from '../modules/modules.service';

@Controller('user-category')
@UseInterceptors(TransformInterceptor)
export class UserCategoryController {

    constructor(
       
        private readonly userCategoryService: UserCategoryService,
        private readonly moduleAppService: ModuleAppService,

    ){}

    @Auth()
    @Get('module/:module/parent/:parent')
    async getCategorys(
      @Param() dto,
      @User() user:UserEntity
    ) {
    
      let category = await this.userCategoryService.getUserWhitCategoryModule(dto.module,dto.parent,user);

      let module = await this.moduleAppService.getOne(dto.module);

      
      let countStatus = 0;
      let usercategoryComplete = await this.userCategoryService.getUserWhitCategoryStatus(dto.module,user,dto.parent);
      for (let index = 0; index < usercategoryComplete.length; index++) {
        const element = usercategoryComplete[index];
        let nameStatus = '';
        let estatus = '';
        switch (element.status) {
          case 1:
            nameStatus = 'En progreso';
            estatus = 'incomplete';
            countStatus++;
            break;
            case 2:
              
              nameStatus = 'completado';
              estatus = 'completed';
              break;
              
              default:
                nameStatus = 'Bloqueado';
                estatus = 'incomplete';
                countStatus++;
            break;
        }
        usercategoryComplete[index]['nameStatus']=nameStatus;
        usercategoryComplete[index]['estatus']=estatus;
        
        
      }
      let estatusGlobal = (countStatus==0)?'complete':'incomplete';
      return { aditional:{screen:module.screen1,estatus:estatusGlobal}, data:usercategoryComplete }

    }
}
