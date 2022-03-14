import { FieldForm } from "src/fields-forms/entity";
import { TestApp } from "src/test/entity";
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFormToTestDTO{
    
    @IsNotEmpty()
    test: TestApp;
    
    @IsNotEmpty()
    form: FieldForm;
}