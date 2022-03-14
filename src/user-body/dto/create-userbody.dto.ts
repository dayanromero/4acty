import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsArray, IsEnum, IsDecimal, IsNumber } from 'class-validator';
import { User } from 'src/user/entity';



export class CreateUserBodyDto {

  @IsString()
  biceps: string;


  @IsString()
  forearm: string;

  @IsString()
  thigh: string;

  @IsString()
  calf: string;

  user:User;
  
}
