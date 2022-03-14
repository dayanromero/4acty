import { Injectable } from '@nestjs/common';
import { Cycle } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity';
import { Not, Repository } from 'typeorm';
import { Difficulty } from 'src/difficulty/entity';

@Injectable()
export class CyclesService {
    constructor(
        @InjectRepository(Cycle)
        private readonly Cycle: Repository<Cycle>
    ){}
    
    /**
         * Consultamos el ciclo enviado
         */
    async getOne(id:Cycle){
          
        return await this.Cycle.findOne(id,{relations: ['category']});
    }

    async getCycleForCategory(category:Category){
        return await this.Cycle.createQueryBuilder('cyc')
        .where({ parent: 0,category:category })
        .select(['cyc.id','cyc.name','cyc.description','cyc.type','cyc.thumbnail'])
        .getMany();
        // .getSql();
    }

    async getCycleDifficulty(category:Category){
        return await this.Cycle.createQueryBuilder('cyc')
        .where({parent:Not(0), category:category })
        .select(['di.id as id','di.name as name','cyc.description as description','cyc.category as category'])
        .innerJoin('cyc.difficulty', 'di')
        .groupBy('cyc.difficulty')
        // .getMany();
        .getRawMany();
        // .getSql();
    }

    async getCycleVideosDifficulty(category:Category){
        // return await this.Cycle.find({parent:Not(0), category:category,difficulty:difficulty });
        return await this.Cycle.find({ category:category });
    }
    
}
