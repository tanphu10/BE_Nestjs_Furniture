import { ApiProperty } from "@nestjs/swagger";

export class CreateAddCartDto {
  @ApiProperty()
  item_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  number: number;
}
