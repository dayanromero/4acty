import { Injectable, NotFoundException } from "@nestjs/common";
import { ModuleApp } from "./entity";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModuleDto, EditModuleDto } from "./dtos/";
import { Repository } from 'typeorm';



  

@Injectable()
export class ModuleAppService {
    constructor(
        @InjectRepository(ModuleApp)
        private readonly moduleAppRepository: Repository<ModuleApp>,
    ){}
    
    async getMany() {
       return await this.moduleAppRepository.createQueryBuilder("article").getMany(); 
       
    }

    async getOne(id: number) {
        const user = await this.moduleAppRepository.findOne(id);
        if (!user) throw new NotFoundException('Module does not exists')
    
        return user;
      }

    async createOne(dto: CreateModuleDto) {
        
        const module = this.moduleAppRepository.create(dto);
        return await this.moduleAppRepository.save(module);
    }

    async editOne(id,dto: EditModuleDto) {
        const module = await this.getOne(id)   
        const editedModule = Object.assign(module, dto);
        return await this.moduleAppRepository.save(editedModule);
    }
}