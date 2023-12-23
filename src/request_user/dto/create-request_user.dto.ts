import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestUserDto {
  @ApiProperty()
  book_id: number;
  @ApiProperty()
  date_on: Date;
  @ApiProperty()
  date_out: Date;
  @ApiProperty()
  notice: string;
}
