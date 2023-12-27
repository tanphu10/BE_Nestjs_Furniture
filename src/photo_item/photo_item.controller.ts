import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Headers,
  UploadedFiles,
  UploadedFile,
} from "@nestjs/common";
import { PhotoItemService } from "./photo_item.service";
import {
  CreatePhotoItemDto,
  FileDataReq,
  FileExtender,
} from "./dto/create-photo_item.dto";
import { UpdatePhotoItemDto } from "./dto/update-photo_item.dto";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("photo-item")
export class PhotoItemController {
  constructor(private readonly photoItemService: PhotoItemService) {}

  // --upload avatar
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileDataReq,
  })
  @UseInterceptors(FilesInterceptor("files"))
  @Post("/upload-avatar")
  uploaded(
    @UploadedFile() files: Array<Express.Multer.File>,
    // @Headers("token") token: string
  ) {
    console.log(files);
    // return this.photoItemService.uploadPhoto(token, files);
  }
  @Get()
  findAll() {
    return this.photoItemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.photoItemService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePhotoItemDto: UpdatePhotoItemDto
  ) {
    return this.photoItemService.update(+id, updatePhotoItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.photoItemService.remove(+id);
  }
}
