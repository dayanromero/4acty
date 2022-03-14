import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldsFormsDTO } from './create-fields-forms.dto';

export class EditFieldsFormsDTO extends PartialType(CreateFieldsFormsDTO){}
