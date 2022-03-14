import {
    IsNotEmpty,
    IsNumber,
    IsString
  } from 'class-validator';


export class EditUserMobileDto {
   
  @IsNotEmpty()
  @IsNumber()
  mobile: number;


  @IsNotEmpty()
  @IsString()
  indicative: string;
}
