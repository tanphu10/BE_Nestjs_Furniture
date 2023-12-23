import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  full_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  pass_word: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birth_day: Date;
  @ApiProperty()
  gender: boolean;
  @ApiProperty()
  role: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  type_: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  isverify: boolean;
}
