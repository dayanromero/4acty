import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsArray, IsEnum, IsDecimal, IsNumber } from 'class-validator';
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/helpers/enumToString";

export class CreateUserDto {

  @IsString()
  @MaxLength(255)
  name: string;


  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8,{
    message: 'Contraseña debe ser igual o mayor a 8 caracteres',
  })
  @MaxLength(128)
  password: string;
  
  

  @IsArray()
  // @IsEnum(AppRoles,{
  //   each:true,
  //   message:`must be valid role value ${EnumToString(AppRoles)}`
  // })
  roles: string[];

}
