import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
  @ApiProperty()
  name_item: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type_id: number;
}
