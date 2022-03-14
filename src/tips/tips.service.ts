import { Injectable, NotFoundException } from '@nestjs/common';
import { Tip } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleApp } from 'src/modules/entity';
@Injectable()
export class TipsService {

    constructor(
        @InjectRepository(Tip)
        private readonly tip: Repository<Tip>
    ){}

    async getOne(id: number) {
        let tip = {}
        tip = await this.tip.findOne(id);
        if (!tip) {
            tip={};
        }
        return tip;
    }
    async getOneWhitModule(moduleId: number) {
        let tips = [];
         tips = await this.tip.find({where:{ module: moduleId }})
         if(tips.length==0){
            tips=[];
         }
        return tips;
    }
    
}
