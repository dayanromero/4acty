import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Category } from 'src/category/entity';
import { ModuleApp } from 'src/modules/entity';
import { Difficulty } from 'src/difficulty/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO, editCreateCategoryDTO } from './dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly category: Repository<Category>
    ){
       
    }
    async getById(id: number){
        return await this.category.findOne(id);
    }
    async getCategorys(){
        return await this.category.createQueryBuilder('cat')
        .where({ parent: 0 })
        .select(['cat.id','cat.name','cat.description','cat.thumbnail','mo.title','di.name'])
        .leftJoin('cat.module', 'mo')
        .leftJoin('cat.difficulty', 'di')
        .getRawMany();
        // .getSql();
    }

    async getCategorysForModule(module:ModuleApp){
        return await this.category.createQueryBuilder('cat')
        .where({ parent: 0,module:module })
        .select(['cat.id','cat.name','cat.description','cat.thumbnail','mo.title','di.name','mo.backgroundColor'])
        .leftJoin('cat.module', 'mo')
        .leftJoin('cat.difficulty', 'di')
        .andWhere('cat.module=mo.id')
        .getMany();
        // .getSql();
    }

    async getSubCategorys(parent:number){
        
        return await this.category.createQueryBuilder('cat')
        .where({ parent: parent })
        .getMany();
    }

    async getCategorysForUser(module:number,difficulty:number,parent:number){
        return await this.category.createQueryBuilder('cat')
        .where("moduleId = :module AND difficultyId = :difficulty AND parent=:parent", {
            module,
            difficulty,
            parent
          })
        .getMany();
    }

    async createOne(dto: CreateCategoryDTO) {
        const newCategory = this.category.create(dto);
        const formTest = await this.category.save(newCategory);
        return formTest;
    }

    async editOne(id:number,dto: editCreateCategoryDTO) {
        const category = await this.getById(id);
        const editedCategory = Object.assign(category, dto);
        return await this.category.save(editedCategory);
    }
}
