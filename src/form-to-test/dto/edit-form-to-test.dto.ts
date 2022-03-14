import { PartialType } from '@nestjs/mapped-types';
import { CreateFormToTestDTO } from './create-form-to-test.dto';
export class EditFormToTestDTO extends PartialType(CreateFormToTestDTO) {}