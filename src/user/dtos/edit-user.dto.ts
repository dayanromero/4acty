import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { OmitType } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsEmail, MaxLength, IsBoolean } from 'class-validator';
import { userGender } from "../enums/geners-enum";
import { EnumToString } from "src/common/helpers/enumToString";

export class EditUserDto extends PartialType(
    OmitType(CreateUserDto,['password','roles'] as const)
) {
    
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

    // @IsEnum(userGender, {
    //   message: `Invalid option. Valids options are ${EnumToString(userGender)}`,
    // })
    @IsString()
    gender: string;

    
    @IsNumber()
    mobile: number;
  
    
    @IsString()
    indicative: string;

    // @IsDecimal({force_decimal:true,decimal_digits: '1,'},{message: 'Weigth Debe agregar un numero decimal'})
    @IsString()
    weight: number;

    // @IsDecimal({force_decimal:true,decimal_digits: '1,'},{message: 'heigth Debe agregar un numero decimal'})
    @IsString()
    height: number;

    @IsNumber()
    age:number;

    @IsBoolean()
    premium: boolean;

    @IsBoolean()
    status: boolean;

    @IsNumber()
    antecendent: number;

    @IsNumber()
    habit: number;

    

}
