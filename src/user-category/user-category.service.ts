import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCategory } from './entity/user-category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity';
import { Category } from 'src/category/entity';
import { ModuleApp } from 'src/modules/entity';


@Injectable()
export class UserCategoryService {
    constructor(
        @InjectRepository(UserCategory)
        private readonly userCategory: Repository<UserCategory>
    ){}

    async addUserWhitCategory(category:Category,user:User,module:ModuleApp,status:number){
        const addUserCategory = new UserCategory();
        addUserCategory.user = user;
        addUserCategory.category = category;
        addUserCategory.module = module;
        addUserCategory.status = status;
        await addUserCategory.save();
                
    }
    /**
        * Obtengo la relación categoria, con user categoria y obtener el modulo
        */
    async getOneUserCategory(category:Category,user:User){
        const userCategory = await this.userCategory.findOne({where:{user:user,category:category},relations:['module']});
        if (!userCategory) throw new NotFoundException('No existe categoria con usuario');
    
        return userCategory;
    }    
    /**
         * Validamos los cyclos vistos, si ya estan todos vistos actualizamos el ciclo  el status correspondiente
         */

    async updateStatus(category:Category,user:User,status:number){
        const userCategory = await this.getOneUserCategory(category,user);   
        const editedUserCategory = Object.assign(userCategory, {status:status});
        return await this.userCategory.save(editedUserCategory);
    }
    /**
         * obtengo la ultima categoria del usario sin ver 
         */
    async getStatusCategoryNext(module:ModuleApp,user:User,parent:number,status:number){

       return await this.userCategory.createQueryBuilder('usc')
        .where({ module:module,user:user,status:status })
        .select(['cat.id as idCategory','cat.parent as parent'])
        .leftJoin('usc.category', 'cat')
        .andWhere('usc.category = cat.id')
        .andWhere(`cat.parent = ${parent}`)
        .orderBy('usc.category')
        .getRawOne();

    }

    async getStatusCategoryCountStatus(module:ModuleApp,user:User,parent:number,status:number){

        let count =  await this.userCategory.createQueryBuilder('usc')
         .where({ module:module,user:user,status:status })
         .select(['cat.id as idCategory','cat.parent as parent'])
         .leftJoin('usc.category', 'cat')
         .andWhere('usc.category = cat.id')
         .andWhere(`cat.parent = ${parent}`)
         .orderBy('usc.category')
         .getCount()

         return count;
 
     }

     async getStatusCategoryCountAll(module:ModuleApp,user:User,parent:number){

        let count =  await this.userCategory.createQueryBuilder('usc')
         .where({ module:module,user:user })
         .select(['cat.id as idCategory','cat.parent as parent'])
         .leftJoin('usc.category', 'cat')
         .andWhere('usc.category = cat.id')
         .andWhere(`cat.parent = ${parent}`)
         .orderBy('usc.category')
         .getCount()

         return count;
 
     }

    async deleteUserWhitCategory(module:ModuleApp,user:User){
        const deleteUserCategory = await this.userCategory.find({where: { module: module, user: user}})
        return await this.userCategory.remove(deleteUserCategory);
                
    }

    async getUserWhitCategoryGroupModule(module:ModuleApp,user:User){
        const getUserCategory =   await this.userCategory.createQueryBuilder('usc')
        .where({ module:module,user:user })
        .select(['usc.id as id','cat.parent as category'])
        .leftJoin('usc.category', 'cat')
        .andWhere('usc.category = cat.id')
        .groupBy('cat.parent')
        // .getMany();
        .getRawMany();
        return getUserCategory;
                
    }

    async getUserWhitCategoryModule(module:ModuleApp,parent:number,user:User){
          
        const getUserCategory =   await this.userCategory.createQueryBuilder('usc')
        .where({ module:module,user:user })
        .select(['cat.id as id','cat.name as name','cat.description as description','cat.thumbnail as image','mod.title as title_module','usc.status as status'])
        .innerJoin('usc.category', 'cat')
        .innerJoin('usc.module', 'mod')
         .andWhere(`cat.parent = ${parent}`)
        // .groupBy('cat.parent')
        .orderBy('cat.id','ASC')
        .getRawMany();
        // .getSql();
        return getUserCategory;
                
    }
    /**
     * Obtener los modulos del usuario con el status
     * @param module 
     * @param user 
     * @param parent 
     * @returns 
     */
    async getUserWhitCategoryStatus(module:ModuleApp,user:User,parent:number){

          
        return await  this.userCategory.find({
            relations:['category'],
            join: {alias: 'usercategory',innerJoin: {category: 'usercategory.category',}},
            where: qb => {
                qb.where({module:module,user:user})
                .andWhere('category.parent = :parent',{ parent: parent })
                .orderBy('category.id')
            }

        });
    }
    
}
