import { CreateModuleDto } from "./create-module.dto";
import { PartialType } from '@nestjs/mapped-types';

export class EditModuleDto extends PartialType( CreateModuleDto ) {}
