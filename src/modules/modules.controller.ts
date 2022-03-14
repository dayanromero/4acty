import { Controller, Post, Body, Put, Param, Get, UseInterceptors } from '@nestjs/common';
import { User as UserEntity } from 'src/user/entity';
import { User, Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';
import { CreateModuleDto, EditModuleDto } from './dtos/';
import { ModuleAppService } from './modules.service';
import { TransformInterceptor } from '../shared/http-response';
import { PointsUserService } from 'src/points-user/points-user.service';

export interface UserFindOne{
    id?:number;
    email?:string;
  }
@UseInterceptors(TransformInterceptor)
@Controller('modules')
export class ModulesController {

    constructor(
        private readonly moduleApp:ModuleAppService,
        private readonly pointsUser:PointsUserService,
    ){}

    @Auth()
    @Get()
    async getMany(
        @User() user: UserEntity
    ) {
        const data = await this.moduleApp.getMany();
    
        const dataPointuser = await this.pointsUser.getPointUser(user); 
    
        for (let index = 0; index < data.length; index++) {
            const module = data[index];
            
            let validView = 0;
            for (let i = 0; i < dataPointuser.length; i++) {
                const pointuser = dataPointuser[i];
                if(pointuser['test']['module']['id']===module['id']){
                    validView++;
                } 
            }
            if(validView>0){
                data[index]['test']=true;
            }else{
                data[index]['test']=false;
            } 
        }
            return { data }
    }

    @Auth()
    @Get(':id')
    async getOne(
        @Param('id') id: number,
    ) {
    const data = await this.moduleApp.getOne(id);
    return { data }
    }

    
    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.MODULE
      })
    @Post()
    async createModule(
        @Body() data:CreateModuleDto,
        @User() user: UserEntity
    ){
        data.user = user;
        this.moduleApp.createOne(data);
    }

    @Auth()
    @Put(':id')
    async updateModule(
        @Param('id') id: number,
        @Body() data:EditModuleDto,
        @User() user: UserEntity
    ){
        data.user = user;
        this.moduleApp.editOne(id,data);
    }   
    
}



