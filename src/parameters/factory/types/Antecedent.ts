import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import IParameterMethod from "../parameter-method-interface";
import { Parameter } from '../../entity/parameter.entity';

export  class Antecendent implements IParameterMethod{ 
    private parameterRepository = getRepository(Parameter);
    async   getAll(): Promise<Parameter[]>{
        return await this.parameterRepository.find({ where: { id_parameter: "1", status:true} })
    }
}