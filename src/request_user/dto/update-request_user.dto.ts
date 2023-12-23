import { PartialType } from '@nestjs/swagger';
import { CreateRequestUserDto } from './create-request_user.dto';

export class UpdateRequestUserDto extends PartialType(CreateRequestUserDto) {}
