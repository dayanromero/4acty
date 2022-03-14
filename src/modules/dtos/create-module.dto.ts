import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { User } from 'src/user/entity';
export class CreateModuleDto {

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;
  
  @IsNumber()
  status: boolean;
    
  @IsString()
  url_image: string;

  
  user:User;

}