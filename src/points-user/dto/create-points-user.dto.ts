import { User } from 'src/user/entity';
import { TestApp } from 'src/test/entity';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { GroupQualify } from 'src/ratings/enum';
export class CreatePoinstUserDto {
    @IsNotEmpty()
    test: TestApp;
    
    user:User;
    

    qualification:number;
}