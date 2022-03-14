import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import IParameterMethod from "../parameter-method-interface";
import { Parameter } from '../../entity/parameter.entity';
@Injectable()
export  class Habit implements IParameterMethod{
        
    private parameterRepository = getRepository(Parameter);

    public async getAll(): Promise<Parameter[]>{
        return await this.parameterRepository.find({ where: { id_parameter: "2",status:true} })
    }
}