import { Injectable } from '@nestjs/common';
import ParamterType from './factory/enum/paramater-type';
import IParameterMethod from './factory/parameter-method-interface';
import ParameterMethodFactory from './factory/parameter-method-factory';

@Injectable()
export class ParametersService {
    public parameterMethod?:IParameterMethod;
    public async create(typeParameter:ParamterType)
    { 
        this.parameterMethod = await  ParameterMethodFactory.createParameterType(typeParameter);
         return await this.parameterMethod.getAll();
    }
}
