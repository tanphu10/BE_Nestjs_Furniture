import { PartialType } from '@nestjs/swagger';
import { CreateBookItemDto } from './create-book_item.dto';

export class UpdateBookItemDto extends PartialType(CreateBookItemDto) {}
