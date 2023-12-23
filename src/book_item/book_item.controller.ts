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
import { BookItemService } from "./book_item.service";
import { CreateBookItemDto } from "./dto/create-book_item.dto";
import { UpdateBookItemDto } from "./dto/update-book_item.dto";
import { ApiTags } from "@nestjs/swagger";
import { PrismaClient } from "@prisma/client";

@Controller("api")
@ApiTags("book-item")
export class BookItemController {
  constructor(private readonly bookItemService: BookItemService) {}
  @Post("/book")
  create(@Body() createBookItemDto: CreateBookItemDto) {
    return this.bookItemService.create(createBookItemDto);
  }

  @Get("/book")
  findAll() {
    return this.bookItemService.findAll();
  }

  @Get("/book/:id")
  findOne(@Param("id") id: string) {
    return this.bookItemService.findUser(+id);
  }

  @Patch("/book/:id")
  update(
    @Param("id") id: string,
    @Body() updateBookItemDto: UpdateBookItemDto
  ) {
    return this.bookItemService.update(+id, updateBookItemDto);
  }

  @Delete("/book/:id")
  remove(@Param("id") id: string, @Query("idUser") idUser: string) {
    return this.bookItemService.remove(+id, +idUser);
  }
}
