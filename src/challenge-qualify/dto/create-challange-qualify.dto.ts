import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { GroupQualify } from 'src/ratings/enum';
import { EnumToString } from 'src/common/helpers/enumToString';

import { TestApp } from 'src/test/entity';
import { User } from 'src/user/entity';
import { Raiting } from 'src/ratings/entity/raitings.entity';
import { Challanges } from 'src/challenges/entity';
export class CreateDtoQualifyChallange {

  @IsNumber()
  value: number;
  
  @IsNotEmpty()
  test: TestApp;
  
  @IsNotEmpty()
  challange: Challanges;
  
  @IsEnum(GroupQualify, {
      message: `Invalid option. Valids options are ${EnumToString(GroupQualify)}`,
    })
  @IsNotEmpty()
  @IsString()
  groupRaiting: Raiting;
  
  @IsNotEmpty()
  viewApp: number;
  
  user:User;
  
  qualification:string;
  

}