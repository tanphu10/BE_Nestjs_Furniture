import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
  @ApiProperty()
  item_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  date_like: Date;
  @ApiProperty()
  quantity: boolean;
}
