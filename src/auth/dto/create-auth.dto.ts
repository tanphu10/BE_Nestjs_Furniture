import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty } from "class-validator";

export class CreateAuthDto {
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
export class LoginAuthDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  pass_word: string;
}
