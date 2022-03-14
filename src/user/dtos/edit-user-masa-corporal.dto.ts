import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { OmitType } from '@nestjs/swagger';

export class EditUserDto extends PartialType(
    OmitType(CreateUserDto,[])
) {}
