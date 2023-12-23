import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RequestUserService } from "./request_user.service";
import { CreateRequestUserDto } from "./dto/create-request_user.dto";
import { UpdateRequestUserDto } from "./dto/update-request_user.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("req-user-book")
export class RequestUserController {
  constructor(private readonly requestUserService: RequestUserService) {}
  @Post("req")
  create(
    @Body() createRequestUserDto: CreateRequestUserDto
    // @Query("id") id: number
  ) {
    return this.requestUserService.create(createRequestUserDto);
  }
  @Get("req")
  findAll() {
    return this.requestUserService.findAll();
  }
  @Get("/req/:iUser")
  findOne(@Param("iUser") iUser: string) {
    return this.requestUserService.findOne(+iUser);
  }

  @Patch("req")
  update(@Body() updateRequestUserDto: UpdateRequestUserDto) {
    return this.requestUserService.update(updateRequestUserDto);
  }
  @Delete("req")
  delete(@Query("id") id: number,@Query("iUser") iUser: number) {
    return this.requestUserService.delete(+id,+iUser);
  }
}
