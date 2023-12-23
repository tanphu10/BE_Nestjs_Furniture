import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeItemDto {
  @ApiProperty()
  type_name: string;
  @ApiProperty()
  icons: string;
}
