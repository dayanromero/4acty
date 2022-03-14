import ParamterType from './enum/paramater-type';
import IParameterMethod from './parameter-method-interface';
import { Antecendent, Habit } from './types/';
import { Injectable } from '@nestjs/common';
@Injectable()
export default class ParameterMethodFactory{
    public static async  createParameterType(type: ParamterType){
        
        switch (type) {
            case ParamterType.Antecendent:
                return await new Antecendent();
                break;
            case ParamterType.Habit:
                return new Habit();
                break;
            default:
                break;
        }
    }
}