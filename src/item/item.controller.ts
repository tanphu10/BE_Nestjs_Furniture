import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("Item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post("/item")
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get("item")
  findAll() {
    return this.itemService.findAll();
  }
  @Get("item/type/:id")
  findType(@Param("id") id: number) {
    console.log("check =>>>", id);
    return this.itemService.findType(+id);
  }

  @Get("/item/:id")
  findOne(@Param("id") id: string) {
    return this.itemService.findOne(+id);
  }

  @Put("/item/:id")
  update(@Param("id") id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }
  @Delete("/item/:id")
  remove(@Param("id") id: string) {
    return this.itemService.remove(+id);
  }
}
