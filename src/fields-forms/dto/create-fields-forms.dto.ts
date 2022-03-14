import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { TypeFieldsForm } from '../enums';

export class CreateFieldsFormsDTO{
    
    @IsNotEmpty()
    @IsEnum(TypeFieldsForm, {
      message: `Invalid option. Valids options are ${EnumToString(TypeFieldsForm)}`,
    })
    input:string;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    label: string;

    
    @IsBoolean()
    status: boolean;

    @IsOptional()
    // @IsString()
    // @MaxLength(255)
    options: [];
}