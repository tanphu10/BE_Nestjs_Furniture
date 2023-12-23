import { PartialType } from '@nestjs/swagger';
import { CreateAddCartDto } from './create-add_cart.dto';

export class UpdateAddCartDto extends PartialType(CreateAddCartDto) {}
