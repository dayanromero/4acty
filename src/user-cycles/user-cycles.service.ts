import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCycles } from './entity';
import { User } from 'src/user/entity';
import { Category } from 'src/category/entity';
import { Cycle } from 'src/cycles/entity';
import { ModuleApp } from 'src/modules/entity';

@Injectable()
export class UserCyclesService {
    constructor(
        @InjectRepository(UserCycles)
        private readonly userCycles: Repository<UserCycles>
    ){}
    

    async getOneUserAndCycle(cycle:Cycle,user:User) {
        const userCycle = await this.userCycles.findOne({user:user,cycle:cycle});
        if (!userCycle) throw new NotFoundException('No existe cyclo con usuario');
    
        return userCycle;
      }

    async addUserWhitCycle(cycle:Cycle,user:User){
        const addUserCycle = new UserCycles();
        addUserCycle.user = user;
        addUserCycle.cycle = cycle;
        await addUserCycle.save();
    }

    async getTotalUserWhitCycleForCategory(category:Category,user:User){
        let  count  = await  this.userCycles.createQueryBuilder('uscy')
        .where({user:user})
        .select(['uscy.id'])
        .innerJoin('uscy.cycle', 'cy')
        .andWhere('cy.id=uscy.cycle')
        .andWhere(`cy.categoryId=${category}`)
        .getCount();
        // .getSql();
        return count;
    }
    async getUserWhitCyclesCategory(cycle:Cycle,user:User){
        let  count  = await  this.userCycles.find({user:user,cycle:cycle})
        return count;
    }
    /**
        * Consulta para saber si la persona ya realizo todos los ciclos
        */
    async getUserWhitCycleIsView(category:number,user:User,view:boolean){
          
        let  count  = await  this.userCycles.createQueryBuilder('uscy')
        .where({user:user,view:view})
        .select(['uscy.id as id','cy.id as cycle','uscy.view as view','cy.categoryId as category','cy.thumbnail as thumbnail'])
        .innerJoin('uscy.cycle', 'cy')
        .andWhere('cy.id=uscy.cycle')
        .andWhere(`cy.categoryId=${category}`)
        .getRawMany();
        return count;
    }

    /**
        * Consulta para conocer la actividad del usuario
        */
     async getUserCyclesActivity(user:User,view:boolean){
          
        let  activity  = await this.userCycles.createQueryBuilder('uscy')
        .where({user:user,view:view})
        .select(['uscy.id','uscy.view','mo.id','mo.title'])
        .leftJoin('uscy.cycle', 'cy')
        .leftJoin('cy.category', 'cat')
        .leftJoin('cat.module', 'mo')
        .andWhere('cy.id=uscy.cycle')
        .andWhere('cat.id=cy.category')
        .andWhere('mo.id=cat.module')
        .groupBy('cat.moduleId')
        .orderBy('uscy.id','DESC') 
        .getRawMany();
        
        let activityLast = [];
        if(activity){
            for (let index = 0; index < activity.length; index++) {
                const element = activity[index];
               let lastViewCycles =  await this.getUserCyclesActivityModule(user,true,element['mo_id']);
               activityLast.push(lastViewCycles[0]);
              
            }
        }


        return activityLast;
    }

    async getUserCyclesActivityModule(user:User,view:boolean,module:number){
          
        let  activity  = await this.userCycles.createQueryBuilder('uscy')
        .where({user:user,view:view})
        .select(['uscy.view','cy.id as cycleId','cy.type as type','cy.name as name','cy.thumbnail as thumbnail','cy.description as description','cat.id','mo.id as moduleId','mo.title as title','mo.backgroundColor as backgroundColor','mo.type as type'])
        .leftJoin('uscy.cycle', 'cy')
        .leftJoin('cy.category', 'cat')
        .leftJoin('cat.module', 'mo')
        .andWhere('cy.id=uscy.cycle')
        .andWhere('cat.id=cy.category')
        .andWhere('mo.id=cat.module')
        .andWhere(`mo.id = ${module}`)
        .orderBy('uscy.id','DESC') 
        .limit(1)
        .getRawMany();

        


        return activity;
    }
    /**
     * Actualizo el cyclo visto
     */
    async editOne(cycle:Cycle,user:User,dto) {
        const userCycle = await this.getOneUserAndCycle(cycle,user);   
        const editedUserCycle = Object.assign(userCycle, dto);
        return await this.userCycles.save(editedUserCycle);
    }
}
