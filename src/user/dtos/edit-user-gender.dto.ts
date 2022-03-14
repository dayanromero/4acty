import {
    IsNotEmpty,
    IsEnum
  } from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { userGender } from '../enums/geners-enum';

export class EditUserGenderDto {
   
  @IsNotEmpty()
    @IsEnum(userGender, {
      message: `Invalid option. Valids options are ${EnumToString(userGender)}`,
    })
    gender: string;
}
