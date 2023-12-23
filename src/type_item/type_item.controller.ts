import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TypeItemService } from "./type_item.service";
import { CreateTypeItemDto } from "./dto/create-type_item.dto";
import { UpdateTypeItemDto } from "./dto/update-type_item.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("type_item")
export class TypeItemController {
  constructor(private readonly typeItemService: TypeItemService) {}

  @Post("type-item")
  create(@Body() createTypeItemDto: CreateTypeItemDto) {
    return this.typeItemService.create(createTypeItemDto);
  }

  @Get("type-item")
  findAll() {
    return this.typeItemService.findAll();
  }

  @Get("type-item/:id")
  findOne(@Param("id") id: string) {
    return this.typeItemService.findOne(+id);
  }

  @Patch("type-item/:id")
  update(
    @Param("id") id: string,
    @Body() updateTypeItemDto: UpdateTypeItemDto
  ) {
    return this.typeItemService.update(+id, updateTypeItemDto);
  }

  @Delete("type-item/:id")
  remove(@Param("id") id: string) {
    return this.typeItemService.remove(+id);
  }
}
