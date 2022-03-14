import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ModuleApp } from 'src/modules/entity';


//DTO para la creación de las categorias

export class GetCategoryModuleDTO {
    
    @IsNotEmpty()
    module:ModuleApp;
    
   
}