import { IsArray, IsNotEmpty, IsEnum, IsString, MaxLength, ValidateNested, IsNumber, ArrayMinSize, ArrayMaxSize, IsOptional } from 'class-validator';
import { TestApp } from 'src/test/entity';
import { GroupQualify } from 'src/ratings/enum';
import { EnumToString } from 'src/common/helpers/enumToString';
import { Raiting } from 'src/ratings/entity/raitings.entity';
import { Type } from 'class-transformer';
import { User } from 'src/user/entity';
import { Challanges } from 'src/challenges/entity';

export class CreateChallangeCognitiveDto {

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

    qualification:string;

    @IsNotEmpty()
    viewApp: number

    user:User;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => QuestionsParam)
    @IsNotEmpty()
    questions: QuestionsParam[];
}

export class QuestionsParam {
  @IsNumber()
  formGroup: number;
  @IsOptional()
  @ValidateNested()
  @Type(() => QuestionsValues)
  @IsNotEmpty()
  values: QuestionsValues[];
}


export class QuestionsValues {
  @IsString()
  name: number;
  @IsNumber()
  value: string;
}



