import { ModuleApp } from "src/modules/entity";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTestDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;


    @IsNotEmpty()
    module: ModuleApp;
    
}