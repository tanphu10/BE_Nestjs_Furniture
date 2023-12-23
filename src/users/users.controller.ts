import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Headers,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadDto } from "./dto/upload.dto";
import { diskStorage } from "multer";
import { uploadImg } from "src/utils/upload";

@Controller("api")
@ApiTags("user")
@ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post("/user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("/user")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/user/:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Put("/user/:id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete("/user/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
  @Get("/users/search/:userName")
  search(@Param("userName") userName: string) {
    return this.usersService.search(userName);
  }

  @Get('/users/pagina-search')
  pagina(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('userName') userName: string,
  ) {
    return this.usersService.pagina(+page, +pageSize, userName);
  }
  // --upload avatar
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadDto,
  })
  @UseInterceptors(FileInterceptor("file", uploadImg))
  @Post("/users/upload-avatar")
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Headers("token") token: string
  ) {
    return this.usersService.uploadAvatar(token, file);
  }
}
