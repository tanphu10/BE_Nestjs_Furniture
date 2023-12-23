import { PartialType } from '@nestjs/swagger';
import { CreateTypeItemDto } from './create-type_item.dto';

export class UpdateTypeItemDto extends PartialType(CreateTypeItemDto) {}
