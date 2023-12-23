import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("comment")
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get("comment")
  findAll() {
    return this.commentService.findAll();
  }

  @Get("comment/:item_id")
  findItem(@Param("item_id") item_id: string) {
    return this.commentService.findItem(+item_id);
  }

  @Put("/comment/:id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete("comment/:id")
  remove(@Param("id") id: string) {
    return this.commentService.remove(+id);
  }
}
