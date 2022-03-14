import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { TestApp } from 'src/test/entity';
import { User } from 'src/user/entity';
import { Challanges } from 'src/challenges/entity';
export class GetDtoQualifyChallange {

@IsNotEmpty()
test: TestApp;

@IsNotEmpty()
challange: Challanges;


user:User;

}