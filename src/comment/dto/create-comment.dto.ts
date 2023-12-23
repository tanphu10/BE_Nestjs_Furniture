import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty()
  item_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  date_on: Date;
  @ApiProperty()
  content: string;
  @ApiProperty()
  rate: number;
}
