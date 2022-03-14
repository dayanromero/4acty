import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Difficulty } from 'src/difficulty/entity';
import { ModuleApp } from 'src/modules/entity';


//DTO para la creación de las categorias

export class CreateCategoryDTO {
    
    @IsNumber()
    parent:number;
    
    @IsString()
    name:string;
    
    @IsString()
    description:string;

    @IsString()
    url:string;
    
    @IsString()
    thumbnail:string;

    @IsNotEmpty()
    module: ModuleApp;
    
    @IsNotEmpty()
    difficulty: Difficulty;
}

