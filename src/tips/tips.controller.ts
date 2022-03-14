import { Controller, UseInterceptors, Get, Param } from '@nestjs/common';
import { TipsService } from './tips.service';
import { TransformInterceptor } from 'src/shared/http-response';
import { Auth,User } from 'src/common/decorators';
import {  User as UserEntity } from 'src/user/entity';
import { ModuleApp } from 'src/modules/entity';

@Controller('tips')
@UseInterceptors(TransformInterceptor)
export class TipsController {
    constructor(private tipsService:TipsService){}

    @Auth()
    @Get('module/:id')
    async tipsForModule(
        @Param() moduleId:number
    ){

        return {data: await this.tipsService.getOneWhitModule(moduleId)}
    }

    @Auth()
    @Get(':id')
    async tipOne(
        @Param() id
    ){    
        let tips = await this.tipsService.getOne(id);
        return {data:tips}
    }

}
