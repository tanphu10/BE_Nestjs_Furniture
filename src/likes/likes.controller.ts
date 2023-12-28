import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("like")
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }
  @Get("/like")
  findAll() {
    return this.likesService.findAll();
  }

  @Get("/like/item/:id")
  findItem(@Param("id") id: string) {
    return this.likesService.findItem(+id);
  }
  @Get("/like/user/:id")
  findUser(@Param("id") id: string) {
    return this.likesService.findUser(+id);
  }
}
