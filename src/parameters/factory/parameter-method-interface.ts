import { Parameter } from '../entity/parameter.entity';

export default interface IParameterMethod{
    getAll():Promise<Parameter[]>;
}