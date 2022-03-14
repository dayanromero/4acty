import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './post.dto';

export class EditPostDto extends PartialType(
  OmitType(CreatePostDto, ['slug'] as const),
) {}