import { PartialType } from '@nestjs/swagger';
import { CreatePhotoItemDto } from './create-photo_item.dto';

export class UpdatePhotoItemDto extends PartialType(CreatePhotoItemDto) {}
