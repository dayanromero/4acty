import { ModuleApp } from "src/modules/entity";
import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from "./create-test.dto";

export class EditTestDTO extends PartialType(CreateTestDto) {}