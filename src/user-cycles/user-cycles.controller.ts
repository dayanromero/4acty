import { Controller, Get, Post, Param, Put, UseInterceptors } from '@nestjs/common';
import { UserCyclesService } from './user-cycles.service';
import { Auth,User } from 'src/common/decorators';
import {  User as UserEntity } from 'src/user/entity';
import { CyclesService } from 'src/cycles/cycles.service';
import { Cycle } from '../cycles/entity/cycles.entity';
import { TransformInterceptor } from 'src/shared/http-response';
import { Category } from 'src/category/entity';
import { UserCategoryService } from 'src/user-category/user-category.service';
import { ModuleAppService } from '../modules/modules.service';

@Controller('user-cycles')
@UseInterceptors(TransformInterceptor)
export class UserCyclesController {

    constructor(
    
        private readonly userCyclesService:UserCyclesService,
        private readonly cyclesService: CyclesService,
        private readonly moduleAppService: ModuleAppService,
        private readonly userCategoryService: UserCategoryService
    ){}
    
    @Auth()
    @Get('category/:category')
    async getCycles(
        @Param() dto,
        @User() user:UserEntity
    ) {
        let totalUserCycle =await this.userCyclesService.getTotalUserWhitCycleForCategory(dto.category,user);
        let cycles = await this.cyclesService.getCycleForCategory(dto.category);
        /**
         * Consultamos el ciclo enviado
         */
       let categoryCycle   =  await this.cyclesService.getOne(cycles[0]);   
       /**
        * Obtengo la relación categoria, con user categoria y obtener el modulo
        */
        let categoryModule = await this.userCategoryService.getOneUserCategory(categoryCycle.category,user);

        let module =  await this.moduleAppService.getOne(categoryModule['module']['id']);

            
        let countStatus = 0;

        if(totalUserCycle===0){
            for (let index = 0; index < cycles.length; index++) {
                let idcycle = new Cycle();
                const element = cycles[index];
                  
                idcycle.id= element.id;
                cycles[index]['view']=false;
                this.userCyclesService.addUserWhitCycle(idcycle,user);
            }
        }else{
            let UserCycle =await this.userCyclesService.getUserWhitCycleIsView(dto.category,user,true);
            for (let index = 0; index < cycles.length; index++) {
                const element = cycles[index];
                let validView = 0;
                for (let indextwo = 0; indextwo < UserCycle.length; indextwo++) {
                    const cyclesuserActive = UserCycle[indextwo];
                      
                    if(element.id===cyclesuserActive['cycle']){
                        validView++;
                        
                    }
                    
                }
                if(validView>0){
                    cycles[index]['view']=true;
                    cycles[index]['estatus']='completed';
                }else{
                    
                    cycles[index]['view']=false;
                    countStatus++;
                    cycles[index]['estatus']='incomplete';
                }
                
            }

        }
        let estatusGlobal = (countStatus==0)?'complete':'incomplete';
        return {data:cycles,aditional:{screen:module.screen2,estatus:estatusGlobal}};
    }

    @Auth()
    @Put('cycle/:cycle')
    async getCategorys(
        @Param() dto,
        @User() user:UserEntity
    ) {
       
        /**
         * Actualizo el cyclo visto
         */
       let updateUserCycle = await this.userCyclesService.editOne(dto.cycle,user,{view:true});

        /**
         * Consultamos el ciclo enviado
         */
       let categoryCycle   =  await this.cyclesService.getOne(dto.cycle);   
       
       /**
        * Consulta para saber si la persona ya realizo todos los ciclos
        */
       let UserCycle =await this.userCyclesService.getUserWhitCycleIsView(categoryCycle.category.id,user,false);
       
       
       /**
        * Obtengo la relación categoria, con user categoria y obtener el modulo
        */
       let categoryModule = await this.userCategoryService.getOneUserCategory(categoryCycle.category,user);
     
        /**
         * obtengo la ultima categoria del usario sin ver 
         */
        let recordUserCategory = await this.userCategoryService.getStatusCategoryNext(categoryModule.module,user,categoryCycle.category.parent,0);
    
        /**
         * Validamos los cyclos vistos, si ya estan todos vistos actualizamos el ciclo a cerrado
         */
       if(UserCycle.length===0){
        await this.userCategoryService.updateStatus(categoryCycle.category,user,2);

        /**
         * Valido si existe un categoria siguiente para realizxar, la actualizo a 1:En proceso
         */
        if(recordUserCategory){
            await this.userCategoryService.updateStatus(recordUserCategory.idCategory,user,1);
        }
       }
       
       return {data:updateUserCycle,message:'Ciclo Actualizado'};
    }

    @Auth()
    @Get('activity')
    async getUserActivity(
        @User() user:UserEntity
    ) {
        let userActivity = await this.userCyclesService.getUserCyclesActivity(user,true);
        return {data:userActivity};
    }
}
