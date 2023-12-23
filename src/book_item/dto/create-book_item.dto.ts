import { ApiProperty } from "@nestjs/swagger";

export class CreateBookItemDto {
  @ApiProperty()
  item_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  number: number;
  @ApiProperty()
  date_on: Date;
  @ApiProperty()
  date_out: Date;
}
